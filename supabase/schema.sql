create extension if not exists "pgcrypto";

create type public.role_type as enum ('member', 'taskforce');
create type public.approval_status as enum ('pending', 'approved', 'rejected');

create table if not exists public.metro_areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  region text not null,
  is_active boolean not null default true
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.role_type not null default 'member',
  approval_status public.approval_status not null default 'pending',
  metro_area_id uuid references public.metro_areas (id),
  bio text default ''
);

create table if not exists public.member_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  full_name text not null,
  profession text not null,
  employer text not null,
  location text not null,
  industry text not null,
  specialties text[] not null default '{}',
  interests text[] not null default '{}',
  contact_visibility text not null default 'directory',
  institutions text not null default '',
  additional_credentials text,
  organization_website text,
  industry_experience text not null default '',
  wants_resume boolean not null default false,
  resume_path text
);

create table if not exists public.business_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  category text not null,
  services text[] not null default '{}',
  location text not null,
  specialties text[] not null default '{}',
  contact_email text not null,
  owner_industry text not null,
  summary text not null default ''
);

create table if not exists public.student_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  full_name text not null,
  school text not null,
  field_of_study text not null,
  graduation_year integer not null,
  interests text[] not null default '{}',
  career_direction text not null default ''
);

create table if not exists public.access_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  date_of_birth date not null,
  gender text not null,
  age integer not null,
  phone_number text not null,
  work_number text,
  professional_email text,
  linkedin_profile text,
  preferred_contact_methods text[] not null default '{}',
  highest_education text not null,
  institutions text not null,
  additional_credentials text,
  current_title text not null,
  current_organization text not null,
  work_location text not null,
  organization_website text,
  industry_experience text not null,
  resume_path text,
  headshot_path text,
  volunteering_interest text not null,
  primary_institution text not null,
  community_offerings text not null,
  feedback text,
  status public.approval_status not null default 'pending',
  requested_at timestamptz not null default now()
);

create table if not exists public.section_content (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  overview text not null default '',
  items jsonb not null default '[]'::jsonb
);

alter table public.metro_areas enable row level security;
alter table public.profiles enable row level security;
alter table public.member_profiles enable row level security;
alter table public.business_profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.access_requests enable row level security;
alter table public.section_content enable row level security;

create or replace function public.is_taskforce()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'taskforce'
      and approval_status = 'approved'
  );
$$;

create or replace function public.is_approved_member()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and approval_status = 'approved'
  );
$$;

create policy "approved members can view profiles"
on public.profiles
for select
to authenticated
using (public.is_approved_member());

create policy "approved members can view member profiles"
on public.member_profiles
for select
to authenticated
using (public.is_approved_member());

create policy "approved members can view businesses"
on public.business_profiles
for select
to authenticated
using (public.is_approved_member());

create policy "approved members can view students"
on public.student_profiles
for select
to authenticated
using (public.is_approved_member());

create policy "approved members can view section content"
on public.section_content
for select
to authenticated
using (public.is_approved_member());

create policy "taskforce can manage profiles"
on public.profiles
for all
to authenticated
using (public.is_taskforce())
with check (public.is_taskforce());

create policy "taskforce can manage member profiles"
on public.member_profiles
for all
to authenticated
using (public.is_taskforce())
with check (public.is_taskforce());

create policy "members can update own member profile"
on public.member_profiles
for update
to authenticated
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

create policy "taskforce can manage business profiles"
on public.business_profiles
for all
to authenticated
using (public.is_taskforce())
with check (public.is_taskforce());

create policy "taskforce can manage student profiles"
on public.student_profiles
for all
to authenticated
using (public.is_taskforce())
with check (public.is_taskforce());

create policy "taskforce can manage access requests"
on public.access_requests
for all
to authenticated
using (public.is_taskforce())
with check (public.is_taskforce());

create policy "visitors can create access requests"
on public.access_requests
for insert
to anon, authenticated
with check (true);

create policy "taskforce can manage section content"
on public.section_content
for all
to authenticated
using (public.is_taskforce())
with check (public.is_taskforce());

insert into public.metro_areas (slug, name, region, is_active)
values ('chicagoland', 'Chicagoland', 'Illinois', true)
on conflict (slug) do nothing;

-- Migration: extend member_profiles with profile-edit fields
-- (no-op if columns already exist from the CREATE TABLE above)
alter table public.member_profiles
  add column if not exists institutions text not null default '',
  add column if not exists additional_credentials text,
  add column if not exists organization_website text,
  add column if not exists industry_experience text not null default '',
  add column if not exists wants_resume boolean not null default false,
  add column if not exists resume_path text;

create policy if not exists "members can update own member profile"
on public.member_profiles
for update
to authenticated
using (profile_id = auth.uid())
with check (profile_id = auth.uid());
