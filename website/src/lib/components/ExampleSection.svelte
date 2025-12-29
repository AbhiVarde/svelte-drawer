<script lang="ts">
  import CodeBlock from "./CodeBlock.svelte";

  interface Props {
    title: string;
    onOpen: () => void;
    code?: string;
    copyKey?: string;
    copyStatus: Record<string, "idle" | "success">;
    onCopy: (text: string, key: string) => void;
  }

  let { title, onOpen, code, copyKey, copyStatus, onCopy }: Props = $props();
</script>

<div>
  <h3 class="text-lg font-medium mb-3">{title}</h3>
  <button
    onclick={onOpen}
    class="px-5 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition text-sm mb-4"
  >
    Open {title}
  </button>

  {#if code && copyKey}
    <CodeBlock {code} {copyKey} {copyStatus} {onCopy} />
  {/if}
</div>
