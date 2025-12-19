# Svelte Drawer

A drawer component for Svelte 5, inspired by [Vaul](https://github.com/emilkowalski/vaul).

## Features

- ✅ Smooth animations using Svelte 5's Spring motion
- ✅ Multiple directions (bottom, top, left, right)
- ✅ Nested drawers support
- ✅ Scrollable content
- ✅ Keyboard shortcuts (Escape to close, Tab navigation)
- ✅ Focus management (auto-focus, focus trap, focus restoration)
- ✅ Fully accessible with keyboard navigation
- ✅ TypeScript support
- ✅ Customizable styling with Tailwind CSS

## Installation

```bash
npm install @abhivarde/svelte-drawer
```

## Usage

### Basic Example

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<button onclick={() => open = true}>
	Open Drawer
</button>

<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<h2>Drawer Content</h2>
		<p>This is a drawer component.</p>
		<button onclick={() => open = false}>Close</button>
	</DrawerContent>
</Drawer>
```

### Side Drawer

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<Drawer bind:open direction="right">
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed right-0 top-0 bottom-0 w-80 bg-white p-4">
		<h2>Side Drawer</h2>
		<button onclick={() => open = false}>Close</button>
	</DrawerContent>
</Drawer>
```

### Controlled Drawer

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent } from '@abhivarde/svelte-drawer';

	let open = $state(false);

	function handleOpenChange(isOpen) {
		console.log('Drawer is now:', isOpen ? 'open' : 'closed');
		open = isOpen;
	}
</script>

<Drawer bind:open onOpenChange={handleOpenChange}>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<h2>Controlled Drawer</h2>
	</DrawerContent>
</Drawer>
```

### Disable Keyboard Features

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<!-- Disable Escape key -->
<Drawer bind:open closeOnEscape={false}>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<h2>Cannot close with Escape</h2>
	</DrawerContent>
</Drawer>

<!-- Disable focus trap -->
<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent trapFocus={false} class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<h2>Tab navigation not restricted</h2>
	</DrawerContent>
</Drawer>
```

## Keyboard Shortcuts

- **Escape** - Close the drawer (can be disabled with `closeOnEscape={false}`)
- **Tab / Shift+Tab** - Navigate between focusable elements inside the drawer
- **Enter / Space** (on overlay) - Close the drawer

## API Reference

### Drawer

Main wrapper component that manages drawer state and animations.

**Props:**

- `open` (boolean, bindable) - Controls the open/closed state
- `onOpenChange` (function, optional) - Callback when open state changes
- `direction` ('bottom' | 'top' | 'left' | 'right', default: 'bottom') - Direction from which drawer slides
- `closeOnEscape` (boolean, optional, default: true) - Whether Escape key closes the drawer

### DrawerOverlay

Overlay component that appears behind the drawer.

**Props:**

- `class` (string, optional) - CSS classes for styling

### DrawerContent

Content container for the drawer.

**Props:**

- `class` (string, optional) - CSS classes for styling
- `trapFocus` (boolean, optional, default: true) - Whether to trap focus inside drawer

## Demo

Visit [drawer.abhivarde.in](https://drawer.abhivarde.in) to see live examples.

## License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.

## Credits

Inspired by [Vaul](https://github.com/emilkowalski/vaul) by Emil Kowalski.
