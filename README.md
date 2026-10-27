# Movie Browsing Learning Clone

A forked React/Redux learning project with a movie catalog and Firebase sign-in screens. It does not provide film streaming or subscriptions.

## Setup

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `npm start` is an alias for the development server.

## Checks and production build

```sh
npm test
npm run build
npm run audit
```

Vite writes the production site to `dist/`. `npm run preview` serves that build locally. Configure the host to serve index.html for browser routes. This maintenance change does not deploy the application.

## Provenance

Read [FORK_NOTES.md](FORK_NOTES.md) for upstream attribution and contribution limits. Existing upstream license notices are retained. No new license has been assigned.

## Service configuration

Copy `.env.example` to `.env.local` and supply your own Firebase web configuration and a permitted TMDB client API key. The example intentionally contains no real values. Without configuration the app remains logged out, shows a setup status, and refuses service calls rather than contacting the historical project.

Every `VITE_` value is visible in the browser build. Never use Firebase admin/service-account credentials or a private provider token here. Use provider restrictions and appropriate Firebase rules; use a backend proxy if the provider credential must remain secret.

The historical hard-coded movie key and Firebase configuration have been removed from the current source. They remain in Git history; no credential rotation is claimed. Do not reuse values from repository history.

## Validation limits

Tests mock catalog and auth services, cover authentication/routing, missing configuration, empty catalog results and request failures. A real account sign-in and real movie API call require the owner's service configuration and have not been exercised. Playback and saved lists are not implemented. The Firebase hosting output is configured as `dist/`, but no deployment is initiated by this change.

## Dependency note

The aggregate Firebase SDK includes an older server-side gRPC dependency through Firestore, even though this UI imports only Authentication. An override keeps `@grpc/grpc-js` on a patched compatible 1.x version. The authentication bundle does not use Firestore; its real-service behavior still needs owner configuration and verification.
