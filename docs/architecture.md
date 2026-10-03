# Signal Desk architecture

## Phase 1 boundaries

The application is a fully navigable UX backed by explicitly fictional, deterministic data. It does not fetch news, call an AI model, authenticate users, or persist feed changes yet.

## Folder structure

```text
src/app/                 App Router pages, route states, and server actions
src/components/          Reusable presentational UI
src/domain/              Framework-independent entities and service contracts
src/infrastructure/news/ Provider adapters and clearly labelled mock fixtures
src/lib/                 Application queries and shared utilities
supabase/migrations/     PostgreSQL schema, indexes, and RLS policies
docs/                    Architecture and delivery decisions
```

Dependencies point inward: UI uses application queries and domain types; infrastructure implements domain interfaces. A future composition root can choose RSS, commercial news, clustering, and AI adapters from server-only configuration.

## Processing pipeline

1. A `NewsProvider` fetches raw provider records.
2. Normalization maps records into canonical `Article` entities and deduplicates URLs.
3. `StoryClusterer` connects reports describing the same event, retaining membership scores and history.
4. `StorySummarizer` and `ClaimExtractor` produce a neutral summary and provenance-linked claims.
5. `EvidenceAnalyzer` measures observable properties: independent publishers, primary documents, corroboration, disputes, and corrections.
6. Feed filters rank eligible story clusters. They never sever a claim from supporting or disputing articles.

All probabilistic outputs must store model/provider version, explanation, inputs or provenance, and review state. “Confidence” must describe a pipeline output—not truth or political orientation.

## External integrations roadmap

- **Supabase:** Auth, PostgreSQL, RLS, scheduled jobs and optional Realtime updates.
- **News:** RSS/Atom and one licensed commercial provider, each behind `NewsProvider`; publisher terms and retention rules must be reviewed.
- **Primary sources:** government releases, regulator filings and company investor-relations feeds.
- **AI:** swappable model adapter for embeddings, summaries and claim extraction; require structured output, evaluation fixtures and cost controls.
- **Operations:** background queue/scheduler, object storage for permitted snapshots, error tracking, product analytics and transactional email.
- **Audio (later):** `BriefingComposer` produces a cited script; a separate TTS adapter renders it asynchronously and records consent, language, duration and provenance.

## Security notes

Provider and service-role keys remain server-only. Validate all writes, enforce RLS, rate-limit ingestion and mutation routes, sanitize fetched content, protect against SSRF, store provider payloads only where licensing permits, and audit automated corrections. The public anon key may be exposed only with correctly tested RLS; the service role never enters a client bundle.
