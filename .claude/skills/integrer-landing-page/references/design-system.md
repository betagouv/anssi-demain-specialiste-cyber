# Design system (@lab-anssi/ui-kit + DSFR)

Les pages sont composées de web components `dsfr-*` (Système de Design de l'État)
et `dsc-*` (spécifiques DemainSpécialisteCyber), fournis par `@lab-anssi/ui-kit`.

## Sources
- **Storybook** (rendu visuel + doc) : https://betagouv.github.io/lab-anssi-ui-kit/
- **Manifest machine** (à privilégier pour la codegen) :
  https://betagouv.github.io/lab-anssi-ui-kit/ui-kit-components.json

### Manifest — mode d'emploi
- ⚠️ **Demander la permission de le pull en début de tâche d'intégration.** Ne pas
  le récupérer sans accord explicite de l'utilisateur.
- Format inspiré de custom-elements-manifest
  (https://custom-elements-manifest.open-wc.org/), `schemaVersion: 1`. Structure :
  ```
  components[]: {
    tagName, title, source,
    props[]: { name, attribute, type, tsType, description },
    slots?, events?, …
  }
  ```
- S'en servir pour : trouver le bon `tagName`, distinguer attribut (kebab-case) vs
  prop, connaître les types, les slots et events. **Ne pas inventer** de
  composants ou de props.

## Conventions de style
- **SCSS**, mobile-first. Breakpoints via
  `@use 'points-de-rupture' as *;` puis `@include a-partir-de(md) { … }`.
  Points de rupture : `xs` 320, `xs2` 440, `sm` 576, `md` 767, `lg` 992,
  `xl` 1248, `xxl` 1440.
- Dans un fichier `.svelte`, importer l'alias : `@use '@style/points-de-rupture' as *;`.
- **Tokens couleur** : `--bleu-profond-dsc` (#131429),
  `--bouton-primaire-couleur-fond` (#000091)… + variables de thème DSFR
  (`--text-title-blue-france`, `--background-alt-blue-france`,
  `--background-alt-blue-cumulus`, `--grey-50-1000`…).
- Classes utilitaires DSFR (`fr-text--lead`, `fr-container`…) et classes DSC
  (`titre-alternatif-xs`…) disponibles globalement.

## Assets
- Emplacement disque : `front/statique/assets/` (images dans `.../images/`).
- Référencés dans le HTML / Pug / SCSS par `/assets/…`.
- Formats rencontrés : `.svg`, `.avif`.
- ⚠️ Avant d'enregistrer une image tirée de Figma, **demander à l'utilisateur le
  nom de fichier et le répertoire**. Défaut proposé :
  `front/statique/assets/images/` (il choisit le sous-dossier et le nom).
