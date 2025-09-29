<script lang="ts">
  import type { NoteEvaluation } from '../jeu';

  export let note: NoteEvaluation | undefined;
  export let nom: string;
  export let borneMinimale: string = 'Pas du tout';
  export let borneMaximale: string = 'Tout à fait';
</script>

<div class="evaluation">
  <div class="notes-evaluation">
    <input id="{nom}-1" type="radio" name={nom} value={1} bind:group={note} />
    <label for="{nom}-1" class="premier-libelle">
      <span aria-label="1" role="img">😠</span>
    </label>
    <input id="{nom}-2" type="radio" name={nom} value={2} bind:group={note} />
    <label for="{nom}-2">
      <span aria-label="2" role="img">☹️</span>
    </label>
    <input id="{nom}-3" type="radio" name={nom} value={3} bind:group={note} />
    <label for="{nom}-3">
      <span aria-label="3" role="img">😕</span>
    </label>
    <input id="{nom}-4" type="radio" name={nom} value={4} bind:group={note} />
    <label for="{nom}-4">
      <span aria-label="4" role="img">😊</span>
    </label>
    <input id="{nom}-5" type="radio" name={nom} value={5} bind:group={note} />
    <label for="{nom}-5" class="dernier-libelle">
      <span aria-label="5" role="img">🤩</span>
    </label>
  </div>
  <div class="descriptions">
    <span class="premier">{borneMinimale}</span>
    <span class="dernier">{borneMaximale}</span>
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
