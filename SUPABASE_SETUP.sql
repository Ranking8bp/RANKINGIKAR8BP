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
