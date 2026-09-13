-- Table behind the diagnostic intake form on stateofashes.com.
-- Run once in the Supabase SQL Editor.

create table if not exists public.intake_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  bottleneck text not null,
  source text not null default 'state-of-ashes',
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists intake_requests_submitted_at_idx
  on public.intake_requests (submitted_at desc);

-- No anon or authenticated policies are defined, so only the service role key
-- used by the Next.js route can read or write this table.
alter table public.intake_requests enable row level security;
