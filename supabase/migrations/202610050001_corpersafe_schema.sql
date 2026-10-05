-- CorperSafe hackathon MVP schema. Apply in a Supabase project before enabling persistence.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  corps_id text,
  state text,
  lga text,
  service_status text,
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.trusted_contacts (
  id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null, relationship text, phone text, created_at timestamptz not null default now()
);
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(), plate_number text not null unique, vehicle_type text, colour text,
  verification_status text not null default 'not_verified' check (verification_status in ('verified','not_verified','temporarily_unavailable')),
  verified_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null, departure text not null, destination text not null,
  status text not null default 'active' check (status in ('active','completed','missed_checkin','cancelled')),
  started_at timestamptz not null default now(), expected_arrival timestamptz, safety_checkin_due timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.trip_contacts (
  id uuid primary key default gen_random_uuid(), trip_id uuid not null references public.trips(id) on delete cascade,
  trusted_contact_id uuid not null references public.trusted_contacts(id) on delete cascade, notified_at timestamptz
);
create table if not exists public.safety_checkins (
  id uuid primary key default gen_random_uuid(), trip_id uuid not null references public.trips(id) on delete cascade,
  status text not null check (status in ('safe','needs_help','missed')), responded_at timestamptz
);
create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade,
  trip_id uuid references public.trips(id) on delete set null, category text not null, description text not null,
  location text, status text not null default 'Reported' check (status in ('Reported','Under Review','Response Initiated','Resolved')),
  created_at timestamptz not null default now()
);
create table if not exists public.incident_evidence (
  id uuid primary key default gen_random_uuid(), incident_id uuid not null references public.incidents(id) on delete cascade,
  file_url text not null, file_type text, created_at timestamptz not null default now()
);
create table if not exists public.emergency_alerts (
  id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade,
  trip_id uuid references public.trips(id) on delete set null, emergency_type text not null,
  status text not null default 'created', created_at timestamptz not null default now()
);
create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(), case_type text not null, reference_id uuid,
  status text not null default 'Reported', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.trusted_contacts enable row level security;
alter table public.vehicles enable row level security;
alter table public.trips enable row level security;
alter table public.trip_contacts enable row level security;
alter table public.safety_checkins enable row level security;
alter table public.incidents enable row level security;
alter table public.incident_evidence enable row level security;
alter table public.emergency_alerts enable row level security;
alter table public.cases enable row level security;

-- Members may read/update their own profile and related journey data.
create policy "Profiles are self readable" on public.profiles for select to authenticated using (id = auth.uid());
create policy "Profiles are self editable" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "Contacts are self managed" on public.trusted_contacts for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "Trips are self managed" on public.trips for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "Trip contacts follow member trip" on public.trip_contacts for all to authenticated using (exists (select 1 from public.trips t where t.id = trip_id and t.profile_id = auth.uid())) with check (exists (select 1 from public.trips t where t.id = trip_id and t.profile_id = auth.uid()));
create policy "Checkins follow member trip" on public.safety_checkins for all to authenticated using (exists (select 1 from public.trips t where t.id = trip_id and t.profile_id = auth.uid())) with check (exists (select 1 from public.trips t where t.id = trip_id and t.profile_id = auth.uid()));
create policy "Incidents are private to reporter" on public.incidents for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "Evidence follows reporter incident" on public.incident_evidence for all to authenticated using (exists (select 1 from public.incidents i where i.id = incident_id and i.profile_id = auth.uid())) with check (exists (select 1 from public.incidents i where i.id = incident_id and i.profile_id = auth.uid()));
create policy "Alerts are self managed" on public.emergency_alerts for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
-- No client policies on cases or vehicles: these are service-managed/authorized responder data.
