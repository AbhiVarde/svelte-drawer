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

<div class="border-t border-gray-200 p-4 mt-auto {className}" {...restProps}>
  {#if children}
    {@render children()}
  {:else if actions}
    <div class="flex justify-end gap-3">
      {@render actions()}
    </div>
  {/if}
</div>
