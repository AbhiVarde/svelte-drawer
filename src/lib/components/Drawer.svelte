<script lang="ts">
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { setContext } from "svelte";

  let {
    open = $bindable(false),
    onOpenChange = undefined,
    direction = "bottom",
    children,
  } = $props();

  let overlayOpacity = new Tween(0, { duration: 300, easing: cubicOut });
  let drawerPosition = new Tween(100, { duration: 300, easing: cubicOut });

  $effect(() => {
    if (open) {
      overlayOpacity.set(1);
      drawerPosition.set(0);
    } else {
      overlayOpacity.set(0);
      drawerPosition.set(100);
    }
  });

  function closeDrawer() {
    open = false;
    if (onOpenChange) onOpenChange(false);
  }

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
