create extension if not exists pgcrypto;

do $$ begin
  create type public.reservation_status as enum (
    'new',
    'contacted',
    'confirmed',
    'deposit_paid',
    'shot',
    'delivered',
    'cancelled'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.reservation_admins (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  bride_name text not null check (char_length(bride_name) between 2 and 120),
  phone text not null check (phone ~ E'^\\+9665[0-9]{8}$'),
  event_type text not null check (char_length(event_type) between 2 and 60),
  event_date date not null,
  city text not null check (char_length(city) between 2 and 60),
  venue text not null check (char_length(venue) between 2 and 160),
  package_id text not null check (package_id in ('01', '02', '03', '04', '05')),
  package_name text not null,
  guest_count text,
  ceremony_time text,
  needs_first_look boolean not null default false,
  notes text,
  status public.reservation_status not null default 'new',
  source text not null default 'reserve-page',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservation_rate_limits (
  fingerprint text primary key,
  window_start timestamptz not null default now(),
  request_count integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists reservations_event_date_idx on public.reservations (event_date);
create index if not exists reservations_status_idx on public.reservations (status);
create index if not exists reservations_created_at_idx on public.reservations (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reservations_set_updated_at on public.reservations;
create trigger reservations_set_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

create or replace function public.bump_reservation_rate_limit(
  p_fingerprint text,
  p_window_start timestamptz,
  p_max_requests integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
begin
  insert into public.reservation_rate_limits (
    fingerprint,
    window_start,
    request_count,
    updated_at
  )
  values (
    p_fingerprint,
    p_window_start,
    1,
    now()
  )
  on conflict (fingerprint) do update
  set
    request_count = case
      when public.reservation_rate_limits.window_start < p_window_start then 1
      else public.reservation_rate_limits.request_count + 1
    end,
    window_start = case
      when public.reservation_rate_limits.window_start < p_window_start then p_window_start
      else public.reservation_rate_limits.window_start
    end,
    updated_at = now()
  returning request_count into current_count;

  return current_count > p_max_requests;
end;
$$;

revoke all on function public.bump_reservation_rate_limit(text, timestamptz, integer) from public;
grant execute on function public.bump_reservation_rate_limit(text, timestamptz, integer) to service_role;

alter table public.reservation_admins enable row level security;
alter table public.reservations enable row level security;
alter table public.reservation_rate_limits enable row level security;

drop policy if exists "reservation admins can read own admin row" on public.reservation_admins;
create policy "reservation admins can read own admin row"
on public.reservation_admins
for select
to authenticated
using (email = auth.jwt() ->> 'email');

drop policy if exists "admins can read reservations" on public.reservations;
create policy "admins can read reservations"
on public.reservations
for select
to authenticated
using (
  exists (
    select 1
    from public.reservation_admins admins
    where admins.email = auth.jwt() ->> 'email'
  )
);

drop policy if exists "admins can update reservation status" on public.reservations;
create policy "admins can update reservation status"
on public.reservations
for update
to authenticated
using (
  exists (
    select 1
    from public.reservation_admins admins
    where admins.email = auth.jwt() ->> 'email'
  )
)
with check (
  exists (
    select 1
    from public.reservation_admins admins
    where admins.email = auth.jwt() ->> 'email'
  )
);

-- Add the owner's email after project creation, for example:
-- insert into public.reservation_admins (email) values ('owner@example.com')
-- on conflict (email) do nothing;
