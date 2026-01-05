<script>
  import { getContext } from "svelte";

  let { class: className = "", blur = false, ...restProps } = $props();

  const drawer = getContext("drawer");

  const blurClass = $derived(() => {
    if (!blur) return "";

    if (blur === true) return "backdrop-blur-md";

    const blurMap = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
      "2xl": "backdrop-blur-2xl",
      "3xl": "backdrop-blur-3xl",
    };

    return blurMap[blur] || "backdrop-blur-md";
  });

  /**
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
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
