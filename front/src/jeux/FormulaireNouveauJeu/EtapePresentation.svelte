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

<label>
  Thématiques
  <select
    multiple
    placeholder="Sélectionner une ou plusieurs options"
    bind:value={$jeuEnEditionStore.thematiques}
  >
    <option value="comportements-numeriques">Comportements numériques</option>
    <option value="cyberharcelement">Cyberharcelement</option>
    <option value="gestion-crise-cyber">Gestion de crise cyber</option>
    <option value="lutte-manipulation-information"
      >Lutte contre la manipulation de l'information
    </option>
    <option value="menace-cyber">Menace cyber</option>
    <option value="orientation">Orientation</option>
    <option value="techniques-securite-numerique"
      >Techniques de sécurité numérique
    </option>
    <option value="valoriser-talents-feminins"
      >Valoriser les talents féminins
    </option>
  </select>
</label>

{#if erreurs.thematiques}
  <span class="erreur" role="alert">{erreurs.thematiques}</span>
{/if}

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
