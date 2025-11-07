<script lang="ts">
  import type { ErreursValidationJeuEnEdition } from '../jeuEnEdition.type';
  import { jeuEnEditionStore } from '../stores/jeuEnEdition.store';
  import { thematiques } from '../thematiques';

  export let erreurs: ErreursValidationJeuEnEdition;

  const optionsThematiques = thematiques.map((thematique) => ({
    id: thematique.code,
    label: thematique.libelle,
    value: thematique.code,
  }));
</script>

<dsfr-input
  errorMessage={erreurs.nom}
  id="nomDuJeu"
  label="Nom du jeu"
  onvaluechanged={(e: CustomEvent) => ($jeuEnEditionStore.nom = e.detail)}
  status={erreurs.nom ? 'error' : 'default'}
  value={$jeuEnEditionStore.nom}
>
</dsfr-input>

<dsfr-select
  errorMessage={erreurs.categorie}
  id="categorie"
  label="Catégorie"
  value={$jeuEnEditionStore.categorie ?? ''}
  onvaluechanged={(e: CustomEvent) => ($jeuEnEditionStore.categorie = e.detail)}
  options={[
    {
      value: 'jeu-carte',
      label: 'Jeu de carte',
    },
    {
      value: 'jeu-plateau',
      label: 'Jeu de plateau',
    },
    {
      value: 'jeu-role',
      label: 'Jeu de rôle',
    },
    {
      value: 'jeu-dessin',
      label: 'Jeu de dessin',
    },
    {
      value: 'simulation',
      label: 'Simulation',
    },
    {
      value: 'autre',
      label: 'Autre',
    },
  ]}
  placeholder="Sélectionner une option"
  placeholderDisabled={true}
  status={erreurs.categorie ? 'error' : 'default'}
>
</dsfr-select>

<lab-anssi-multi-select
  id="thematique"
  label="Thématiques"
  options={optionsThematiques}
  placeholder="Sélectionner une ou plusieurs options"
  values={$jeuEnEditionStore.thematiques}
  onvaluechanged={(e: CustomEvent) =>
    ($jeuEnEditionStore.thematiques = e.detail)}
  status={erreurs.thematiques ? 'error' : 'default'}
  errorMessage={erreurs.thematiques}
></lab-anssi-multi-select>

<dsfr-textarea
  errorMessage={erreurs.description}
  hint="Présenter le jeu et son fonctionnement en quelques lignes."
  id="description"
  label="Description"
  onvaluechanged={(e: CustomEvent) =>
    ($jeuEnEditionStore.description = e.detail)}
  rows={8}
  status={erreurs.description ? 'error' : 'default'}
  value={$jeuEnEditionStore.description}
></dsfr-textarea>
