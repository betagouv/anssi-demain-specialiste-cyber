<script lang="ts">
  type Indice = {
    passage: string;
    titre: string;
    explication: string;
  };

  const indices: Indice[] = [
    {
      passage: '+33 7 56 **** 18',
      titre: 'Numéro inconnu',
      explication: `Un vrai service t'écrit rarement depuis un numéro de portable classique. Vérifie toujours qui écrit.`,
    },
    {
      passage: 'Bonjour Léa',
      titre: 'Ton prénom',
      explication: `Il peut venir d'une fuite de données. Les escrocs personnalisent leurs messages pour paraître crédibles.`,
    },
    {
      passage: 'suspendu dans 2h',
      titre: `L'urgence`,
      explication: `«\u00A0Dans 2h\u00A0», «\u00A0dernier rappel\u00A0»… La pression sert à t'empêcher de réfléchir. Prends le temps.`,
    },
    {
      passage: 'cinejeunes-verif-compte.example/l3a',
      titre: 'Lien suspect',
      explication: `L'adresse ne correspond pas au site officiel. Ne clique pas\u00A0: ouvre toi-même l'appli ou le site officiel.`,
    },
    {
      passage: 'renvoie-le nous en réponse',
      titre: 'On te demande un code',
      explication: `Un code reçu par SMS, c'est la clé de ton compte. Personne de sérieux ne te le demandera jamais.`,
    },
  ];

  let indicesTrouves: Record<number, boolean> = $state({});

  let toggleActif = $state(false);

  function activeLindice(indice: number) {
    indicesTrouves[indice] = true;
    if (Object.keys(indicesTrouves).length === 5) {
      toggleActif = true;
    }
  }

  function monterLesIndices() {
    toggleActif = !toggleActif;

    if (toggleActif) {
      for (let i = 0; i < 5; i++) {
        indicesTrouves[i] = true;
      }
    } else {
      indicesTrouves = {};
    }
  }
</script>

