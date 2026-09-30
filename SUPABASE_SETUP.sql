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

-- CLASIFICACIÓN PARA USUARIOS AUTENTICADOS
-- Devuelve solo datos que se muestran en la tabla y ficha del jugador.
drop function if exists public.get_ranking();

create function public.get_ranking()
returns table (
  username text,
  account_name text,
  game_id text,
  country text,
  avatar_path text,
  elo_points integer,
  wins integer,
  losses integer,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.username,
    p.account_name,
    p.game_id,
    p.country,
    p.avatar_path,
    coalesce(p.elo_points, 200) as elo_points,
    coalesce(p.wins, 0) as wins,
    coalesce(p.losses, 0) as losses,
    p.created_at
  from public.profiles p
  order by coalesce(p.elo_points, 200) desc, p.created_at asc, p.username asc;
$$;

revoke all on function public.get_ranking() from public;
revoke execute on function public.get_ranking() from anon;
grant execute on function public.get_ranking() to authenticated;

drop policy if exists "profile_photos_select_ranking" on storage.objects;
create policy "profile_photos_select_ranking"
on storage.objects
for select
to authenticated
using (bucket_id = 'profile-photos');
