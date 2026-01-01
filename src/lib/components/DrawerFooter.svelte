<script lang="ts">
  let {
    class: className = "",
    children,
    actions,
    ...restProps
  }: {
    class?: string;
    children?: any;
    actions?: any;
    [key: string]: any;
  } = $props();
</script>

<div class="p-4 border-t border-gray-200 mt-auto {className}" {...restProps}>
  {#if children}
    {@render children()}
  {:else if actions}
    <div class="flex gap-3 justify-end">
      {@render actions()}
    </div>
  {/if}
</div>
