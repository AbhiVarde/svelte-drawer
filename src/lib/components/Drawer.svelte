<script lang="ts">
  import { Tween } from "svelte/motion";
  import { expoOut } from "svelte/easing";
  import { setContext, onMount } from "svelte";

  let {
    open = $bindable(false),
    onOpenChange = undefined,
    direction = "bottom",
    closeOnEscape = true,
    snapPoints = undefined,
    activeSnapPoint = $bindable(undefined),
    onSnapPointChange = undefined,
    children,
  } = $props();

  let overlayOpacity = new Tween(0, {
    duration: 150,
    easing: expoOut,
  });

  let drawerPosition = new Tween(100, {
    duration: 220,
    easing: expoOut,
  });

  let previouslyFocusedElement: HTMLElement | null = null;

  let visible = false;

  $effect(() => {
    if (open) {
      visible = true;
      previouslyFocusedElement = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      overlayOpacity.set(1);

      if (snapPoints && snapPoints.length > 0) {
        if (activeSnapPoint === undefined) {
          activeSnapPoint = snapPoints[snapPoints.length - 1];
        }
        const snapPos = (1 - activeSnapPoint) * 100;
        drawerPosition.set(snapPos);
      } else {
        drawerPosition.set(0);
      }
    } else if (visible) {
      if (
        snapPoints &&
        snapPoints.length > 0 &&
        activeSnapPoint !== undefined
      ) {
        const currentSnapPos = (1 - activeSnapPoint) * 100;
        drawerPosition.set(currentSnapPos, { duration: 0 });
      }

      overlayOpacity.set(0, { duration: 120 });
      drawerPosition.set(100, { duration: 180 });

      document.body.style.overflow = "";

      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
      }

      setTimeout(() => {
        visible = false;
      }, 180);
    }
  });

  function closeDrawer() {
    open = false;
    onOpenChange?.(false);
    if (snapPoints && snapPoints.length > 0) {
      activeSnapPoint = undefined;
    }
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
    get visible() {
      return visible;
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
    get snapPoints() {
      return snapPoints;
    },
    get activeSnapPoint() {
      return activeSnapPoint;
    },
    setActiveSnapPoint(point: number) {
      activeSnapPoint = point;
      onSnapPointChange?.(point);
    },
    closeDrawer,
  });
</script>

{@render children()}
