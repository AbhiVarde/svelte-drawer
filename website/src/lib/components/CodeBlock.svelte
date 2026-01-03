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
    class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
  >
    {#if copyStatus[copyKey] === "success"}
      <Check class="w-4 h-4 text-green-600" />
    {:else}
      <Copy class="w-4 h-4 text-gray-500" />
    {/if}
  </button>
</div>
