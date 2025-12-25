<script lang="ts">
  import { getContext } from "svelte";

  type DrawerContext = {
    direction: "bottom" | "top" | "left" | "right";
  };

  let { class: className = "", ...restProps } = $props();

  const drawer = getContext<DrawerContext>("drawer");

  const isVertical = $derived(
    drawer.direction === "bottom" || drawer.direction === "top"
  );

  const defaultClasses = $derived(
    isVertical
      ? "mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300"
      : "my-auto w-1.5 h-12 flex-shrink-0 rounded-full bg-gray-300"
  );

  const combinedClass = $derived(
    className ? `${defaultClasses} ${className}` : defaultClasses
  );
</script>

<div
  data-drawer-drag
  class={combinedClass}
  aria-hidden="true"
  role="presentation"
  {...restProps}
></div>
