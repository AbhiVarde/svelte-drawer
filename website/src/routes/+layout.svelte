<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap"
    rel="stylesheet"
  />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Plus Jakarta Sans", "sans-serif"],
            mono: ["Fira Code", "monospace"],
          },
        },
      },
    };
  </script>
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
    font-family: "Plus Jakarta Sans", sans-serif;
  }
</style>
