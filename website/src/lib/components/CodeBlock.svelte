<script lang="ts">
  import { Check, Copy } from "lucide-svelte";

  interface Props {
    code: string;
    copyKey: string;
    copyStatus: Record<string, "idle" | "success">;
    onCopy: (text: string, key: string) => void;
  }

  let { code, copyKey, copyStatus, onCopy }: Props = $props();
</script>

<div class="bg-white rounded-md border border-gray-200 p-4 relative">
  <pre class="text-sm overflow-x-auto"><code>{code}</code></pre>
  <button
  onclick={() => onCopy(code, copyKey)}
  aria-label="Copy code"
  class="absolute top-3 right-3 flex h-8 w-8 items-center justify-center
       rounded-md border border-gray-200 bg-white
       text-gray-500 shadow-sm
       transition-colors
       hover:bg-gray-50 hover:text-gray-900"
>
  {#if copyStatus[copyKey] === "success"}
    <Check class="h-4 w-4 text-green-600" />
  {:else}
    <Copy class="h-4 w-4" />
  {/if}
</button>
</div>
