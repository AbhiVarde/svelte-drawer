<script lang="ts">
  import { getContext } from "svelte";

  // Minimal inline type just to fix TypeScript
  type DrawerContext = {
    open: boolean;
    overlayOpacity: { current: number; set: (v: number) => void };
    drawerPosition: { current: number; set: (v: number) => void };
    direction: "bottom" | "top" | "left" | "right";
    closeDrawer: () => void;
  };

  let { class: className = "", children, ...restProps } = $props();

  // Tell TypeScript that context has this shape
  const drawer = getContext<DrawerContext>("drawer");

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
      default:
        return `translateY(${pos}%)`;
    }
  }

  function onPointerDown(e: PointerEvent | TouchEvent) {
    dragging = true;
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
    if (drawer.drawerPosition.current > 30) drawer.closeDrawer();
    else drawer.drawerPosition.set(0);

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }
</script>

{#if drawer.open}
  <div
    class={className}
    style="transform: {getTransform()}; z-index: 50;"
    onpointerdown={onPointerDown}
    {...restProps}
  >
    {@render children()}
  </div>
{/if}
