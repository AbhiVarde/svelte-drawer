<script>
	import { getContext } from 'svelte';
	
	let {
		class: className = '',
		children,
		...restProps
	} = $props();
	
	const drawer = getContext('drawer');
	
	function getTransform() {
		const pos = drawer.drawerPosition.current;
		switch (drawer.direction) {
			case 'bottom':
				return `translateY(${pos}%)`;
			case 'top':
				return `translateY(-${pos}%)`;
			case 'left':
				return `translateX(-${pos}%)`;
			case 'right':
				return `translateX(${pos}%)`;
			default:
				return `translateY(${pos}%)`;
		}
	}
</script>

{#if drawer.open}
	<div
		class={className}
		style="transform: {getTransform()}; z-index: 50;"
		{...restProps}
	>
		{@render children()}
	</div>
{/if}