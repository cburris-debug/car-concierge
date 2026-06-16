-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table mirrors Supabase auth.users; we don't duplicate it.
-- Use auth.users directly. This view/table is for app-layer queries.

-- Engagements: one row per paid vehicle purchase
create table if not exists public.engagements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier text not null check (tier in ('advisor', 'personal_shopper')),
  stripe_payment_id text unique, -- idempotency guard; null for dev-inserted rows
  purchased_at timestamptz not null default now(),
  expires_at timestamptz not null,
  vehicle_note text,
  created_at timestamptz not null default now()
);

-- Pending payments: store payment before user signs up (email-keyed)
-- TODO (POC cut): implement payment-before-signup matching
create table if not exists public.pending_payments (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  stripe_payment_id text unique not null,
  tier text not null check (tier in ('advisor', 'personal_shopper')),
  purchased_at timestamptz not null default now(),
  expires_at timestamptz not null,
  claimed boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row-level security
alter table public.engagements enable row level security;
alter table public.pending_payments enable row level security;

-- Users can read their own engagements
create policy "Users can read own engagements"
  on public.engagements for select
  using (auth.uid() = user_id);

-- Service role (webhook, server routes) can do everything
create policy "Service role full access to engagements"
  on public.engagements for all
  using (auth.role() = 'service_role');

create policy "Service role full access to pending_payments"
  on public.pending_payments for all
  using (auth.role() = 'service_role');

-- Index for active-engagement lookups
create index if not exists engagements_user_id_expires_at
  on public.engagements (user_id, expires_at desc);

create index if not exists engagements_stripe_payment_id
  on public.engagements (stripe_payment_id);
