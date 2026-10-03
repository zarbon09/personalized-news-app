# Phase 1 dependency and environment verification

Verified on 1 October 2026 before beginning any Phase 2 work.

## Dependency audit

Every direct runtime and development dependency in `package.json` is a normal public npm package:

- Next.js, React, and React DOM provide the application runtime.
- Tailwind CSS, PostCSS, and Autoprefixer provide the CSS toolchain.
- TypeScript and the React/Node type packages provide strict type checking.
- ESLint and `eslint-config-next` provide static analysis.
- Zod validates the feed server action.
- Lucide React supplies icons.
- The official Supabase SSR and JavaScript packages are reserved for the documented persistence adapter.

There are no Git dependencies, private scopes, custom tarballs, install scripts, registry overrides, or unpublished workspace packages in the manifest. The Node engine and npm package-manager version are recorded to make the expected toolchain explicit.

## npm configuration audit

- The repository contains no `.npmrc`.
- The only discovered user-level npm configuration is `/root/.nvm/.npmrc`, containing `package-lock=false`. This prevents lockfile generation but does not select a registry and cannot produce an HTTP 403.
- npm resolves the default registry to `https://registry.npmjs.org/`.
- The Codex environment injects `HTTP_PROXY`, `HTTPS_PROXY`, `npm_config_http_proxy`, and `npm_config_https_proxy`, all pointing to `http://proxy:8080`.
- Requests to the npm and Yarn public registries are rejected by that proxy at the HTTP CONNECT stage with `403 Forbidden`, before any package metadata is returned. The same response occurs for unscoped packages such as React and scoped packages such as `@supabase/ssr`.
- Removing proxy variables does not provide a workaround because direct DNS/network access is disabled in this environment.
- The local npm cache is empty, so an offline install cannot complete.

The failure is therefore specific to the current Codex cloud network policy. It is not caused by the dependency list, package scope, application architecture, or a repository registry setting. No architecture or dependency was changed to work around the restriction.

## Verification status

`npm install`, type checking, linting, building, starting the application, and browser-based visual inspection remain blocked until dependencies can be downloaded. Errors from the globally available TypeScript compiler are not treated as an application type-check result: without local Next.js, React, Zod, and icon packages, it cannot load the project declarations and consequently emits cascading JSX and module-resolution errors.

Run the following in a network environment that can access the public npm registry:

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

Then inspect `/`, `/explore`, `/feeds`, `/feeds/new`, each sample `/feeds/[id]`, each sample `/story/[id]`, `/settings`, an unknown route, and mobile navigation at narrow viewport widths.
