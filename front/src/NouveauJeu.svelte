<svelte:options customElement={{ tag: 'dsc-nouveau-jeu', shadow: 'none' }} />

<script lang="ts">
  import axios from 'axios';

  type Erreurs = {
    nom?: string;
    sequence?: string;
  };

  let nom = $state('');
  let sequence = $state('');
  let erreurs = $state<Erreurs>({});

  const soumets = async (event: Event) => {
    event.preventDefault();
    erreurs = {
      nom: nom ? undefined : 'Le nom est obligatoire',
      sequence: sequence ? undefined : 'La séquence est obligatoire',
    };
    if (erreurs.nom || erreurs.sequence) {
      return;
    }
    await axios.post('/api/jeux', { nom, sequence });
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
