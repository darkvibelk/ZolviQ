-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ENUMS
create type user_role as enum ('admin', 'manager', 'agent', 'requester');
create type ticket_status as enum ('new', 'open', 'pending', 'resolved', 'closed');
create type ticket_priority as enum ('low', 'medium', 'high', 'critical');

-- ORGANIZATIONS (Tenants)
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  domain text unique,
  created_at timestamptz default now()
);

-- PROFILES (Linked to Auth Users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  org_id uuid references organizations(id),
  full_name text,
  role user_role default 'requester',
  avatar_url text,
  updated_at timestamptz default now()
);

-- TICKETS
create table tickets (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) not null,
  requester_id uuid references profiles(id) not null,
  assignee_id uuid references profiles(id), 
  subject text not null,
  description text,
  status ticket_status default 'new',
  priority ticket_priority default 'low',
  category text,
  custom_fields jsonb default '{}'::jsonb,
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- COMMENTS
create table comments (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid references tickets(id) on delete cascade not null,
  author_id uuid references profiles(id) not null,
  content text not null,
  is_internal boolean default false,
  created_at timestamptz default now()
);

-- AUDIT LOGS
create table audit_logs (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid references tickets(id) on delete cascade not null,
  actor_id uuid references profiles(id),
  action text not null,
  changes jsonb, -- Stores {old: ..., new: ...}
  created_at timestamptz default now()
);

-- RLS POLICIES ============================================================
alter table organizations enable row level security;
alter table profiles enable row level security;
alter table tickets enable row level security;
alter table comments enable row level security;
alter table audit_logs enable row level security;

-- HELPER FUNCTION
create or replace function get_auth_org_id()
returns uuid as $$
  select org_id from profiles where id = auth.uid()
$$ language sql security definer;

-- POLICIES

-- Organizations: Users can view their own organization
create policy "View own organization" on organizations
  for select using (id = get_auth_org_id());

-- Profiles: Users can view profiles within their organization
create policy "View org profiles" on profiles
  for select using (org_id = get_auth_org_id());

create policy "Update own profile" on profiles
  for update using (id = auth.uid());

-- Tickets: 
-- 1. View: Agents/Admins see all in Org. Requesters see only their own.
--    (Simplified for initial schema: All in org can see for now to ensure "Lightning Fast" dummy data works easily for demo, 
--     but effectively we'd filter by requester_id = auth.uid() if role == requester)
create policy "View org tickets" on tickets
  for select using (org_id = get_auth_org_id());

create policy "Create tickets" on tickets
  for insert with check (org_id = get_auth_org_id()); 

create policy "Update tickets" on tickets
  for update using (org_id = get_auth_org_id());

-- Comments: View comments for tickets in own org
create policy "View ticket comments" on comments
  for select using (
    exists (
      select 1 from tickets 
      where tickets.id = comments.ticket_id 
      and tickets.org_id = get_auth_org_id()
    )
  );
  
create policy "Create comments" on comments
  for insert with check (
    exists (
      select 1 from tickets 
      where tickets.id = comments.ticket_id 
      and tickets.org_id = get_auth_org_id()
    )
  );

-- Indexes for Speed
create index idx_tickets_org on tickets(org_id);
create index idx_tickets_status on tickets(status);
create index idx_comments_ticket on comments(ticket_id);
