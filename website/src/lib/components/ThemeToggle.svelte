<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Sun, Moon } from "lucide-svelte";

  let dark = $state(true);

  onMount(() => {
    dark = document.documentElement.classList.contains("dark");
  });

  function apply(next: boolean) {
    dark = next;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  function toggle() {
    const next = !dark;
    if (!document.startViewTransition) return apply(next);
    document.startViewTransition(async () => {
      apply(next);
      await tick();
    });
  }
</script>

<button
  onclick={toggle}
  aria-label="Toggle theme"
  class="fixed top-4 right-4 z-40 flex h-9 w-9 items-center justify-center text-gray-900 focus:outline-none"
>
  {#if dark}
    <Sun class="h-5 w-5" />
  {:else}
    <Moon class="h-5 w-5" />
  {/if}
</button>
