<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

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
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const gray = Object.fromEntries(steps.map((s) => [s, `var(--gray-${s})`]));

    tailwind.config = {
      theme: {
        extend: {
          colors: {
            white: "var(--white)",
            gray,
            zinc: gray,
            blue: {
              50: "var(--blue-50)",
              200: "var(--blue-200)",
              900: "var(--blue-900)",
            },
          },
          fontFamily: {
            sans: ["Plus Jakarta Sans", "sans-serif"],
            mono: ["Fira Code", "monospace"],
          },
        },
      },
    };
  </script>
</svelte:head>

<ThemeToggle />
{@render children()}

<style lang="postcss">
  :global(:root) {
    --page: #fafafa;
    --fg: #000;
    --white: #fff;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    --blue-50: #eff6ff;
    --blue-200: #bfdbfe;
    --blue-900: #1e3a8a;
  }

  :global(:root.dark) {
    color-scheme: dark;
    --page: #000;
    --fg: #fafafa;
    --white: #0a0a0a;
    --gray-50: #111111;
    --gray-100: #171717;
    --gray-200: #262626;
    --gray-300: #404040;
    --gray-400: #737373;
    --gray-500: #a3a3a3;
    --gray-600: #d4d4d4;
    --gray-700: #e5e5e5;
    --gray-800: #f5f5f5;
    --gray-900: #fafafa;
    --blue-50: #171717;
    --blue-200: #262626;
    --blue-900: #fafafa;
  }

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
    background: var(--page);
    color: var(--fg);
  }

  :global(.shiki),
  :global(.shiki span) {
    color: var(--shiki-light);
  }

  :global(.dark .shiki),
  :global(.dark .shiki span) {
    color: var(--shiki-dark);
  }
</style>
