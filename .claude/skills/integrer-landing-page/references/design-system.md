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
- Classes utilitaires DSFR (`fr-text--lead`, `fr-text--lg`, `fr-container`…) et
  classes de typo DSC qui mappent les noms Figma : `.texte-article-lg` (18/28,
  « LG - Texte article »), `.texte-standard-md` (16/24, « MD - Texte standard »),
  `.texte-detail-sm` (14/24) — elles incluent déjà `margin: 0 0 24px`. Plus
  `.titre-alternatif-xs`. Les titres `h1`–`h6` sont stylés globalement
  (voir `front/src/style/_standard.scss`).

## Grille & largeurs max (surtout desktop `lg`/`xl`)

Deux niveaux distincts — ne pas les confondre :

### 1. Largeur max de page → `dsfr-container` (DSFR)
La largeur max + le padding horizontal + le centrage de la page sont fournis par le
`dsfr-container` (le `.fr-container` du DSFR, largeurs calées sur les breakpoints DSFR).
**Ne pas recoder** de `max-width` de container à la main : envelopper chaque section
dans `<dsfr-container>` (comme le font toutes les sections existantes).

### 2. Grille custom 12 colonnes → `front/src/style/_grille.scss`
Pour **borner un bloc à un nombre de colonnes** *à l'intérieur* du container (typiquement
en desktop), utiliser la fonction `taille-pour-colonnes($n)` : elle renvoie la largeur
de `n` colonnes sur 12 (gouttière DSFR de 1rem).

- Importer : `@use '@style/grille' as *;`
- L'appliquer en `max-width`, avec `margin-inline: auto` pour centrer, aux breakpoints
  desktop (`lg`, `xl`).

```scss
@use '@style/grille' as *;

.bloc-texte {
  margin-inline: auto;

  @include a-partir-de(lg) {
    max-width: taille-pour-colonnes(10);   // 10/12 colonnes
  }
  @include a-partir-de(xl) {
    max-width: taille-pour-colonnes(8);    // resserré à 8/12 en très large
  }
}
```

Exemples réels : `PresentationCyberEnjeux.svelte`, `ResumeFranceCybersecurityChallenge.svelte`,
`MesJeux.svelte`, `FormulaireJeu.svelte`.

### 3. Deux colonnes contenu | illustration → classe partagée
`front/src/style/_contenu-deux-colonnes.scss` définit une classe **globale**
`.contenu-deux-colonnes` (contenu | illustration, empilé en mobile → `1fr 1fr` à `md`,
variante `.illustration-au-dessus` pour inverser l'ordre en mobile). La réutiliser plutôt
que recoder une grille deux-colonnes, sauf besoin spécifique (ex. une ligne « titre pleine
largeur » au-dessus des deux colonnes).

## Assets
- Emplacement disque : `front/statique/assets/` (images dans `.../images/`).
- Référencés dans le HTML / Pug / SCSS par `/assets/…`.
- Formats rencontrés : `.svg`, `.avif`.
- ⚠️ Avant d'enregistrer une image tirée de Figma, **demander à l'utilisateur le
  nom de fichier et le répertoire**. Défaut proposé :
  `front/statique/assets/images/` (il choisit le sous-dossier et le nom).
- ⚠️ **SVG exportés de Figma** : ils arrivent souvent avec
  `preserveAspectRatio="none" width="100%" height="100%"` → ils s'étirent pour
  remplir leur boîte (picto déformé). Normaliser la balise `<svg>` en dimensions
  fixes (ex. `width="80" height="80"` + le `viewBox` d'origine), comme les pictos
  qui fonctionnent (`/assets/images/cej/*.svg`).

## Pièges fréquents
- **Collision de nom de classe** : les styles de `front/src/style/` (encarts,
  pages) sont **globaux et non scopés**. Une classe générique dans un composant
  (ex. `.chiffres-cles`) hérite alors des styles d'un encart existant
  (`_encart-chiffres-cles.scss` : fond bleu + padding). Utiliser des noms **distinctifs**
  dans les composants (ex. `.cartes-cles`, `.paragraphes`) ou vérifier avant
  (`grep -rE '\.<classe>' front/src/style`).
- Le `<style>` d'un composant Svelte est scopé (hash) → il gagne en spécificité
  sur une règle globale de même classe, mais **n'annule pas** les propriétés qu'il
  ne redéclare pas (le fond / le padding globaux continuent de fuiter). D'où :
  préférer un nom unique plutôt qu'une surcharge partielle.
- **Composants `dsfr-*` = shadow DOM `open`, sans `::part`** : le CSS externe ne
  peut pas atteindre leur contenu interne (le mode `open` n'ouvre l'accès qu'en JS,
  pas en CSS). Pour styler / ajuster ce contenu (ex. marge d'un `<p>`), le fournir
  soi-même via un **slot** du composant : le contenu slotté reste en **light DOM**
  et devient ciblable en CSS depuis le composant parent.
- **`dsfr-highlight`** : le composant ne s'affiche que si l'**attribut `text` est
  présent**. Donc pour maîtriser le rendu du texte (typo, marges), garder un
  `text="…"` (valeur factice, ignorée quand le slot est fourni) **et** passer le
  vrai contenu via `<p slot="text">`, puis annuler sa marge avec
  `dsfr-highlight p { margin: 0 }`.
- **`dsfr-card`** : les zones optionnelles sont **gardées par un attribut `has-*`**
  (booléen). Fournir la prop seule ne suffit pas — il faut aussi lever le flag,
  sinon la zone ne s'affiche pas. Le plus fréquent : **`has-description`** (sans
  lui la `description` n'apparaît pas). Idem `has-detail-start`/`detail-start`,
  `has-detail-end`/`detail-end`, `has-badge`, `has-buttons`, `has-tag`,
  `has-header-badge`. Autres props utiles : `href` (+ `enlarge` = carte entière
  cliquable, `no-link` sinon), `blank` (→ `target="_blank"`, l'icône lien externe
  remplace alors la flèche interne automatiquement, via le CSS DSFR `[target=_blank]`),
  `markup` (niveau du titre, défaut `h3`), `size` (défaut `md`), `horizontal`, `src`/`alt`.
