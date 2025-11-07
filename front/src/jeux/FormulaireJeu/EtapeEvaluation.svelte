<script lang="ts">
  import type { ErreursValidationJeuEnEdition } from '../jeuEnEdition.type';
  import { jeuEnEditionStore } from '../stores/jeuEnEdition.store';
  import NoteAvecSmiley from './NoteAvecSmiley.svelte';

  export let erreurs: ErreursValidationJeuEnEdition;
</script>

<div class="questions">
  <div class="preambule">
    <h3>Votre avis nous intéresse&nbsp;!</h3>
    <p class="fr-text">
      Vos réponses nous permettent de mesurer l’impact de CyberEnJeux. Merci
      pour votre contribution&nbsp;!
    </p>
  </div>

  <div class="question">
    <p class="fr-text">
      CyberEnJeux a-t-il permis aux élèves de découvrir les enjeux et les
      métiers de la cybersécurité&nbsp;?
    </p>
    {#if erreurs.evaluationDecouverte}
      <dsfr-alert
        hasTitle={false}
        hasDescription={true}
        text={erreurs.evaluationDecouverte}
        type="error"
        size="sm"
        id="erreurs-evaluation-decouverte"
        icon="error"
        dismissible={false}
      ></dsfr-alert>
    {/if}
    <NoteAvecSmiley
      bind:note={$jeuEnEditionStore.evaluationDecouverte}
      nom="evaluationDecouverte"
    />
  </div>

  <div class="question">
    <p class="fr-text">
      Les élèves se montrent-ils désormais curieux ou intéressés par un futur
      métier dans la cybersécurité&nbsp;?
    </p>
    {#if erreurs.evaluationInteret}
      <dsfr-alert
        hasTitle={false}
        hasDescription={true}
        text={erreurs.evaluationInteret}
        type="error"
        size="sm"
        id="erreurs-evaluation-interet"
        icon="error"
        dismissible={false}
      ></dsfr-alert>
    {/if}
    <NoteAvecSmiley
      bind:note={$jeuEnEditionStore.evaluationInteret}
      nom="evaluationInteret"
      borneMinimale="Pas intéressés"
      borneMaximale="Très intéressés"
    />
  </div>

  <div class="question">
    <p class="fr-text">
      Comment qualifieriez-vous la satisfaction générale des élèves vis-à-vis de
      leur expérience CyberEnJeux&nbsp;?
    </p>
    {#if erreurs.evaluationSatisfactionGenerale}
      <dsfr-alert
        hasTitle={false}
        hasDescription={true}
        text={erreurs.evaluationSatisfactionGenerale}
        type="error"
        size="sm"
        id="erreurs-evaluation-satisfaction"
        icon="error"
        dismissible={false}
      ></dsfr-alert>
    {/if}
    <NoteAvecSmiley
      bind:note={$jeuEnEditionStore.evaluationSatisfactionGenerale}
      nom="evaluationSatisfactionGenerale"
      borneMinimale="Déçus"
      borneMaximale="Très satisfaits"
    />
  </div>

  <div class="question">
    <dsfr-textarea
      id="precisions"
      label="Souhaitez-vous nous en dire plus ? (facultatif)"
      onvaluechanged={(e: CustomEvent) =>
        ($jeuEnEditionStore.precisions = e.detail)}
      placeholder="Ce qui a le mieux fonctionné, exemples d'élèves motivés, difficultés rencontrées, suggestions d'amélioration..."
      rows={4}
      value={$jeuEnEditionStore.precisions ?? ''}
    ></dsfr-textarea>
  </div>
</div>

<style lang="scss">
  .questions {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .question {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      p {
        margin: 0;
      }
    }
  }
</style>
