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
  let cguAcceptees = $state(false);

  let formulaire: HTMLFormElement;
  let enCoursEnvoi = $state(false);
  const valide = async () => {
    if (cguAcceptees) {
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
  <div class="conteneur-formulaire">
    <form bind:this={formulaire}>
      <h3>Finalisez votre inscription</h3>
      <fieldset>
        <legend>
          <lab-anssi-icone taille="md" nom="account-circle-line"
          ></lab-anssi-icone>
          Votre identité</legend
        >
        <p>
          Prénom&nbsp;: <strong>{informationsProfessionnelles.prenom}</strong>
        </p>
        <p>Nom&nbsp;: <strong>{informationsProfessionnelles.nom}</strong></p>
        <p>
          Mail professionnel&nbsp;: <strong
            >{informationsProfessionnelles.email}</strong
          >
        </p>
      </fieldset>

      <hr />

      <fieldset>
        <legend>
          <lab-anssi-icone taille="md" nom="building-line"
          ></lab-anssi-icone>Votre établissement</legend
        >
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
          Département de votre organisation&nbsp;: <strong
            >{informationsProfessionnelles.organisation.departement}</strong
          >
        </p>
      </fieldset>

      <hr />

      <dsfr-checkbox
        id="lettre-information"
        name="lettre-information"
        status="default"
        label="J’accepte de recevoir la lettre d’information DemainSpécialisteCyber."
        value={infolettreAcceptee}
        onvaluechanged={(e: CustomEvent) => (infolettreAcceptee = e.detail)}
      ></dsfr-checkbox>
      <dsfr-checkbox
        id="cgu"
        name="cgu"
        status="default"
        value={cguAcceptees}
        onvaluechanged={(e: CustomEvent) => (cguAcceptees = e.detail)}
      >
        <span
          >J’accepte les <dsfr-link
            href="/cgu"
            label="conditions générales d’utilisation"
          /> DemainSpécialisteCyber.
        </span>
      </dsfr-checkbox>

      <dsfr-button
        label="Créer mon compte"
        kind="primary"
        size="lg"
        use:clic={valide}
        disabled={enCoursEnvoi || !cguAcceptees}
      ></dsfr-button>
    </form>
  </div>
</section>

<style lang="scss">
  @use './points-de-rupture' as *;
  .creation-compte {
    display: flex;
    padding: 3.5rem 1rem;
    flex-direction: column;
    align-items: center;

    .conteneur-formulaire {
      display: flex;
      max-width: 588px;
      padding: 3.5rem 1rem;
      justify-content: center;
      border: 1px solid var(--border-default-grey);

      @include a-partir-de(sm) {
        padding: 3.5rem 6.375rem;
      }
      h3 {
        margin: 0;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 384px;

        fieldset {
          margin: 0;

          legend {
            font-size: 1.125rem;
            font-weight: bold;
            line-height: 1.5rem;
            margin-bottom: 1rem;

            lab-anssi-icone {
              margin-right: 0.5rem;
            }
          }

          p {
            margin-top: 0.25rem;
            margin-bottom: 0;
            font-size: 1rem;
            line-height: 1.5rem;
          }
        }

        dsfr-button {
          margin-top: 1.5rem;
        }
      }
    }
  }
</style>
