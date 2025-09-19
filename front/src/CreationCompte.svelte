<svelte:options
  customElement={{
    tag: 'dsc-creation-compte',
    shadow: 'none',
    props: {
      informationsProfessionnelles: { type: 'Object' },
      token: { type: 'String' },
    },
  }}
/>

<script lang="ts">
  import axios from 'axios';
  import { clic } from './actions.svelte';

  const { informationsProfessionnelles, token } = $props();

  let infolettreAcceptee = $state(false);

  let formulaire: HTMLFormElement;
  let enCoursEnvoi = $state(false);
  const valide = async () => {
    if (formulaire.checkValidity()) {
      try {
        enCoursEnvoi = true;
        await axios.post('/api/utilisateurs', {
          infolettreAcceptee,
          token,
        });
        window.location.href = '/oidc/connexion';
      } catch {
        enCoursEnvoi = false;
      }
    }
  };
</script>

<section class="creation-compte">
  <h3>Finalisez votre inscription</h3>
  <form bind:this={formulaire}>
    <fieldset>
      <legend>Votre identité</legend>
      <p>
        Prénom&nbsp;: <strong>{informationsProfessionnelles.prenom}</strong>
      </p>
      <p>Nom&nbsp;: <strong>{informationsProfessionnelles.nom}</strong></p>
    </fieldset>

    <fieldset>
      <legend>Votre établissement</legend>
      <p>
        Dénomination légale&nbsp;: <strong
          >{informationsProfessionnelles.organisation.nom}</strong
        >
      </p>
      <p>
        SIRET&nbsp;: <strong
          >{informationsProfessionnelles.organisation.siret}</strong
        >
      </p>
      <p>
        Département&nbsp;: <strong
          >{informationsProfessionnelles.organisation.departement}</strong
        >
      </p>
    </fieldset>

    <fieldset>
      <div>
        <label>
          <input type="checkbox" bind:checked={infolettreAcceptee} />
          <span
            >J’accepte de recevoir la lettre d’information
            DemainSpécialisteCyber.</span
          >
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" required />
          <span
            >J’accepte les conditions générales d’utilisation
            DemainSpécialisteCyber.</span
          >
        </label>
      </div>
    </fieldset>

    <lab-anssi-bouton
      titre="Créer mon compte"
      variante="primaire"
      taille="lg"
      largeurMaximale
      use:clic={valide}
      disabled={!enCoursEnvoi}
    ></lab-anssi-bouton>
  </form>
</section>
