<script lang="ts">
  import { getContext, onMount, tick } from "svelte";

  type DrawerContext = {
    open: boolean;
    visible: boolean;
    overlayOpacity: { current: number; set: (v: number, opts?: any) => void };
    drawerPosition: { current: number; set: (v: number, opts?: any) => void };
    direction: "bottom" | "top" | "left" | "right";
    closeDrawer: () => void;
    snapPoints?: number[];
    activeSnapPoint?: number;
    setActiveSnapPoint?: (point: number) => void;
  };

  let {
    class: className = "",
    trapFocus = true,
    children,
    ...restProps
  } = $props();

  const drawer = getContext<DrawerContext>("drawer");

  let contentElement = $state<HTMLDivElement | null>(null);
  let startPos = 0;
  let startDragPos = 0;
  let dragging = false;

  function snapPointToPosition(snapPoint: number): number {
    // snapPoint is 0-1 where 1 = fully open (0% position)
    // Convert: 1 -> 0%, 0.5 -> 50%, 0 -> 100%
    return (1 - snapPoint) * 100;
  }

  function findNearestSnapPoint(currentPos: number): number {
    if (!drawer.snapPoints || drawer.snapPoints.length === 0) {
      return currentPos;
    }

    const currentSnapValue = 1 - currentPos / 100;
    let nearest = drawer.snapPoints[0];
    let minDiff = Math.abs(currentSnapValue - nearest);

    for (const snapPoint of drawer.snapPoints) {
      const diff = Math.abs(currentSnapValue - snapPoint);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = snapPoint;
      }
    }

    return nearest;
  }

  function getTransform(): string {
    const pos = drawer.drawerPosition.current;

    if (
      drawer.snapPoints &&
      drawer.activeSnapPoint !== undefined &&
      !dragging
    ) {
      const snapPos = snapPointToPosition(drawer.activeSnapPoint);
      switch (drawer.direction) {
        case "bottom":
          return `translateY(${snapPos}%)`;
        case "top":
          return `translateY(-${snapPos}%)`;
        case "left":
          return `translateX(-${snapPos}%)`;
        case "right":
          return `translateX(${snapPos}%)`;
      }
    }

    switch (drawer.direction) {
      case "bottom":
        return `translateY(${pos}%)`;
      case "top":
        return `translateY(-${pos}%)`;
      case "left":
        return `translateX(-${pos}%)`;
      case "right":
        return `translateX(${pos}%)`;
    }
  }

  function onPointerDown(e: PointerEvent | TouchEvent) {
    const target = e.target as HTMLElement;

    if (
      target.closest("button, a, input, textarea, select") &&
      !target.closest("[data-drawer-drag]")
    ) {
      return;
    }

    dragging = true;

    startPos =
      drawer.direction === "bottom" || drawer.direction === "top"
        ? "clientY" in e
          ? e.clientY
          : (e.touches[0]?.clientY ?? 0)
        : "clientX" in e
          ? e.clientX
          : (e.touches[0]?.clientX ?? 0);

    startDragPos = drawer.drawerPosition.current;

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);

    e.preventDefault();
  }

  function onPointerMove(e: PointerEvent | TouchEvent) {
    if (!dragging) return;

    e.preventDefault();

    const current =
      drawer.direction === "bottom" || drawer.direction === "top"
        ? "clientY" in e
          ? e.clientY
          : (e.touches[0]?.clientY ?? 0)
        : "clientX" in e
          ? e.clientX
          : (e.touches[0]?.clientX ?? 0);

    const delta = current - startPos;
    let newPos = startDragPos;

    if (drawer.direction === "bottom") {
      newPos = Math.max(0, startDragPos + (delta / window.innerHeight) * 100);
    } else if (drawer.direction === "top") {
      newPos = Math.max(0, startDragPos + (-delta / window.innerHeight) * 100);
    } else if (drawer.direction === "left") {
      newPos = Math.max(0, startDragPos + (-delta / window.innerWidth) * 100);
    } else if (drawer.direction === "right") {
      newPos = Math.max(0, startDragPos + (delta / window.innerWidth) * 100);
    }

    drawer.drawerPosition.set(newPos, { duration: 0 });
  }

  function onPointerUp() {
    if (!dragging) return;

    dragging = false;

    const pos = drawer.drawerPosition.current;

    if (drawer.snapPoints && drawer.snapPoints.length > 0) {
      const nearestSnapPoint = findNearestSnapPoint(pos);
      const snapPos = snapPointToPosition(nearestSnapPoint);

      const lowestSnapPoint = Math.min(...drawer.snapPoints);
      const lowestSnapPos = snapPointToPosition(lowestSnapPoint);

      if (pos > lowestSnapPos + 30) {
        drawer.closeDrawer();
      } else {
        drawer.drawerPosition.set(snapPos);
        drawer.setActiveSnapPoint?.(nearestSnapPoint);
      }
    } else {
      if (pos > 30) {
        drawer.closeDrawer();
      } else {
        drawer.drawerPosition.set(0);
      }
    }

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("touchmove", onPointerMove);
    window.removeEventListener("touchend", onPointerUp);
  }

  function getFocusableElements(): HTMLElement[] {
    if (!contentElement) return [];
    return Array.from(
      contentElement.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  }

  function handleFocusTrap(e: KeyboardEvent) {
    if (!trapFocus || !drawer.open || e.key !== "Tab") return;

    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  $effect(() => {
    if (drawer.open && trapFocus && contentElement) {
      tick().then(() => {
        const focusable = getFocusableElements();
        if (focusable[0]) {
          focusable[0].focus({ preventScroll: true });
        } else {
          contentElement?.focus({ preventScroll: true });
        }
      });
    }
  });

  onMount(() => {
    window.addEventListener("keydown", handleFocusTrap);
    return () => {
      window.removeEventListener("keydown", handleFocusTrap);
    };
  });
</script>

{#if drawer.open || drawer.visible}
  <div
    bind:this={contentElement}
    class={className}
    style="transform: {getTransform()}; z-index: 50; touch-action: none;"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    onpointerdown={onPointerDown}
    ontouchstart={onPointerDown}
    {...restProps}
  >
    {@render children()}
  </div>
{/if}
