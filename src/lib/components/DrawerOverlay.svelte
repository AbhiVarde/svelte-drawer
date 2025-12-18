<script>
	import { getContext } from 'svelte';
	
	let {
		class: className = '',
		...restProps
	} = $props();
	
	const drawer = getContext('drawer');
	
	/**
	 * @param {KeyboardEvent} e
	 */
	function handleKeydown(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			drawer.closeDrawer();
		}
	}
</script>

{#if drawer.open}
	<div
		class="fixed inset-0 bg-black/40 cursor-pointer {className}"
		style="opacity: {drawer.overlayOpacity.current}; z-index: 40;"
		onclick={drawer.closeDrawer}
		onkeydown={handleKeydown}
		role="button"
		tabindex="0"
		aria-label="Close drawer"
		{...restProps}
	></div>
{/if}