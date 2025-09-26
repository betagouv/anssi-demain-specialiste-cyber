<script lang="ts">
  import type { NoteEvaluation } from '../jeu';

  export let note: NoteEvaluation | undefined;
  export let nom: string;
</script>

<div class="evaluation">
  <div class="notes-evaluation">
    <input
      id="{nom}-pas-du-tout"
      type="radio"
      name={nom}
      value={1}
      bind:group={note}
    />
    <label for="{nom}-pas-du-tout" class="premier-libelle">
      <span aria-label="Pas du tout" role="img">😠</span>
    </label>
    <input
      id="{nom}-tres-peu"
      type="radio"
      name={nom}
      value={2}
      bind:group={note}
    />
    <label for="{nom}-tres-peu">
      <span aria-label="Très peu" role="img">☹️</span>
    </label>
    <input
      id="{nom}-moyennement"
      type="radio"
      name={nom}
      value={3}
      bind:group={note}
    />
    <label for="{nom}-moyennement">
      <span aria-label="Moyennement" role="img">😕</span>
    </label>
    <input
      id="{nom}-plutot"
      type="radio"
      name={nom}
      value={4}
      bind:group={note}
    />
    <label for="{nom}-plutot">
      <span aria-label="Plutôt" role="img">😊</span>
    </label>
    <input
      id="{nom}-tout-a-fait"
      type="radio"
      name={nom}
      value={5}
      bind:group={note}
    />
    <label for="{nom}-tout-a-fait" class="dernier-libelle">
      <span aria-label="Tout à fait" role="img">🤩</span>
    </label>
  </div>
  <div class="descriptions">
    <span class="premier">Pas du tout</span>
    <span class="dernier">Tout à fait</span>
  </div>
</div>

<style lang="scss">
  .evaluation {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .notes-evaluation {
      display: flex;
      flex-direction: row;

      input[type='radio'] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;

        + label > span {
          cursor: pointer;

          &:hover {
            background-color: rgba(0, 0, 0, 0.04);
          }

          &:active {
            background-color: rgba(0, 0, 0, 0.08);
          }
        }

        &:focus-visible + label {
          outline: 2px solid #0a76f6;
          outline-offset: 2px;
        }

        &:checked + label > span {
          background-color: #000091;
          &:hover {
            background-color: #1212ff;
          }
          &:active {
            background-color: #2323ff;
          }
        }
      }

      label {
        display: flex;
        flex: 1;
        border: 1px solid #ddd;
        border-right: 0;
        border-radius: 0;

        &.premier-libelle {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        &.dernier-libelle {
          border-right: 1px solid #ddd;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        span {
          flex: 1;
          font-size: 1.25rem;
          line-height: 1.5rem;
          margin: 0;
          padding: 8px 16px;
          text-align: center;
        }
      }
    }

    .descriptions {
      color: #666666;
      display: flex;
      flex-direction: row;
      font-size: 0.875rem;
      font-style: normal;
      justify-content: space-between;
      line-height: 1.5rem;
    }
  }
</style>
