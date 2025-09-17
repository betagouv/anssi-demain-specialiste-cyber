<svelte:options customElement={{ tag: 'dsc-nouveau-jeu', shadow: 'none' }} />

<script lang="ts">
  import axios from 'axios';
  import type { Validateur } from '../validateur';
  import type { JeuEnEdition } from './jeu';
  import { type ErreursValidationJeuEnEdition, ValidateurDeJeuEnEdition } from './ValidateurDeJeuEnEdition';

  interface Props {
    validateur: Validateur<JeuEnEdition>;
  }

  const { validateur = new ValidateurDeJeuEnEdition() }: Props = $props();

  let nom = $state('');
  let nomEtablissement = $state('');
  let sequence = $state('');
  let erreurs = $state<ErreursValidationJeuEnEdition>({
    nom: undefined,
    nomEtablissement: undefined,
    sequence: undefined
  });

  const soumets = async (event: Event) => {
    event.preventDefault();

    const jeu: Jeu = {
      nom,
      sequence,
      nomEtablissement
    };
    if (!validateur.estValide(jeu)) {
      erreurs = validateur.valide(jeu);
      return;
    }

    await axios.post('/api/jeux', { nom, sequence, nomEtablissement });
  };
</script>

<form novalidate>
  <label>
    Nom du jeu
    <input type="text" bind:value={nom} required />
  </label>
  {#if erreurs.nom}
    <span class="erreur" role="alert">{erreurs.nom}</span>
  {/if}

  <label>
    Nom de votre établissement
    <input type="text" bind:value={nomEtablissement} required />
  </label>
  {#if erreurs.nomEtablissement}
    <span class="erreur" role="alert">{erreurs.nomEtablissement}</span>
  {/if}

  <div class="sequence">
    <p>Format de la séquence CyberEnJeux</p>
    <div class="boutons">
      <label>
        <input
          type="radio"
          name="sequence"
          value="heure"
          required
          bind:group={sequence}
        />
        Heure de cours
      </label>
      <label>
        <input
          type="radio"
          name="sequence"
          value="demi-journee"
          bind:group={sequence}
        />
        Demi-journee
      </label>
      <label>
        <input
          type="radio"
          name="sequence"
          value="journee"
          bind:group={sequence}
        />
        Journée
      </label>
    </div>
    {#if erreurs.sequence}
      <span class="erreur" role="alert">{erreurs.sequence}</span>
    {/if}
  </div>

  <button type="submit" onclick={soumets}>Terminer</button>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 792px;

    .sequence {
      display: flex;
      flex-direction: column;

      .boutons {
        display: flex;
        flex-direction: column;
      }
    }

    .erreur {
      color: red;
    }

    input:user-invalid {
      border: 2px solid red;
    }
  }
</style>
