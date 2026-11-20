# Reduced production CI benchmark

This standalone copy targets a full GitHub Actions CI run under 10 minutes,
including setup. This is a target, not a measured guarantee; confirm it on the
GitHub runner with a cold cache.

The generated workload contains 45 libraries: 5 utilities, 10 UI libraries,
and 30 feature libraries spread across all 30 feature domains. Handwritten
applications and support libraries are retained. The 20 serial Playwright
specs retain six-second pacing (about two minutes total before startup).
Library unit tests retain two seconds of calibrated CPU work and three seconds
of waiting per project.

CI runs Nx directly on the GitHub Actions runner with local caching. It runs
format, sync, and validation checks, then build, typecheck, lint, and test tasks,
followed by the serial Playwright e2e suite.
The 25-minute timeout remains a failure safety net, not a runtime target.

## Run locally

```sh
npm ci
npx playwright install --with-deps chromium
npx nx run-many -t build typecheck lint test
npx nx run-many -t e2e
```

No cloud account or access token is required.

Regenerate the reduced workload with `node tools/generate-shop-libs.mjs`,
then run `npm install` and `npx nx sync` to refresh workspace links and references.
