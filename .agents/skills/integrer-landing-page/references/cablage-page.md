# Câblage d'une nouvelle page

Exemple de référence vivant dans le repo : la page **`/operation-cactus`**
(`back/vues/operation-cactus.pug`, `front/src/operation-cactus/OperationCactus.svelte`,
tag `dsc-operation-cactus`). S'en inspirer, ainsi que de
`france-cybersecurity-challenge` et `evenements`.

## Conventions de nommage (route `/<route>`)
| Pièce                      | Chemin / valeur                                                 |
|----------------------------|-----------------------------------------------------------------|
| Vue Pug                    | `back/vues/<route>.pug`                                         |
| Classe body (`classePage`) | `page-<route>`                                                  |
| Dossier front              | `front/src/<route>/`                                            |
| Composant                  | `<PascalCase>.svelte`, tag `dsc-<route>`                        |
| Style                      | `front/src/style/_page-<route>.scss`, sélecteur `.page-<route>` |

## 1. Route — `back/src/api/ressourcesPages.ts`
Ajouter dans le tableau `pages` :
```ts
{ route: '/<route>', protegee: false },
```
- `protegee: true` → protégée par JWT, redirige vers `/connexion` si non connecté.
- Le moteur mappe automatiquement `route` → vue `back/vues/<route>.pug`
  (`path.join(chemin, route sans '/')`). `chemin` sert aux sous-dossiers (ex. `annexes`).

## 2. Vue Pug — `back/vues/<route>.pug`
```pug
extends fragments/base

block variables
  - var titrePage = "…"
  - var descriptionPage = "…"
  - var classePage = "page-<route>"
  - var ariane = []
  - ariane[0] = { id: 'accueil', label: 'Accueil', href: '/' }
  - ariane[1] = { id: '<route>', label: "…", href: '#' }

//- Optionnel : surcharger le héros. Par défaut, héros SOMBRE défini dans
//- fragments/entete.pug. Variante "clair" :
block heros
    dsc-heros(variant="clair" ariane=ariane)
        h1.titre-alternatif-xs(slot="titre") #{titrePage}
        p.fr-text--lead(slot="description") #{descriptionPage}
        .actions
            dsfr-button(label="…" kind="primary" markup="a" href="…")
        img.illustration(slot="illustration" src="/assets/images/….svg" alt="")

block contenu
    dsc-<route>

    block apres-contenu
```
Points clés :
- `block heros` est **déclaré dans `fragments/entete.pug`** (inclus par `base`) ;
  le surcharger dans la page pour le customiser. Sans surcharge → héros sombre par
  défaut avec `titrePage` / `descriptionPage`.
- Slots de `dsc-heros` : `ariane`, `avant-titre`, `titre`, `description`, défaut,
  `illustration`. Props : `variant` (`standard` | `alternatif` | `clair`),
  `ariane` (Array), `avec-filtres` (Boolean).

## 3. Web component — `front/src/<route>/<Composant>.svelte`
```svelte
<svelte:options customElement={{ tag: 'dsc-<route>', shadow: 'none' }} />

<script lang="ts">
  // …
</script>

<dsfr-container>
  <!-- sections -->
</dsfr-container>
```
- `shadow: 'none'` → les styles globaux (SCSS de la page) s'appliquent au contenu.
- Pour recevoir des attributs depuis le Pug, déclarer `props` dans `customElement`
  (voir `front/src/composants/Heros.svelte`).

## 4. Export — `front/src/index.ts`
```ts
export * from './<route>/<Composant>.svelte';
```
Sans cet export, le custom element n'est pas enregistré → le tag reste inerte.

## 5. Styles — `front/src/style/_page-<route>.scss`
```scss
@use 'points-de-rupture' as *;

.page-<route> {
}
```
Puis l'importer dans `front/src/index.scss` :
```scss
@use 'style/page-<route>';
```

## 6. Test — `back/tests/api/ressourcesPages.spec.ts`
Page publique → l'ajouter au `describe.each` des pages publiques :
```ts
{ route: '/<route>', vue: '<route>' },
```
Page protégée → l'ajouter au `describe.each` du haut (vérifie 200 connecté / 302 sinon).

## Styliser le héros et reproduire des espacements exacts

`dsc-heros` a `shadow: 'none'`. **Ne styliser que les éléments passés en slot**
(`h1.titre-alternatif-xs`, `p`, `.actions`, `.illustration`), jamais les wrappers
internes du composant (`.conteneur`, `.principal`, `hgroup`) : avec `shadow: 'none'`,
le contenu des slots n'y est pas niché, donc les règles `gap`/`padding` posées sur
ces wrappers ne s'appliquent à rien (symptôme : « les règles CSS ne sont pas prises
en compte »). Le padding vertical global du héros vient de la variante (`clair`,
`alternatif`, `standard`), pas de la page.

⚠️ Le nom de classe doit être porté par l'élément que tu **passes en slot** dans le
Pug (ex. `img.illustration(slot="illustration")`), et c'est **cet élément** que tu
cibles en CSS (`img.illustration`). Ne cible pas le `<div>` wrapper de slot généré
par le composant : il ne contraint pas le contenu projeté (piège classique sur
l'illustration : image affichée en pleine taille).

Pour des espacements **exacts** : relever les valeurs de la maquette
(`get_design_context` sur le node du héros donne les `gap`/`padding`) et les traduire
en **marges** sur les éléments de slot. Exemple (héros mobile d'Opération Cactus —
fil d'Ariane → titre 24px, titre → sous-titre 12px, sous-titre → bouton 24px,
bouton → illustration 40px, illustration → bas 48px) :

```scss
.page-operation-cactus {
  dsc-heros {
    h1.titre-alternatif-xs {
      margin: 24px 0 12px;
    }

    p {
      margin: 0;

      &:last-of-type {
        margin: 0 0 24px;
      }
    }

    .actions {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 40px;
    }

    img.illustration {
      display: block;
      width: 100%;
      max-width: 36.75rem;
      height: auto;
      margin-bottom: 48px;
    }
  }
}
```

Références vivantes : `_page-cyber-en-jeux.scss`, `_page-france-cybersecurity-challenge.scss`.
