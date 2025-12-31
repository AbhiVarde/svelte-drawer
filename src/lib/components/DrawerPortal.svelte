<script lang="ts">
  import { onMount } from "svelte";

  let {
    children,
    container = undefined,
  }: {
    children?: any;
    container?: HTMLElement | string;
  } = $props();

  let portalContainer = $state<HTMLElement | null>(null);
  let mounted = $state(false);

  onMount(() => {
    if (container) {
      if (typeof container === "string") {
        portalContainer = document.querySelector(container);
      } else {
        portalContainer = container;
      }
    } else {
      portalContainer = document.createElement("div");
      portalContainer.setAttribute("data-drawer-portal", "");
      document.body.appendChild(portalContainer);
    }

    mounted = true;

    return () => {
      if (
        !container &&
        portalContainer &&
        document.body.contains(portalContainer)
      ) {
        document.body.removeChild(portalContainer);
      }
    };
  });
</script>

{#if mounted && portalContainer}
  {#each [children] as child}
    {@render child?.()}
  {/each}
{/if}

<style>
  :global([data-drawer-portal]) {
    position: relative;
    z-index: 9999;
  }
</style>
