---
name: svelte-drawer
description: Rules and patterns for working with @abhivarde/svelte-drawer - an accessible drawer component for Svelte 5. Use when building or editing drawers, bottom sheets, side panels, modals, or snap-point interfaces in any Svelte 5 project.
license: MIT
metadata:
  author: abhivarde
  version: "1.0.0"
---

# svelte-drawer

Accessible drawer component for Svelte 5, inspired by Vaul. Supports gesture-driven drag, multiple directions, snap points, nested drawers, portal rendering, and persistent state.

Package: `@abhivarde/svelte-drawer`
Docs: https://drawer.abhivarde.in
GitHub: https://github.com/AbhiVarde/svelte-drawer

## When to Use

Apply this skill when:

- Adding a drawer, bottom sheet, side panel, or slide-over to a Svelte 5 app
- Working with snap points or iOS-style sheet interactions
- Fixing z-index or overflow conflicts with an existing drawer
- Implementing persistent or controlled drawer state
- Using `autoHeight` for streaming or dynamic content

## Installation

```bash
npm install @abhivarde/svelte-drawer
```

## Exports

```ts
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerFooter,
  DrawerVariants,
  clearDrawerState,
} from "@abhivarde/svelte-drawer";
```

## Non-Negotiable Rules

These are the most common mistakes. Always check these first:

1. `open` must be `$state` - this is Svelte 5, not Svelte 4. Never use `let open = false`.
2. Always `bind:open` on `<Drawer>`, not just `:open`.
3. `DrawerContent` ships with no default styles. Always add `fixed` + directional positioning via `class`.
4. `DrawerOverlay` ships with no default background. Always add `class="fixed inset-0 bg-black/40"` or equivalent.
5. Each nested drawer needs its own separate `$state` variable.
6. `activeSnapPoint` requires `bind:activeSnapPoint` to stay reactive.
7. For scrollable content, put `overflow-y-auto` on the inner content div, not on `DrawerContent`.
8. `clearDrawerState(key)` must match the `persistKey` value used on the `<Drawer>`.

## Component Reference

### Drawer (root)

| Prop                   | Type                                     | Default     |
| ---------------------- | ---------------------------------------- | ----------- |
| `bind:open`            | `boolean`                                | required    |
| `direction`            | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'`  |
| `onOpenChange`         | `(isOpen: boolean) => void`              | -           |
| `closeOnEscape`        | `boolean`                                | `true`      |
| `snapPoints`           | `number[]`                               | -           |
| `bind:activeSnapPoint` | `number`                                 | -           |
| `onSnapPointChange`    | `(point: number) => void`                | -           |
| `portal`               | `boolean`                                | `false`     |
| `portalContainer`      | `HTMLElement \| string`                  | -           |
| `persistState`         | `boolean`                                | `false`     |
| `persistKey`           | `string`                                 | `'default'` |
| `persistSnapPoint`     | `boolean`                                | `false`     |

### DrawerOverlay

| Prop    | Type                                                        |
| ------- | ----------------------------------------------------------- |
| `class` | `string` - must include `fixed inset-0` and a background    |
| `blur`  | `boolean \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` |

### DrawerContent

| Prop         | Type                                       | Default |
| ------------ | ------------------------------------------ | ------- |
| `class`      | `string` - must include `fixed` + position | -       |
| `trapFocus`  | `boolean`                                  | `true`  |
| `autoHeight` | `boolean`                                  | `false` |

### DrawerHandle

Renders a drag indicator. Automatically horizontal for `bottom`/`top`, vertical for `left`/`right`. Accepts `class` for color and size overrides.

### DrawerVariants

Pre-styled content wrapper. Use instead of `DrawerContent` when you want a preset layout.

| Variant   | Style                                        |
| --------- | -------------------------------------------- |
| `default` | Standard bottom drawer, gray background      |
| `sheet`   | iOS-style bottom sheet, white, rounded, 85vh |
| `dialog`  | Centered modal                               |
| `minimal` | Minimal bottom drawer, no extra styling      |
| `sidebar` | Full-height side panel                       |

Props: `variant`, `class`, `trapFocus`.

### DrawerHeader

Optional. Props: `title`, `description`, `showCloseButton` (default `true`), `onClose`, `class`. Accepts children for custom content.

### DrawerFooter

Optional. Props: `class`. Accepts children. Use `mt-auto` on a flex container to pin it to the bottom.

## Key Patterns

**Direction:** Set on `<Drawer direction="right">`. Handle orientation adapts automatically.

**Snap points:** Values are 0-1 fractions of viewport height. Dragging below the lowest snap point dismisses the drawer. Use `bind:activeSnapPoint` to jump programmatically.

**Portal:** Use `portal={true}` when the drawer is inside a parent with `overflow: hidden` or a complex stacking context. Renders at end of `<body>`.

**Auto height:** Use `autoHeight` on `DrawerContent` when content grows dynamically (e.g. streaming AI text). Powered by `ResizeObserver`. No fixed height needed.

**Persistence:** `persistState={true}` saves open/closed to `localStorage`. Pair with a unique `persistKey`. Add `persistSnapPoint={true}` to also save snap position.

**Keyboard:** Escape closes by default. Disable with `closeOnEscape={false}`. Tab is trapped inside unless `trapFocus={false}` is set on `DrawerContent` or `DrawerVariants`.

## Repo Structure

```
svelte-drawer/
├── src/lib/      # npm package source - components and types
├── website/      # docs site (SvelteKit) at drawer.abhivarde.in
├── static/       # static assets
└── package.json  # name: @abhivarde/svelte-drawer
```

Component changes belong in `src/lib/`. Doc and example changes belong in `website/`.

## Resources

- Live demos: https://drawer.abhivarde.in
- Full API: https://github.com/AbhiVarde/svelte-drawer#api-reference
- npm: https://www.npmjs.com/package/@abhivarde/svelte-drawer
