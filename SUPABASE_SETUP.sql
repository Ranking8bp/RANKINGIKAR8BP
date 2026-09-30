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
