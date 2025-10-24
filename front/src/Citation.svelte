<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="rejoindre-communaute">
  <span>
    {@render children?.()}
  </span>
</div>

<style lang="scss">
  @use './points-de-rupture' as *;

  .rejoindre-communaute {
    font-weight: bold;
    color: var(--grey-200-850);
    display: flex;
    flex-direction: column;
    gap: 0.5rem 1rem;

    &:before {
      content: url('/icons/system/question-answer-line.svg');
      width: 24px;
      height: 24px;
    }

    @include a-partir-de(md) {
      flex-flow: row nowrap;
    }
  }
</style>