<section id="repere-les-pieges" class="pieges">
  <div class="conteneur">
    <div class="colonne-message">
      <h2 class="titre fr-h2">Repère les pièges</h2>
      <p class="consigne texte-article-lg">
        Ce message fictif cache 5 indices d'une tentative d'arnaque. Clique sur les éléments suspects.
      </p>

      <div class="message">
        <div class="entete">
          <div class="avatar">
            <span class="fr-icon-user-fill" aria-hidden="true"></span>
          </div>
          <div class="expediteur">
            <button
              type="button"
              class="numero fr-text"
              class:actif={indicesTrouves[0]}
              aria-pressed={indicesTrouves[0] ? 'true' : 'false'}
              onclick={() => activeLindice(0)}
            >
              {indices[0].passage}
            </button>
          </div>
        </div>

        <p class="horodatage fr-text--xs">Aujourd'hui 22:47</p>

        <div class="bulle">
          <p class="fr-text--sm">
            <button
              type="button"
              class="hotspot"
              class:actif={indicesTrouves[1]}
              aria-pressed={indicesTrouves[1] ? 'true' : 'false'}
              onclick={() => activeLindice(1)}>{indices[1].passage}</button
            >, ton compte CinéJeunes+ va être
            <button
              type="button"
              class="hotspot"
              class:actif={indicesTrouves[2]}
              aria-pressed={indicesTrouves[2] ? 'true' : 'false'}
              onclick={() => activeLindice(2)}>{indices[2].passage}</button
            >
            suite à une activité inhabituelle. Pour le garder, confirme ton identité ici&nbsp;:
            <span
              class="hotspot"
              class:actif={indicesTrouves[3]}
              role="button"
              tabindex="0"
              aria-pressed={indicesTrouves[3] ? 'true' : 'false'}
              onclick={(e: Event) => {
                e.preventDefault();
                activeLindice(3);
              }}
              onkeydown={(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  activeLindice(3);
                }
              }}
            >
              <dsfr-link
                label={indices[3].passage}
                href="#repere-les-pieges"
                size="sm"
                neutral={indicesTrouves[3] ? 'true' : undefined}
              ></dsfr-link>
            </span>
          </p>
          <p class="fr-text--sm">
            Tu vas aussi recevoir un code par SMS&nbsp;:
            <button
              type="button"
              class="hotspot"
              class:actif={indicesTrouves[4]}
              aria-pressed={indicesTrouves[4] ? 'true' : 'false'}
              onclick={() => activeLindice(4)}>{indices[4].passage}</button
            >
            pour valider.
          </p>
        </div>
      </div>

      <p class="mention fr-text--sm">
        <span class="mention-icone">
          <lab-anssi-icone nom="arrow-right-circle-line" taille="md"></lab-anssi-icone>
        </span>
        <span>
          <strong>Un SMS suspect&nbsp;?</strong> Transfère-le au <strong>33700</strong> gratuitement, puis supprime-le.
        </span>
      </p>
    </div>

    <div class="colonne-indices">
      <div class="indices-entete">
        <h3 class="sous-titre fr-h6">5 Indices à trouver</h3>

        <dsfr-toggle
          label="Afficher les indices"
          id="toggle-indices"
          left
          checked={toggleActif}
          onvaluechanged={monterLesIndices}
        ></dsfr-toggle>
      </div>

      <ol class="liste-indices">
        {#each indices as indice, i}
          <li class="indice" class:trouve={indicesTrouves[i]}>
            <span class="indice-numero fr-text--sm">{i + 1}</span>
            <div class="indice-contenu">
              <p class="indice-titre fr-text--sm"><strong>{indice.titre}</strong></p>
              <p class="indice-explication fr-text--xs">{indice.explication}</p>
            </div>
            <span class="indice-check" class:trouve={indicesTrouves[i]} aria-hidden="true">
              {#if indicesTrouves[i]}
                <lab-anssi-icone nom="success-fill" taille="md"></lab-anssi-icone>
              {:else}
                <lab-anssi-icone nom="success-line" taille="md"></lab-anssi-icone>
              {/if}
            </span>
          </li>
        {/each}
      </ol>
    </div>
  </div>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  .pieges {
    background-color: var(--background-alt-purple-glycine);
    padding: 2.5rem 2.5rem 1.5rem;
  }

  .conteneur {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @include a-partir-de(lg) {
      flex-direction: row;
      gap: 3rem;
      align-items: flex-start;

      & > * {
        flex: 1;
      }
    }
  }

  .titre {
    color: var(--text-title-blue-france);
  }

  .message {
    background-color: var(--background-default-grey);
    border: 1px solid var(--border-default-grey);
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-block-end: 1.5rem;
  }

  .entete {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-block-end: 0.75rem;
  }

  .avatar {
    flex-shrink: 0;
    background-color: var(--background-contrast-blue-france);
    border-radius: 50%;
    height: 3.5rem;
    width: 3.5rem;
  }

  .numero {
    background-color: transparent;
    border-width: 0;
    border-radius: 0.25rem;
    cursor: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    font-family: inherit;
    font-weight: 700;
  }

  .horodatage {
    color: var(--text-mention-grey);
    text-align: center;
    margin-block-end: 0.75rem;
  }

  .bulle {
    background-color: var(--background-alt-grey);
    border-radius: 0.5rem;
    padding: 1rem;
    max-width: 78%;

    p {
      margin-block-end: 1.5rem;

      &:last-child {
        margin-block-end: 0;
      }
    }
  }

  .mention {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-block: 0;

    &-icone {
      flex-shrink: 0;
      color: var(--blue-france-sun-113-625);
    }
  }

  .hotspot {
    all: unset;
    cursor: auto;
  }

  .colonne-indices {
    padding: 1rem;
  }

  .indices-entete {
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-block-end: 1.5rem;
  }

  .sous-titre {
    margin-block-end: 0;
  }

  .liste-indices {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .indice {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-block: 0.75rem;

    &:first-child {
      padding-block-start: 0;
    }

    &:last-child {
      padding-block-end: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-default-grey);
    }
  }

  .indice-numero {
    background-color: var(--artwork-minor-blue-france);
    border-radius: 50%;
    color: var(--text-inverted-grey);
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    font-weight: 700;
    height: 1.625rem;
    width: 1.625rem;
  }

  .indice-titre {
    color: var(--text-label-grey);
    margin-block-end: 0.25rem;
  }

  .indice-explication {
    color: var(--text-mention-grey);
    margin-block-end: 0;
  }

  .indice-check {
    flex-shrink: 0;
    color: var(--text-disabled-grey);

    &.trouve {
      color: var(--text-default-success);
    }
  }

  dsfr-link {
    color: inherit;
  }

  .actif {
    background-color: var(--artwork-minor-blue-france);
    border-radius: 0.25rem;
    color: var(--text-inverted-grey);
    padding: 0.125rem 0.5rem;
  }
</style>
