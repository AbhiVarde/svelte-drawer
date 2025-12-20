<script lang="ts">
  import { getContext, onMount, tick } from "svelte";

  type DrawerContext = {
    open: boolean;
    visible: boolean;
    overlayOpacity: { current: number; set: (v: number, opts?: any) => void };
    drawerPosition: { current: number; set: (v: number, opts?: any) => void };
    direction: "bottom" | "top" | "left" | "right";
    closeDrawer: () => void;
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
  let dragging = false;

  function getTransform(): string {
    const pos = drawer.drawerPosition.current;
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
    dragging = true;
    document.body.style.cursor = "grabbing";

    startPos =
      drawer.direction === "bottom" || drawer.direction === "top"
        ? "clientY" in e
          ? e.clientY
          : (e.touches[0]?.clientY ?? 0)
        : "clientX" in e
          ? e.clientX
          : (e.touches[0]?.clientX ?? 0);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(e: PointerEvent | TouchEvent) {
    if (!dragging) return;

    const current =
      drawer.direction === "bottom" || drawer.direction === "top"
        ? "clientY" in e
          ? e.clientY
          : (e.touches[0]?.clientY ?? 0)
        : "clientX" in e
          ? e.clientX
          : (e.touches[0]?.clientX ?? 0);

    const delta = current - startPos;

    if (drawer.direction === "bottom")
      drawer.drawerPosition.set(
        Math.max(0, (delta / window.innerHeight) * 100)
      );
    else if (drawer.direction === "top")
      drawer.drawerPosition.set(
        Math.max(0, (-delta / window.innerHeight) * 100)
      );
    else if (drawer.direction === "left")
      drawer.drawerPosition.set(
        Math.max(0, (-delta / window.innerWidth) * 100)
      );
    else if (drawer.direction === "right")
      drawer.drawerPosition.set(Math.max(0, (delta / window.innerWidth) * 100));
  }

  function onPointerUp() {
    dragging = false;
    document.body.style.cursor = "default";

    const pos = drawer.drawerPosition.current;

    if (pos > 30) {
      drawer.closeDrawer();
    } else {
      drawer.drawerPosition.set(0);
    }

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
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
    style="transform: {getTransform()}; z-index: 50; cursor: grab;"
    onpointerdown={onPointerDown}
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    {...restProps}
  >
    {@render children()}
  </div>
{/if}