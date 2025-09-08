<svelte:options
  customElement={{
    tag: 'dsc-creation-compte',
    shadow: 'none',
    props: {
      informationsProfessionnelles: { type: 'Object' },
    },
  }}
/>

<script lang="ts">
  const { informationsProfessionnelles } = $props();
</script>

<section class="creation-compte">
  <h3>Finalisez votre inscription</h3>

  <fieldset>
    <legend>Votre identité</legend>
    <p>Prénom&nbsp;: <strong>{informationsProfessionnelles.prenom}</strong></p>
    <p>Nom&nbsp;: <strong>{informationsProfessionnelles.nom}</strong></p>
  </fieldset>

  <fieldset>
    <legend>Votre établissement</legend>
    <p>Dénomination légale&nbsp;: <strong>{informationsProfessionnelles.organisation.nom}</strong></p>
    <p>SIRET&nbsp;: <strong>{informationsProfessionnelles.organisation.siret}</strong></p>
    <p>Département&nbsp;: <strong>{informationsProfessionnelles.organisation.departement}</strong></p>
  </fieldset>

  <fieldset>
    <div>
      <label>
        <input type="checkbox" />
        <span>J’accepte de recevoir la lettre d’information DemainSpécialisteCyber.</span>
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" required />
        <span>J’accepte les conditions générales d’utilisation DemainSpécialisteCyber.</span>
      </label>
    </div>
  </fieldset> 

  <lab-anssi-bouton titre="Créer mon compte" variante="primaire" taille="lg" largeurMaximale></lab-anssi-bouton>
</section>
