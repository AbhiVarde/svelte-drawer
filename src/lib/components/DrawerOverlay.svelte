<script lang="ts">
  import { getContext } from "svelte";
  import type { DrawerOverlayProps } from "$lib/types";

  let {
    class: className = "",
    blur = false,
    ...restProps
  }: DrawerOverlayProps = $props();

  const drawer = getContext<any>("drawer");

  const blurClass = $derived(() => {
    if (!blur) return "";
    if (blur === true) return "backdrop-blur-md";

    const blurMap: Record<string, string> = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
      "2xl": "backdrop-blur-2xl",
      "3xl": "backdrop-blur-3xl",
    };

    return blurMap[blur as string] || "backdrop-blur-md";
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      drawer.closeDrawer();
    }
  }
</script>

{#if drawer.open}
  <div
    class="fixed inset-0 bg-black/40 cursor-pointer {blurClass()} {className}"
    style="opacity: {drawer.overlayOpacity.current}; z-index: 40;"
    onclick={drawer.closeDrawer}
    onkeydown={handleKeydown}
    role="button"
    tabindex="0"
    aria-label="Close drawer"
    {...restProps}
  ></div>
{/if}
