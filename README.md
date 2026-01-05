# Svelte Drawer

[![npm version](https://img.shields.io/npm/v/@abhivarde/svelte-drawer)](https://www.npmjs.com/package/@abhivarde/svelte-drawer)
![GitHub Repo Views](https://gitviews.com/repo/AbhiVarde/svelte-drawer.svg)

A drawer component for Svelte 5, inspired by [Vaul](https://github.com/emilkowalski/vaul).

## Features

- ✅ Smooth animations with **gesture-driven dragging** (mouse & touch)
- ✅ Mobile-optimized drag handling with **scroll prevention**
- ✅ Support for multiple directions (**bottom, top, left, right**)
- ✅ Prebuilt variants (**default, sheet, dialog, minimal, sidebar**)
- ✅ **Drag handle component** with auto-adaptive orientation
- ✅ **Snap points** for iOS-like multi-height drawers
- ✅ **Portal rendering** to escape z-index conflicts
- ✅ **Optional header & footer** components for quick setup
- ✅ Nested drawer support
- ✅ Scrollable content areas
- ✅ Keyboard shortcuts (**Escape to close**, Tab navigation)
- ✅ Focus management (**auto-focus, focus trap, focus restoration**)
- ✅ Fully accessible with keyboard navigation
- ✅ Full **TypeScript** support
- ✅ Customizable styling with **Tailwind CSS**

## Installation

```bash
npm install @abhivarde/svelte-drawer
```

## Usage

### Basic Example

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent, DrawerHandle } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<button onclick={() => open = true}>
	Open Drawer
</button>

<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<DrawerHandle class="mb-8" />
		<h2>Drawer Content</h2>
		<p>This is a drawer component.</p>
		<button onclick={() => open = false}>Close</button>
	</DrawerContent>
</Drawer>
```

### Side Drawer

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent, DrawerHandle } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<Drawer bind:open direction="right">
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed right-0 top-0 bottom-0 w-80 bg-white p-4">
		<DrawerHandle class="mb-4" />
		<h2>Side Drawer</h2>
		<button onclick={() => open = false}>Close</button>
	</DrawerContent>
</Drawer>
```

### Controlled Drawer

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent, DrawerHandle } from '@abhivarde/svelte-drawer';

	let open = $state(false);

	function handleOpenChange(isOpen) {
		console.log('Drawer is now:', isOpen ? 'open' : 'closed');
		open = isOpen;
	}
</script>

<Drawer bind:open onOpenChange={handleOpenChange}>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<DrawerHandle class="mb-8" />
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
	import { Drawer, DrawerOverlay, DrawerVariants, DrawerHandle } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<!-- Sheet variant (iOS-style bottom sheet) -->
<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerVariants variant="sheet">
		<div class="p-6">
			<DrawerHandle class="mb-6" />
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
			<DrawerHandle class="mb-4" />
			<h2>Sidebar Navigation</h2>
			<p>Side navigation drawer</p>
		</div>
	</DrawerVariants>
</Drawer>
```

### Drag Handle Customization

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent, DrawerHandle } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<!-- Default gray handle -->
		<DrawerHandle class="mb-8" />

		<!-- Custom colored handle -->
		<!-- <DrawerHandle class="bg-blue-500 mb-8" /> -->

		<!-- Larger handle -->
		<!-- <DrawerHandle class="w-16 h-2 mb-8" /> -->

		<h2>Drawer with Custom Handle</h2>
		<p>The handle automatically adapts to drawer direction.</p>
	</DrawerContent>
</Drawer>
```

### Snap Points

Snap points allow the drawer to rest at predefined heights, creating an iOS-like sheet experience.

```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent, DrawerHandle } from '@abhivarde/svelte-drawer';

	let open = $state(false);
	let activeSnapPoint = $state(undefined);
</script>

<Drawer
	bind:open
	snapPoints={[0.25, 0.5, 0.9]}
	bind:activeSnapPoint
	onSnapPointChange={(point) => console.log('Snapped to:', point)}
>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<DrawerHandle class="mb-8" />
		<h2>Drawer with Snap Points</h2>
		<p>Drag to see snapping behavior at 25%, 50%, and 90%</p>

		<!-- Programmatically change snap point -->
		<button onclick={() => activeSnapPoint = 0.5}>Jump to 50%</button>
	</DrawerContent>
</Drawer>
```

**How it works:**

- Snap point values range from 0 to 1 (e.g., `0.5` = 50% of screen height)
- The drawer automatically snaps to the nearest point when released
- Dragging beyond the lowest snap point dismisses the drawer
- Use `bind:activeSnapPoint` to programmatically control the current position
- Use `onSnapPointChange` callback to react to snap changes

### Portal Support

Render the drawer in a portal to avoid z-index conflicts in complex layouts.
```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent, DrawerHandle } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<!-- Enable portal (renders at end of body) -->
<Drawer bind:open portal={true}>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
		<DrawerHandle class="mb-8" />
		<h2>Portal Drawer</h2>
		<p>This drawer is rendered in a portal, preventing z-index issues.</p>
	</DrawerContent>
</Drawer>

<!-- Custom portal container -->
<Drawer bind:open portal={true} portalContainer="#custom-portal">
	<DrawerOverlay />
	<DrawerContent>
		<h2>Custom Portal</h2>
	</DrawerContent>
</Drawer>

<div id="custom-portal"></div>
```

**When to use portals:**
- Complex layouts with nested z-index contexts
- Third-party component libraries with fixed positioning
- Modals inside scrollable containers
- Preventing overflow: hidden conflicts

### Header & Footer Components

Optional pre-styled header and footer components for quick setup.

#### DrawerHeader
```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerHandle } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<!-- With title and description -->
<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg">
		<DrawerHeader 
			title="Drawer Title" 
			description="Optional description text"
			showCloseButton={true}
		/>
		<div class="p-4">
			<p>Drawer content here</p>
		</div>
	</DrawerContent>
</Drawer>

<!-- Custom header content -->
<Drawer bind:open>
	<DrawerOverlay />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg">
		<DrawerHeader>
			<div class="flex items-center gap-3">
				<img src="/icon.png" alt="Icon" class="w-8 h-8" />
				<div>
					<h2 class="font-semibold">Custom Header</h2>
					<p class="text-sm text-gray-600">Your custom content</p>
				</div>
			</div>
		</DrawerHeader>
		<div class="p-4">
			<p>Drawer content</p>
		</div>
	</DrawerContent>
</Drawer>
```

#### DrawerFooter
```svelte
<script>
	import { Drawer, DrawerOverlay, DrawerContent, DrawerFooter } from '@abhivarde/svelte-drawer';

	let open = $state(false);
</script>

<!-- Simple footer with custom content -->
<Drawer bind:open>
	<DrawerOverlay class="fixed inset-0 bg-black/40" />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg flex flex-col">
		<div class="p-4 flex-1">
			<h2>Drawer Content</h2>
		</div>
		<DrawerFooter>
			<button onclick={() => open = false} class="px-4 py-2 bg-gray-200 rounded">
				Cancel
			</button>
			<button class="px-4 py-2 bg-black text-white rounded">
				Confirm
			</button>
		</DrawerFooter>
	</DrawerContent>
</Drawer>

<!-- Custom footer with links -->
<Drawer bind:open>
	<DrawerOverlay />
	<DrawerContent class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg flex flex-col">
		<div class="p-4 flex-1">
			<h2>Content</h2>
		</div>
		<DrawerFooter class="bg-gray-50">
			<div class="flex justify-between w-full">
				<a href="/privacy" class="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
				<a href="/terms" class="text-sm text-gray-600 hover:text-gray-900">Terms</a>
			</div>
		</DrawerFooter>
	</DrawerContent>
</Drawer>
```

**Note:** These components are **optional**. You can still build custom headers and footers using plain HTML/Svelte markup without importing these components.

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
- `snapPoints` (number[], optional) - Array of snap positions between 0-1
- `activeSnapPoint` (number, bindable, optional) - Current active snap point value
- `onSnapPointChange` (function, optional) - Callback fired when snap changes
- `portal` (boolean, optional, default: false) - Render drawer in a portal
- `portalContainer` (HTMLElement | string, optional) - Custom portal container element or selector

### DrawerOverlay

Overlay component that appears behind the drawer.

**Props:**

- `class` (string, optional) - CSS classes for styling

### DrawerContent

Content container for the drawer.

**Props:**

- `class` (string, optional) - CSS classes for styling
- `trapFocus` (boolean, optional, default: true) - Whether to trap focus inside drawer

### DrawerHandle

Visual drag indicator that automatically adapts to drawer direction.

**Props:**

- `class` (string, optional) - CSS classes for styling

**Features:**

- Automatically horizontal for `bottom`/`top` drawers (12px wide, 1.5px tall)
- Automatically vertical for `left`/`right` drawers (1.5px wide, 12px tall)
- Includes `data-drawer-drag` attribute for improved touch targeting
- Fully customizable with Tailwind classes

**Example:**

```svelte
<!-- Default gray handle -->
<DrawerHandle class="mb-8" />

<!-- Custom color -->
<DrawerHandle class="bg-blue-500 mb-8" />

<!-- Larger size -->
<DrawerHandle class="w-16 h-2 mb-8" />
```

### DrawerVariants

Pre-styled drawer content with built-in variants.

**Props:**

- `variant` ('default' | 'sheet' | 'dialog' | 'minimal' | 'sidebar', default: 'default') - Preset style variant
- `class` (string, optional) - Additional CSS classes for styling
- `trapFocus` (boolean, optional, default: true) - Whether to trap focus inside drawer

### DrawerHeader

Optional pre-styled header component.

**Props:**

- `title` (string, optional) - Header title text
- `description` (string, optional) - Description text below title
- `showCloseButton` (boolean, optional, default: true) - Show close button
- `onClose` (function, optional) - Custom close handler
- `class` (string, optional) - CSS classes for styling

**Features:**

- Automatic close button with drawer context
- Customizable via children render
- Border and padding included

### DrawerFooter

Optional pre-styled footer component.

**Props:**

- `class` (string, optional) - CSS classes for styling

**Features:**

- Automatic border and spacing
- Flexible content via children
- Works with mt-auto for bottom positioning

## Demo

Visit [drawer.abhivarde.in](https://drawer.abhivarde.in) to see live examples.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=AbhiVarde/svelte-drawer&type=Date)](https://star-history.com/#AbhiVarde/svelte-drawer&Date)

## License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.

## Credits

Inspired by [Vaul](https://github.com/emilkowalski/vaul) by Emil Kowalski.