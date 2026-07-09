---
name: integrer-landing-page
description: >-
  Intègre une page / landing page de DemainSpécialisteCyber à partir d'une maquette
  Figma, en respectant le pattern du repo : route Express + vue Pug (`extends
  fragments/base`) + web component Svelte `dsc-*` + SCSS par page. À utiliser dès
  qu'on fournit une URL Figma (node-id) ou qu'on demande de créer une nouvelle
  page/route, d'intégrer un écran, un héros ou une section de maquette dans le
  front. Procède section par section, avec validation de l'utilisateur.
---

# Intégrer une landing page (DemainSpécialisteCyber)

Ce skill décrit comment transformer une maquette Figma en page navigable dans ce
monorepo (Express + Pug côté back, Svelte web components côté front).

## Principe : une « page » = 6 pièces câblées

1. **Route** déclarée dans `back/src/api/ressourcesPages.ts`
2. **Vue Pug** `back/vues/<route>.pug` (`extends fragments/base`)
3. **Web component Svelte** `front/src/<route>/<Composant>.svelte` (tag `dsc-<route>`)
4. **Export** dans `front/src/index.ts`
5. **Styles** `front/src/style/_page-<route>.scss` + `@use` dans `index.scss`
6. **Test** dans `back/tests/api/ressourcesPages.spec.ts`

Détails exacts (chemins + snippets) → [`references/cablage-page.md`](references/cablage-page.md).
Composants, tokens, breakpoints, assets → [`references/design-system.md`](references/design-system.md).
Squelettes à copier → [`templates/`](templates/).

## Cadence : petit à petit, avec validation

Le chantier se fait **section par section**. Après le scaffolding, intégrer **une
seule section** de la maquette à la fois, montrer le résultat, et attendre la
validation de l'utilisateur avant de passer à la suivante. Ne jamais dérouler
toute la page d'un coup.

## Style de code
- **Pas de commentaires partout.** Le code doit s'expliquer de lui-même : préférer
  des **noms de variables explicites** et l'**extraction de fonctions** (ou de
  composants) quand ça rend l'intention plus claire, plutôt que d'ajouter un commentaire.
- Réserver les commentaires aux cas où l'intention n'est pas déductible du code
  (ex. provenance d'une valeur exacte reprise de la maquette, contournement non évident).
- **Tout composant `.svelte` commence par un bloc `<script lang="ts">` en haut,
  même vide** (avant le markup, puis le `<style>`).

## Workflow

### 0. Prérequis
- Une URL Figma pointant sur le node à intégrer
  (`…/design/<fileKey>/…?node-id=<n>-<m>`). Si absente, la demander.

### 1. Cadrer la maquette
- Extraire `fileKey` et `nodeId` de l'URL (`node-id=6172-6974` → nodeId `6172-6974`).
- `get_screenshot` (rendu global) + `get_metadata` (structure : frames, sections,
  tailles). Repérer les sections et leur ordre.
- Pour une section précise : `get_design_context` sur son node.

### 2. Récupérer le design system — AVEC PERMISSION
- **Demander à l'utilisateur la permission de pull** le manifest des composants :
  `https://betagouv.github.io/lab-anssi-ui-kit/ui-kit-components.json`
  (ne pas le récupérer sans accord — c'est une étape explicite de début de tâche).
- Une fois récupéré, s'en servir pour choisir les bons `dsc-*`/`dsfr-*` et leurs
  props / slots / attributs, au lieu de les deviner. Détail du format →
  `references/design-system.md`.

### 3. Scaffolder la page
- Suivre `references/cablage-page.md` (route + pug + web component + export + scss + test).
- Partir des squelettes de `templates/`.

### 4. Intégrer section par section
Pour chaque section, dans l'ordre de la maquette :
1. `get_design_context` du node de la section,
2. construire le markup dans le web component avec les composants du design system,
3. styler dans `_page-<route>.scss` (scopé sous `.page-<route>`),
4. **montrer / faire valider** avant de continuer.

### 5. Assets (images)
- Télécharger les visuels depuis Figma (`download_assets` ou l'URL renvoyée par
  `get_design_context`).
- ⚠️ Avant d'enregistrer, **demander à l'utilisateur le nom de fichier et le
  répertoire**. Proposer par défaut `front/statique/assets/images/` (il choisit
  le sous-dossier et le nom de fichier).
- Référencer ensuite l'asset en `/assets/images/…`.

### 6. Vérification
- Proposer les commandes de vérif (typecheck/build front, test back) et
  **laisser l'utilisateur les lancer** — il communique le résultat.
  Ex. `pnpm --filter anssi-demain-specialiste-cyber-back test`,
  `pnpm --filter anssi-demain-specialiste-cyber-front build`.
