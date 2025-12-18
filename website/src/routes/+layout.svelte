<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

{@render children()}

<style lang="postcss">
  :global(*) {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  :global(*::-webkit-scrollbar) {
    display: none;
  }

  :global(html, body) {
    overflow: overlay;
  }
</style>
