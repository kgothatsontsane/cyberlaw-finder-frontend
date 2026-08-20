# CyberLaw Finder — Frontend (Cloudflare Pages)

Static frontend for the CyberLaw Finder demo (COS783 Digital Forensics).

This repo is **frontend-only** by design — the backend (FastAPI + ML) lives in
the private `kgothatsontsane/cyberlaw-finder` repo and deploys to Modal
(serverless). Keeping the build-connected repo free of backend internals is a
deliberate security choice.

## Build (Cloudflare Pages)

Deployed automatically from GitHub. Build configuration:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Env: `NEXT_STATIC` | `true` (static export) |
| Env: `NEXT_PUBLIC_API_URL` | Modal backend URL (set in Pages settings) |

The frontend is 100% client-rendered — it fetches the API directly from the
browser, so the static export needs no server runtime.

## Local dev

```bash
npm ci
npm run dev        # Next.js dev server
```

## Test

```bash
npm test           # Jest
```