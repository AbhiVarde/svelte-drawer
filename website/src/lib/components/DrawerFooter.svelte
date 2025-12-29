<script lang="ts">
  const externalLinkIcon = `<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" aria-hidden="true" class="w-3 h-3 ml-1">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
    <path d="M15 3h6v6"></path>
    <path d="M10 14L21 3"></path>
  </svg>`;
</script>

<div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
  <div class="flex gap-6 justify-end max-w-md mx-auto">
    <a
      class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
      href="https://github.com/AbhiVarde/svelte-drawer"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub {@html externalLinkIcon}
    </a>
    <a
      class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
      href="https://x.com/varde_abhi"
      target="_blank"
      rel="noopener noreferrer"
    >
      X {@html externalLinkIcon}
    </a>
  </div>
</div>
