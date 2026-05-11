# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**DemainSpécialisteCyber** — An educational platform by ANSSI (the French cybersecurity agency) for teachers to create and share "jeux" (educational cybersecurity games/activities) for students. It also includes a catalogue of cyber resources and a section for the France Cybersecurity Challenge (FCSC).

## Commands

All commands use `pnpm`. The project is a monorepo with `back` and `front` packages.

### Root-level (runs both packages)
```bash
pnpm dev          # Start all services in dev mode
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm test         # Run all tests
pnpm typecheck    # Type-check all packages
```

### Backend only
```bash
pnpm --filter anssi-demain-specialiste-cyber-back dev        # Start dev server (starts DB via docker compose)
pnpm --filter anssi-demain-specialiste-cyber-back test       # Run backend tests (also runs typecheck + lint)
pnpm --filter anssi-demain-specialiste-cyber-back build      # Compile TypeScript
pnpm --filter anssi-demain-specialiste-cyber-back migre-bdd  # Run Knex DB migrations
pnpm --filter anssi-demain-specialiste-cyber-back cree-migration  # Create a new Knex migration file
```

### Frontend only
```bash
pnpm --filter anssi-demain-specialiste-cyber-front dev    # Watch mode
pnpm --filter anssi-demain-specialiste-cyber-front build  # Vite build
pnpm --filter anssi-demain-specialiste-cyber-front test   # Run frontend tests
```

### Running a single test file
```bash
# From back/ directory
pnpm vitest run tests/metier/jeu.spec.ts

# From front/ directory
pnpm vitest run tests/composants/MonComposant.spec.ts
```

## Architecture

### Monorepo structure
- `back/` — Express.js + TypeScript server (Node ≥18)
- `front/` — Svelte 5 SPA built with Vite

### Backend (`back/src/`)

Organized into four layers:

- **`api/`** — Express routes, middleware, JWT/OIDC adapters. Entry point is `dsc.ts` (`creeServeur`). Each resource file (e.g. `ressourceJeu.ts`, `ressourceJeux.ts`) registers its routes.
- **`metier/`** — Domain logic and interfaces (ports). Core entities: `Jeu`, `Utilisateur`, `RessourceCyber`, `Metier`. Entrepôt interfaces (e.g. `EntrepotJeux`, `EntrepotUtilisateur`) are defined here.
- **`infra/`** — Concrete implementations of domain interfaces: Postgres entrepôts via Knex, Grist entrepôts (for resources/métiers/selections), S3/Cellar file storage, Mattermost messaging, Sentry, Brevo email, JCOP antivirus.
- **`bus/`** — In-process event bus (`BusEvenements`) with typed events (e.g. `JeuCree`, `CompteCree`) and subscribers wired in `cablage.ts`.

The server wires everything together in `serveur.ts`, which builds the `ConfigurationServeur` object (the dependency injection container) passed to `creeServeur`.

**Key external data sources:**
- PostgreSQL (via Docker, port 5435) — users and jeux
- [Grist](https://getgrist.com/) — cyber resources, métiers, and teacher/student selections (read via API)

**Authentication:** OIDC (OpenID Connect) via `openid-client`, with JWT cookies for session persistence.

### Frontend (`front/src/`)

Organized by feature:
- **`catalogue/`** — Filterable catalogue of cyber resources fetched from the backend
- **`cyber-en-jeux/`** — Showcase of teacher-created jeux with filtering
- **`jeux/`** — Game creation/editing form (`FormulaireJeu/`), detail view, reactions, and "mes jeux" teacher dashboard
- **`metiers/`** — Career/profession pages
- **`france-cybersecurity-challenge/`** — FCSC event information pages
- **`composants/`** — Shared UI components
- **`selections/`** — Teacher/student resource selection feature

State is managed with Svelte stores (`.store.ts` files). The frontend uses `@lab-anssi/ui-kit` (ANSSI design system).

### Testing
- **Backend:** Vitest with `supertest` for HTTP integration tests. Tests live in `back/tests/` mirroring `back/src/`. The `pretest` script runs `typecheck` and `lint`.
- **Frontend:** Vitest with `jsdom` and `@testing-library/svelte`. Setup file at `front/tests/vitest-setup.ts`.

### Environment setup
Copy `back/.env.template` to `back/.env` and fill in required values. The local DB runs on port 5435 (see `docker-compose.yml`). Set `NODE_ENV=developpement` for local development.