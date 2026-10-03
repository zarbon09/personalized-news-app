-- Signal Desk Phase 1 schema. Apply with Supabase CLI after authentication is configured.
create extension if not exists pgcrypto;

create type public.content_kind as enum ('reporting','analysis','opinion');
create type public.claim_kind as enum ('fact','claim','disputed','opinion');

create table public.users (id uuid primary key references auth.users(id) on delete cascade, display_name text, created_at timestamptz not null default now());
create table public.user_preferences (user_id uuid primary key references public.users(id) on delete cascade, languages text[] not null default '{English}', default_time_range text not null default '24h', audio_preferences jsonb not null default '{}', updated_at timestamptz not null default now());
create table public.saved_feeds (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.users(id) on delete cascade, name text not null check(char_length(name) between 3 and 60), description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.feed_filters (id uuid primary key default gen_random_uuid(), feed_id uuid not null unique references public.saved_feeds(id) on delete cascade, topics text[] not null default '{}', countries text[] not null default '{}', regions text[] not null default '{}', cities text[] not null default '{}', companies text[] not null default '{}', people text[] not null default '{}', keywords text[] not null default '{}', excluded_keywords text[] not null default '{}', languages text[] not null default '{English}', time_range text not null default '24h', sort_order text not null default 'relevance');
create table public.publishers (id uuid primary key default gen_random_uuid(), name text not null, canonical_domain text unique, country_code text, ownership_disclosure_url text, corrections_url text, transparency_metadata jsonb not null default '{}', created_at timestamptz not null default now());
create table public.articles (id uuid primary key default gen_random_uuid(), publisher_id uuid not null references public.publishers(id), provider_key text not null, canonical_url text not null unique, headline text not null, body_text text, language text not null, content_kind public.content_kind not null default 'reporting', published_at timestamptz not null, fetched_at timestamptz not null default now(), is_primary_source boolean not null default false, raw_metadata jsonb not null default '{}', unique(provider_key, canonical_url));
create table public.stories (id uuid primary key default gen_random_uuid(), headline text not null, neutral_summary text, location jsonb, first_reported_at timestamptz, last_updated_at timestamptz not null default now(), cluster_version integer not null default 1, status text not null default 'active');
create table public.story_articles (story_id uuid not null references public.stories(id) on delete cascade, article_id uuid not null references public.articles(id) on delete cascade, similarity_score numeric(5,4), is_lead boolean not null default false, added_at timestamptz not null default now(), primary key(story_id,article_id));
create table public.claims (id uuid primary key default gen_random_uuid(), story_id uuid not null references public.stories(id) on delete cascade, kind public.claim_kind not null, claim_text text not null, attribution text, explanation text not null, confidence numeric(4,3) check(confidence between 0 and 1), created_at timestamptz not null default now());
create table public.claim_sources (claim_id uuid not null references public.claims(id) on delete cascade, article_id uuid not null references public.articles(id) on delete cascade, support_type text not null check(support_type in ('supports','disputes','mentions')), excerpt_locator jsonb not null default '{}', primary key(claim_id,article_id));
create table public.topics (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, parent_id uuid references public.topics(id));
create table public.article_topics (article_id uuid not null references public.articles(id) on delete cascade, topic_id uuid not null references public.topics(id) on delete cascade, relevance numeric(4,3) check(relevance between 0 and 1), primary key(article_id,topic_id));

create index saved_feeds_user_idx on public.saved_feeds(user_id,updated_at desc);
create index articles_published_idx on public.articles(published_at desc);
create index articles_publisher_idx on public.articles(publisher_id,published_at desc);
create index stories_updated_idx on public.stories(last_updated_at desc);
create index story_articles_article_idx on public.story_articles(article_id);
create index claims_story_kind_idx on public.claims(story_id,kind);
create index article_topics_topic_idx on public.article_topics(topic_id,article_id);
create index articles_search_idx on public.articles using gin(to_tsvector('simple', headline || ' ' || coalesce(body_text,'')));

alter table public.users enable row level security;
alter table public.user_preferences enable row level security;
alter table public.saved_feeds enable row level security;
alter table public.feed_filters enable row level security;
create policy "users manage own profile" on public.users for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "users manage own preferences" on public.user_preferences for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users manage own feeds" on public.saved_feeds for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users manage own feed filters" on public.feed_filters for all using (exists(select 1 from public.saved_feeds f where f.id=feed_id and f.user_id=auth.uid())) with check (exists(select 1 from public.saved_feeds f where f.id=feed_id and f.user_id=auth.uid()));
