create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  company text check (company is null or char_length(company) <= 100),
  rating smallint not null check (rating between 1 and 5),
  feedback text not null check (char_length(trim(feedback)) between 10 and 1500),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

-- Visitors can submit reviews, but submissions are always pending.
drop policy if exists "Anyone can submit pending reviews" on public.reviews;
create policy "Anyone can submit pending reviews"
  on public.reviews for insert
  to anon, authenticated
  with check (status = 'pending');

-- Visitors can read only reviews explicitly approved by an administrator.
drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
  on public.reviews for select
  to anon, authenticated
  using (status = 'approved');

grant select, insert on public.reviews to anon, authenticated;
