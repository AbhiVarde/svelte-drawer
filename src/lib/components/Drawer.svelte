<script>
	import { Spring } from 'svelte/motion';
	import { setContext } from 'svelte';
	
	let {
		open = $bindable(false),
		onOpenChange = undefined,
		direction = 'bottom',
		children
	} = $props();
	
	let overlayOpacity = new Spring(0, { stiffness: 0.32, damping: 0.72 });
	let drawerPosition = new Spring(100, { stiffness: 0.32, damping: 0.72 });
	
	$effect(() => {
		if (open) {
			overlayOpacity.target = 1;
			drawerPosition.target = 0;
		} else {
			overlayOpacity.target = 0;
			drawerPosition.target = 100;
		}
	});
	
	function closeDrawer() {
		open = false;
		if (onOpenChange) {
			onOpenChange(false);
		}
	}
	
	// Provide context to child components
	setContext('drawer', {
		get open() { return open; },
		get overlayOpacity() { return overlayOpacity; },
		get drawerPosition() { return drawerPosition; },
		get direction() { return direction; },
		closeDrawer
	});
</script>

{@render children()}