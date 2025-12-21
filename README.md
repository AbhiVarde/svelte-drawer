# Svelte Drawer

[![npm version](https://img.shields.io/npm/v/@abhivarde/svelte-drawer)](https://www.npmjs.com/package/@abhivarde/svelte-drawer)
![GitHub Repo Views](https://gitviews.com/repo/AbhiVarde/svelte-drawer.svg)

A drawer component for Svelte 5, inspired by [Vaul](https://github.com/emilkowalski/vaul).

## Features

- ✅ Smooth animations and **gesture-driven dragging** (mouse & touch)
- ✅ Mobile-optimized drag handling with **scroll prevention**
- ✅ Multiple directions (bottom, top, left, right)
- ✅ Prebuilt variants (default, sheet, dialog, minimal, sidebar)
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

### Using Variants

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerVariants } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<!-- Sheet variant (iOS-style bottom sheet) -->
<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerVariants variant="sheet">
		<div class="p-6">
			<h2>iOS-style Sheet</h2>
			<p>Clean and modern bottom sheet design</p>
		</div>
	</DrawerVariants>
</Drawer>

<!-- Dialog variant (center modal) -->
<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerVariants variant="dialog">
		<div class="p-6">
			<h2>Dialog Style</h2>
			<p>Center-positioned modal dialog</p>
		</div>
	</DrawerVariants>
</Drawer>

<!-- Sidebar variant (navigation drawer) -->
<Drawer bind:open direction="right">
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerVariants variant="sidebar">
		<div class="p-6">
			<h2>Sidebar Navigation</h2>
			<p>Side navigation drawer</p>
		</div>
	</DrawerVariants>
</Drawer>
```

## Variants

Available variants for `DrawerVariants` component:

- `default` - Standard bottom drawer with gray background
- `sheet` - iOS-style bottom sheet (white, rounded, 85vh height)
- `dialog` - Center modal dialog style
- `minimal` - Simple bottom drawer without extra styling
- `sidebar` - Side navigation drawer (full height)

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

### DrawerVariants

Pre-styled drawer content with built-in variants.

**Props:**

- `variant` ('default' | 'sheet' | 'dialog' | 'minimal' | 'sidebar', default: 'default') - Preset style variant
- `class` (string, optional) - Additional CSS classes for styling
- `trapFocus` (boolean, optional, default: true) - Whether to trap focus inside drawer

## Demo

Visit [drawer.abhivarde.in](https://drawer.abhivarde.in) to see live examples.

## License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.

## Credits

Inspired by [Vaul](https://github.com/emilkowalski/vaul) by Emil Kowalski.
