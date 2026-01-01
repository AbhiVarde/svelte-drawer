<script lang="ts">
  let {
    title,
    description,
    showCloseButton = true,
    onClose,
    class: className = "",
    children,
    ...restProps
  }: {
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    onClose?: () => void;
    class?: string;
    children?: any;
    [key: string]: any;
  } = $props();

  import { getContext } from "svelte";

  const drawer = getContext<any>("drawer");

  function handleClose() {
    if (onClose) {
      onClose();
    } else {
      drawer?.closeDrawer();
    }
  }
</script>

<div
  class="flex items-center justify-between p-4 border-b border-gray-200 {className}"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <div class="flex-1">
      {#if title}
        <h2 class="text-lg font-semibold text-gray-900">{title}</h2>
      {/if}
      {#if description}
        <p class="text-sm text-gray-600 mt-1">{description}</p>
      {/if}
    </div>

    {#if showCloseButton}
      <button
        onclick={handleClose}
        class="p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Close drawer"
      >
        <svg
          class="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    {/if}
  {/if}
</div>
