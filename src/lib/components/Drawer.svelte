<script lang="ts">
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { setContext, onMount } from "svelte";

  let {
    open = $bindable(false),
    onOpenChange = undefined,
    direction = "bottom",
    closeOnEscape = true,
    children,
  } = $props();

  let overlayOpacity = new Tween(0, { duration: 300, easing: cubicOut });
  let drawerPosition = new Tween(100, { duration: 300, easing: cubicOut });
  let previouslyFocusedElement: HTMLElement | null = null;

  $effect(() => {
    if (open) {
      previouslyFocusedElement = document.activeElement as HTMLElement;

      document.body.style.overflow = "hidden";

      overlayOpacity.set(1);
      drawerPosition.set(0);
    } else {
      overlayOpacity.set(0);
      drawerPosition.set(100);

      document.body.style.overflow = "";

      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
      }
    }
  });

  function closeDrawer() {
    open = false;
    if (onOpenChange) onOpenChange(false);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (open && closeOnEscape && e.key === "Escape") {
      e.preventDefault();
      closeDrawer();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  });

  setContext("drawer", {
    get open() {
      return open;
    },
    get overlayOpacity() {
      return overlayOpacity;
    },
    get drawerPosition() {
      return drawerPosition;
    },
    get direction() {
      return direction;
    },
    closeDrawer,
  });
</script>

{@render children()}
