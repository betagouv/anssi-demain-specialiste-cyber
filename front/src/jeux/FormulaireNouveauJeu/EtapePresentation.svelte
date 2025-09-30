<script lang="ts">
  import type { ErreursValidationJeuEnEdition } from '../jeu';
  import { jeuEnEditionStore } from '../stores/jeuEnEdition.store';

  export let erreurs: ErreursValidationJeuEnEdition;
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
  options={[
    {
      id: 'comportements-numeriques',
      value: 'comportements-numeriques',
      label: 'Comportements numériques',
    },
    {
      id: 'cyberharcelement',
      value: 'cyberharcelement',
      label: 'Cyberharcelement',
    },
    {
      id: 'gestion-crise-cyber',
      value: 'gestion-crise-cyber',
      label: 'Gestion de crise cyber',
    },
    {
      id: 'lutte-manipulation-information',
      value: 'lutte-manipulation-information',
      label: "Lutte contre la manipulation de l'information",
    },
    { id: 'menace-cyber', value: 'menace-cyber', label: 'Menace cyber' },
    { id: 'orientation', value: 'orientation', label: 'Orientation' },
    {
      id: 'techniques-securite-numerique',
      value: 'techniques-securite-numerique',
      label: 'Techniques de sécurité numérique',
    },
    {
      id: 'valoriser-talents-feminins',
      value: 'valoriser-talents-feminins',
      label: 'Valoriser les talents féminins',
    },
  ]}
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
