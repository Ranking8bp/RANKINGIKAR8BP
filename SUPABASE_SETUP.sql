-- RANKINGIKAR8BP - CONFIGURACIÓN DE SUPABASE
-- Ejecuta este archivo UNA VEZ en Supabase > SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  game_id text not null,
  account_name text not null,
  country text not null,
  screenshot_path text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'account-captures',
  'account-captures',
  false,
  10485760,
  array['image/png','image/jpeg','image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "captures_insert_own" on storage.objects;
create policy "captures_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'account-captures'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "captures_select_own" on storage.objects;
create policy "captures_select_own"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'account-captures'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "captures_update_own" on storage.objects;
create policy "captures_update_own"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'account-captures'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'account-captures'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "captures_delete_own" on storage.objects;
create policy "captures_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'account-captures'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- CORAZONES ENTRE PERFILES
create table if not exists public.profile_hearts (
  liker_id uuid not null references public.profiles(id) on delete cascade,
  target_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (liker_id, target_id),
  constraint profile_hearts_no_self check (liker_id <> target_id)
);

alter table public.profile_hearts enable row level security;

drop policy if exists "profile_hearts_select_authenticated" on public.profile_hearts;
create policy "profile_hearts_select_authenticated"
on public.profile_hearts for select to authenticated using (true);

drop policy if exists "profile_hearts_insert_own" on public.profile_hearts;
create policy "profile_hearts_insert_own"
on public.profile_hearts for insert to authenticated
with check (liker_id = auth.uid());

drop policy if exists "profile_hearts_delete_own" on public.profile_hearts;
create policy "profile_hearts_delete_own"
on public.profile_hearts for delete to authenticated
using (liker_id = auth.uid());

grant select, insert, delete on public.profile_hearts to authenticated;

-- CLASIFICACIÓN PARA USUARIOS AUTENTICADOS
drop function if exists public.get_ranking();

create function public.get_ranking()
returns table (
  player_id uuid,
  username text,
  account_name text,
  game_id text,
  country text,
  avatar_path text,
  elo_points integer,
  wins integer,
  losses integer,
  heart_count bigint,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id as player_id,
    p.username,
    p.account_name,
    p.game_id,
    p.country,
    p.avatar_path,
    coalesce(p.elo_points, 200) as elo_points,
    coalesce(p.wins, 0) as wins,
    coalesce(p.losses, 0) as losses,
    count(h.liker_id) as heart_count,
    p.created_at
  from public.profiles p
  left join public.profile_hearts h on h.target_id = p.id
  group by p.id, p.username, p.account_name, p.game_id, p.country, p.avatar_path, p.elo_points, p.wins, p.losses, p.created_at
  order by coalesce(p.elo_points, 200) desc, p.created_at asc, p.username asc;
$$;

revoke all on function public.get_ranking() from public;
revoke execute on function public.get_ranking() from anon;
grant execute on function public.get_ranking() to authenticated;


-- ELIMINAR LA CUENTA DEL USUARIO AUTENTICADO
-- Borra auth.users; profiles y profile_hearts se eliminan por ON DELETE CASCADE.
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'No hay una sesión autenticada';
  end if;

  delete from auth.users where id = v_user_id;

  if not found then
    raise exception 'No se encontró la cuenta autenticada';
  end if;
end;
$$;

revoke all on function public.delete_my_account() from public;
revoke execute on function public.delete_my_account() from anon;
grant execute on function public.delete_my_account() to authenticated;


-- COMENTARIOS PÚBLICOS EN PERFILES
create table if not exists public.profile_comments (
  id bigint generated by default as identity primary key,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists profile_comments_profile_created_idx
on public.profile_comments(profile_id, created_at desc);

alter table public.profile_comments enable row level security;

drop policy if exists "profile_comments_select_authenticated" on public.profile_comments;
create policy "profile_comments_select_authenticated"
on public.profile_comments for select to authenticated using (true);

drop policy if exists "profile_comments_insert_own" on public.profile_comments;
create policy "profile_comments_insert_own"
on public.profile_comments for insert to authenticated
with check (author_id = auth.uid());

drop policy if exists "profile_comments_delete_own" on public.profile_comments;
create policy "profile_comments_delete_own"
on public.profile_comments for delete to authenticated
using (author_id = auth.uid());

grant select, insert, delete on public.profile_comments to authenticated;
grant usage, select on sequence public.profile_comments_id_seq to authenticated;

create table if not exists public.profile_comment_hearts (
  comment_id bigint not null references public.profile_comments(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

alter table public.profile_comment_hearts enable row level security;

drop policy if exists "profile_comment_hearts_select_authenticated" on public.profile_comment_hearts;
create policy "profile_comment_hearts_select_authenticated"
on public.profile_comment_hearts for select to authenticated using (true);

drop policy if exists "profile_comment_hearts_insert_own" on public.profile_comment_hearts;
create policy "profile_comment_hearts_insert_own"
on public.profile_comment_hearts for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists "profile_comment_hearts_delete_own" on public.profile_comment_hearts;
create policy "profile_comment_hearts_delete_own"
on public.profile_comment_hearts for delete to authenticated
using (user_id = auth.uid());

grant select, insert, delete on public.profile_comment_hearts to authenticated;

drop function if exists public.get_profile_comments(uuid);
create function public.get_profile_comments(p_profile_id uuid)
returns table (
  comment_id bigint,
  author_id uuid,
  author_name text,
  body text,
  created_at timestamptz,
  heart_count bigint,
  viewer_liked boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select
    c.id,
    c.author_id,
    coalesce(p.account_name,p.username,'Jugador') as author_name,
    c.body,
    c.created_at,
    count(h.user_id) as heart_count,
    coalesce(bool_or(h.user_id = auth.uid()),false) as viewer_liked
  from public.profile_comments c
  join public.profiles p on p.id=c.author_id
  left join public.profile_comment_hearts h on h.comment_id=c.id
  where c.profile_id=p_profile_id
  group by c.id,c.author_id,p.account_name,p.username,c.body,c.created_at
  order by c.created_at desc;
$$;

revoke all on function public.get_profile_comments(uuid) from public;
revoke execute on function public.get_profile_comments(uuid) from anon;
grant execute on function public.get_profile_comments(uuid) to authenticated;


-- NOTIFICACIONES DE COMENTARIOS Y CORAZONES
create table if not exists public.notifications (
  id bigint generated by default as identity primary key,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('comment','profile_heart','comment_heart')),
  comment_id bigint references public.profile_comments(id) on delete cascade,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists notifications_recipient_created_idx on public.notifications(recipient_id,created_at desc);
alter table public.notifications enable row level security;
drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own" on public.notifications for select to authenticated using(recipient_id=auth.uid());
drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own" on public.notifications for update to authenticated using(recipient_id=auth.uid()) with check(recipient_id=auth.uid());
grant select,update on public.notifications to authenticated;

create or replace function public.notify_profile_comment() returns trigger language plpgsql security definer set search_path=public as $$
begin
 if new.author_id<>new.profile_id then insert into public.notifications(recipient_id,actor_id,type,comment_id) values(new.profile_id,new.author_id,'comment',new.id); end if;
 return new;
end;$$;
drop trigger if exists trg_notify_profile_comment on public.profile_comments;
create trigger trg_notify_profile_comment after insert on public.profile_comments for each row execute function public.notify_profile_comment();

create or replace function public.notify_profile_heart() returns trigger language plpgsql security definer set search_path=public as $$
begin
 if new.liker_id<>new.target_id then insert into public.notifications(recipient_id,actor_id,type) values(new.target_id,new.liker_id,'profile_heart'); end if;
 return new;
end;$$;
drop trigger if exists trg_notify_profile_heart on public.profile_hearts;
create trigger trg_notify_profile_heart after insert on public.profile_hearts for each row execute function public.notify_profile_heart();

create or replace function public.notify_comment_heart() returns trigger language plpgsql security definer set search_path=public as $$
declare v_author uuid;
begin
 select author_id into v_author from public.profile_comments where id=new.comment_id;
 if v_author is not null and v_author<>new.user_id then insert into public.notifications(recipient_id,actor_id,type,comment_id) values(v_author,new.user_id,'comment_heart',new.comment_id); end if;
 return new;
end;$$;
drop trigger if exists trg_notify_comment_heart on public.profile_comment_hearts;
create trigger trg_notify_comment_heart after insert on public.profile_comment_hearts for each row execute function public.notify_comment_heart();

drop function if exists public.get_my_notifications();
create function public.get_my_notifications()
returns table(notification_id bigint,type text,actor_id uuid,actor_name text,comment_body text,is_read boolean,created_at timestamptz)
language sql stable security definer set search_path=public as $$
 select n.id,n.type,n.actor_id,coalesce(p.account_name,p.username,'Jugador'),c.body,n.is_read,n.created_at
 from public.notifications n
 join public.profiles p on p.id=n.actor_id
 left join public.profile_comments c on c.id=n.comment_id
 where n.recipient_id=auth.uid()
 order by n.created_at desc limit 100;
$$;
revoke all on function public.get_my_notifications() from public;
revoke execute on function public.get_my_notifications() from anon;
grant execute on function public.get_my_notifications() to authenticated;


-- AMPLIAR NOTIFICACIONES: actividad en perfiles donde participe el usuario
alter table public.notifications drop constraint if exists notifications_type_check;
alter table public.notifications add constraint notifications_type_check check (type in ('comment','profile_heart','comment_heart','thread_comment'));

create or replace function public.notify_profile_comment() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if new.author_id<>new.profile_id then
    insert into public.notifications(recipient_id,actor_id,type,comment_id)
    values(new.profile_id,new.author_id,'comment',new.id);
  end if;
  insert into public.notifications(recipient_id,actor_id,type,comment_id)
  select distinct c.author_id,new.author_id,'thread_comment',new.id
  from public.profile_comments c
  where c.profile_id=new.profile_id
    and c.author_id<>new.author_id
    and c.author_id<>new.profile_id
    and not exists (
      select 1 from public.notifications n
      where n.recipient_id=c.author_id and n.actor_id=new.author_id
        and n.type='thread_comment' and n.comment_id=new.id
    );
  return new;
end;$$;

create or replace function public.get_my_notifications()
returns table(notification_id bigint,type text,actor_id uuid,actor_name text,comment_body text,is_read boolean,created_at timestamptz)
language sql stable security definer set search_path=public as $$
 select n.id,n.type,n.actor_id,coalesce(p.account_name,p.username,'Jugador'),c.body,n.is_read,n.created_at
 from public.notifications n
 join public.profiles p on p.id=n.actor_id
 left join public.profile_comments c on c.id=n.comment_id
 where n.recipient_id=auth.uid()
 order by n.created_at desc limit 100;
$$;
revoke all on function public.get_my_notifications() from public;
revoke execute on function public.get_my_notifications() from anon;
grant execute on function public.get_my_notifications() to authenticated;


-- NOTIFICACIONES NAVEGABLES
drop function if exists public.get_my_notifications();
create function public.get_my_notifications()
returns table(notification_id bigint,type text,actor_id uuid,actor_name text,recipient_id uuid,target_profile_id uuid,comment_id bigint,comment_body text,is_read boolean,created_at timestamptz)
language sql stable security definer set search_path=public as $$
 select n.id,n.type,n.actor_id,coalesce(p.account_name,p.username,'Jugador'),n.recipient_id,
        case when n.type='thread_comment' then c.profile_id else n.recipient_id end,
        n.comment_id,c.body,n.is_read,n.created_at
 from public.notifications n
 join public.profiles p on p.id=n.actor_id
 left join public.profile_comments c on c.id=n.comment_id
 where n.recipient_id=auth.uid()
 order by n.created_at desc limit 100;
$$;
revoke all on function public.get_my_notifications() from public;
revoke execute on function public.get_my_notifications() from anon;
grant execute on function public.get_my_notifications() to authenticated;


-- ACTIVIDAD GENERAL: NUEVOS REGISTROS
create table if not exists public.global_activity (
  id bigint generated by default as identity primary key,
  type text not null check (type in ('registration')),
  actor_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists global_activity_created_idx on public.global_activity(created_at desc);
alter table public.global_activity enable row level security;
drop policy if exists "global_activity_select_authenticated" on public.global_activity;
create policy "global_activity_select_authenticated" on public.global_activity for select to authenticated using (true);
grant select on public.global_activity to authenticated;

create or replace function public.notify_new_registration() returns trigger
language plpgsql security definer set search_path=public as $$
begin
  insert into public.global_activity(type,actor_id) values('registration',new.id);
  return new;
end;$$;
drop trigger if exists trg_global_new_registration on public.profiles;
create trigger trg_global_new_registration after insert on public.profiles
for each row execute function public.notify_new_registration();

drop function if exists public.get_global_activity();
create function public.get_global_activity()
returns table(activity_id bigint,type text,actor_id uuid,actor_name text,recipient_name text,comment_body text,created_at timestamptz)
language sql stable security definer set search_path=public as $$
  select * from (
    select
      g.id as activity_id,g.type,g.actor_id,
      coalesce(a.account_name,a.username,'Jugador') as actor_name,
      null::text as recipient_name,null::text as comment_body,g.created_at
    from public.global_activity g
    join public.profiles a on a.id=g.actor_id
    union all
    select
      n.id as activity_id,n.type,n.actor_id,
      coalesce(a.account_name,a.username,'Jugador') as actor_name,
      coalesce(r.account_name,r.username,'Jugador') as recipient_name,
      c.body as comment_body,n.created_at
    from public.notifications n
    join public.profiles a on a.id=n.actor_id
    join public.profiles r on r.id=n.recipient_id
    left join public.profile_comments c on c.id=n.comment_id
    where n.type in ('comment','profile_heart','comment_heart')
  ) x
  where auth.uid() is not null
  order by created_at desc
  limit 100;
$$;
revoke all on function public.get_global_activity() from public;
revoke execute on function public.get_global_activity() from anon;
grant execute on function public.get_global_activity() to authenticated;


-- SISTEMA DE SEGUIDORES
create table if not exists public.profile_follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id,following_id),
  constraint profile_follows_no_self check (follower_id<>following_id)
);
alter table public.profile_follows enable row level security;
drop policy if exists "profile_follows_select_authenticated" on public.profile_follows;
create policy "profile_follows_select_authenticated" on public.profile_follows for select to authenticated using(true);
drop policy if exists "profile_follows_insert_own" on public.profile_follows;
create policy "profile_follows_insert_own" on public.profile_follows for insert to authenticated with check(follower_id=auth.uid());
drop policy if exists "profile_follows_delete_own" on public.profile_follows;
create policy "profile_follows_delete_own" on public.profile_follows for delete to authenticated using(follower_id=auth.uid());
grant select,insert,delete on public.profile_follows to authenticated;

drop function if exists public.get_follow_stats(uuid);
create function public.get_follow_stats(p_profile_id uuid)
returns table(followers bigint,following bigint,viewer_follows boolean)
language sql stable security definer set search_path=public as $$
 select
  (select count(*) from public.profile_follows where following_id=p_profile_id),
  (select count(*) from public.profile_follows where follower_id=p_profile_id),
  exists(select 1 from public.profile_follows where follower_id=auth.uid() and following_id=p_profile_id);
$$;
revoke all on function public.get_follow_stats(uuid) from public;
revoke execute on function public.get_follow_stats(uuid) from anon;
grant execute on function public.get_follow_stats(uuid) to authenticated;


-- ESTADO DE AMISTAD: SEGUIMIENTO MUTUO
drop function if exists public.get_follow_stats(uuid);
create function public.get_follow_stats(p_profile_id uuid)
returns table(followers bigint,following bigint,viewer_follows boolean,follows_viewer boolean,is_friend boolean)
language sql stable security definer set search_path=public as $$
 select
  (select count(*) from public.profile_follows where following_id=p_profile_id),
  (select count(*) from public.profile_follows where follower_id=p_profile_id),
  exists(select 1 from public.profile_follows where follower_id=auth.uid() and following_id=p_profile_id),
  exists(select 1 from public.profile_follows where follower_id=p_profile_id and following_id=auth.uid()),
  exists(select 1 from public.profile_follows where follower_id=auth.uid() and following_id=p_profile_id)
  and exists(select 1 from public.profile_follows where follower_id=p_profile_id and following_id=auth.uid());
$$;
revoke all on function public.get_follow_stats(uuid) from public;
revoke execute on function public.get_follow_stats(uuid) from anon;
grant execute on function public.get_follow_stats(uuid) to authenticated;


-- MENSAJES PRIVADOS
create table if not exists public.private_messages (
 id bigint generated by default as identity primary key,
 sender_id uuid not null references public.profiles(id) on delete cascade,
 recipient_id uuid not null references public.profiles(id) on delete cascade,
 body text not null check(char_length(btrim(body)) between 1 and 1000),
 is_read boolean not null default false,
 created_at timestamptz not null default now(),
 constraint private_messages_no_self check(sender_id<>recipient_id)
);
create index if not exists private_messages_recipient_created_idx on public.private_messages(recipient_id,created_at desc);
alter table public.private_messages enable row level security;
drop policy if exists "private_messages_select_participants" on public.private_messages;
create policy "private_messages_select_participants" on public.private_messages for select to authenticated using(sender_id=auth.uid() or recipient_id=auth.uid());
drop policy if exists "private_messages_insert_sender" on public.private_messages;
create policy "private_messages_insert_sender" on public.private_messages for insert to authenticated with check(sender_id=auth.uid() and recipient_id<>auth.uid());
drop policy if exists "private_messages_update_recipient" on public.private_messages;
create policy "private_messages_update_recipient" on public.private_messages for update to authenticated using(recipient_id=auth.uid()) with check(recipient_id=auth.uid());
grant select,insert,update on public.private_messages to authenticated;
