<svelte:options customElement={{ tag: 'dsc-nouveau-jeu', shadow: 'none' }} />

<script lang="ts">
  import axios from 'axios';

  let nom = $state('');

  const soumets = async (event: SubmitEvent) => {
    event.preventDefault();
    await axios.post('/api/jeux', { nom });
  };
</script>

<form onsubmit={soumets}>
  <label>
    Nom du jeu
    <input type="text" bind:value={nom} required />
  </label>

  <button type="submit">Terminer</button>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 792px;

    input:user-invalid {
      border: 2px solid red;
    }
  }
</style>
