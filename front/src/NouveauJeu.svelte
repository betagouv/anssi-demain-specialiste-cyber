<svelte:options customElement={{ tag: 'dsc-nouveau-jeu', shadow: 'none' }} />

<script lang="ts">
  import axios from 'axios';

  let nom = $state('');
  let sequence = $state('');

  const soumets = async (event: SubmitEvent) => {
    event.preventDefault();
    await axios.post('/api/jeux', { nom, sequence });
  };
</script>

<form onsubmit={soumets}>
  <label>
    Nom du jeu
    <input type="text" bind:value={nom} required />
  </label>

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
  </div>

  <button type="submit">Terminer</button>
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

    input:user-invalid {
      border: 2px solid red;
    }
  }
</style>
