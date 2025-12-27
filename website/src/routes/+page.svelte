<script lang="ts">
  import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerVariants,
    DrawerHandle,
  } from "@abhivarde/svelte-drawer";

  let defaultOpen = $state(false);
  let sideOpen = $state(false);
  let nested1Open = $state(false);
  let nested2Open = $state(false);
  let scrollableOpen = $state(false);
  let controlledOpen = $state(false);
  let variantOpen = $state(false);
  let snapPointOpen = $state(false);
  let currentSnapPoint = $state<number | undefined>(undefined);

  let copyStatus: Record<string, "idle" | "success"> = $state({
    installation: "idle",
    usage: "idle",
    position: "idle",
    default: "idle",
    side: "idle",
    nested: "idle",
    scrollable: "idle",
    controlled: "idle",
    variant: "idle",
    "variants-feature": "idle",
    snappoint: "idle",
  });

  async function copyToClipboard(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    copyStatus[key] = "success";
    setTimeout(() => (copyStatus[key] = "idle"), 2000);
  }

  const codeExamples = {
    installation: `npm install @abhivarde/svelte-drawer`,
    usage: `import { Drawer, DrawerOverlay, DrawerContent, DrawerHandle } from '@abhivarde/svelte-drawer';

<script>
  let open = $state(false);
<\/script>

<button onclick={() => open = true}>Open Drawer</button>

<Drawer bind:open>
  <DrawerOverlay />
  <DrawerContent class="bg-white rounded-t-lg p-6">
    <DrawerHandle class="mb-8" />
    <h2 class="text-lg font-medium">Drawer Title</h2>
    <p class="text-gray-600">Drawer content goes here.</p>
  </DrawerContent>
</Drawer>`,
    position: `<Drawer direction="bottom"></Drawer>
<Drawer direction="top"></Drawer>
<Drawer direction="left"></Drawer>
<Drawer direction="right"></Drawer>`,
    defaultDrawer: `<Drawer bind:open={defaultOpen}>
  <DrawerOverlay />
  <DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">Drawer for Svelte.</h2>
        <p class="text-gray-600 mb-2">This component can be used as a Dialog replacement on mobile and tablet devices.</p>
        <p class="text-gray-600 mb-2">This is the simplest setup.</p>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://github.com/AbhiVarde/svelte-drawer" target="_blank" rel="noopener noreferrer">
          GitHub {@html externalLinkIcon}
        </a>
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://x.com/varde_abhi" target="_blank" rel="noopener noreferrer">
          X {@html externalLinkIcon}
        </a>
      </div>
    </div>
  </DrawerContent>
</Drawer>`,
    sideDrawer: `<Drawer bind:open={sideOpen} direction="right">
  <DrawerOverlay />
  <DrawerContent class="right-2 top-2 bottom-2 fixed outline-none w-[310px] flex">
    <div class="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
      <DrawerHandle class="mb-4" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-2 text-zinc-900">It supports all directions.</h2>
        <p class="text-zinc-600 mb-2">This drawer is positioned on the right side.</p>
      </div>
      <div class="mt-auto pt-8">
        <div class="flex gap-6 justify-center">
          <a class="text-xs text-zinc-600 flex items-center gap-0.5 hover:text-zinc-900" href="https://github.com/AbhiVarde/svelte-drawer" target="_blank" rel="noopener noreferrer">
            GitHub {@html externalLinkIcon}
          </a>
          <a class="text-xs text-zinc-600 flex items-center gap-0.5 hover:text-zinc-900" href="https://x.com/varde_abhi" target="_blank" rel="noopener noreferrer">
            X {@html externalLinkIcon}
          </a>
        </div>
      </div>
    </div>
  </DrawerContent>
</Drawer>`,
    nestedDrawer: `<Drawer bind:open={nested1Open}>
  <DrawerOverlay />
  <DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 lg:h-fit max-h-[96%] fixed bottom-0 left-0 right-0">
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">Nested Drawers.</h2>
        <p class="text-gray-600 mb-2">Nesting drawers creates a stacking effect.</p>
        <p class="text-gray-600 mb-4">Open the second drawer to see it in action.</p>
        <button onclick={() => nested2Open = true} class="rounded-md w-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
          Open Second Drawer
        </button>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://github.com/AbhiVarde/svelte-drawer" target="_blank" rel="noopener noreferrer">
          GitHub {@html externalLinkIcon}
        </a>
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://x.com/varde_abhi" target="_blank" rel="noopener noreferrer">
          X {@html externalLinkIcon}
        </a>
      </div>
    </div>
  </DrawerContent>
</Drawer>

<Drawer bind:open={nested2Open}>
  <DrawerOverlay class="z-[60]" />
  <DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[94%] fixed bottom-0 left-0 right-0 z-[70]">
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">This drawer is nested.</h2>
        <p class="text-gray-600 mb-2">Pull down to see the scaling effect.</p>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://github.com/AbhiVarde/svelte-drawer" target="_blank" rel="noopener noreferrer">
          GitHub {@html externalLinkIcon}
        </a>
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://x.com/varde_abhi" target="_blank" rel="noopener noreferrer">
          X {@html externalLinkIcon}
        </a>
      </div>
    </div>
  </DrawerContent>
</Drawer>`,
    scrollableDrawer: `<Drawer bind:open={scrollableOpen}>
  <DrawerOverlay />
  <DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
    <div class="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
      <div class="max-w-md mx-auto space-y-4">
        <DrawerHandle class="mb-8" />
        <h2 class="font-medium mb-4 text-gray-900">Scrollable Drawer</h2>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://github.com/AbhiVarde/svelte-drawer" target="_blank" rel="noopener noreferrer">
          GitHub {@html externalLinkIcon}
        </a>
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://x.com/varde_abhi" target="_blank" rel="noopener noreferrer">
          X {@html externalLinkIcon}
        </a>
      </div>
    </div>
  </DrawerContent>
</Drawer>`,
    controlledDrawer: `<Drawer bind:open={controlledOpen} onOpenChange={(isOpen) => console.log('Drawer is now:', isOpen ? 'open' : 'closed')}>
  <DrawerOverlay />
  <DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">A controlled drawer.</h2>
        <p class="text-gray-600 mb-2">Control the state externally while still reacting to user gestures via onOpenChange.</p>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://github.com/AbhiVarde/svelte-drawer" target="_blank" rel="noopener noreferrer">
          GitHub {@html externalLinkIcon}
        </a>
        <a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900" href="https://x.com/varde_abhi" target="_blank" rel="noopener noreferrer">
          X {@html externalLinkIcon}
        </a>
      </div>
    </div>
  </DrawerContent>
</Drawer>`,
    variantDrawer: `<Drawer bind:open={variantOpen}>
  <DrawerOverlay />
  <DrawerVariants variant="sheet">
    <div class="p-6">
      <DrawerHandle class="mb-6" />
      <h2 class="text-xl font-semibold mb-4">Sheet Variant</h2>
      <p class="text-gray-600">This uses the prebuilt "sheet" variant style.</p>
    </div>
  </DrawerVariants>
</Drawer>`,
    snapPointDrawer: `<script>
  let open = $state(false);
  let activeSnapPoint = $state(undefined);
<\/script>

<Drawer 
  bind:open 
  snapPoints={[0.25, 0.5, 0.9]}
  bind:activeSnapPoint
  onSnapPointChange={(point) => console.log('Snapped to:', point)}
>
  <DrawerOverlay />
  <DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 outline-none">
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">Snap Points Drawer</h2>
        <p class="text-gray-600 mb-2">
          Try dragging this drawer! It will snap to 25%, 50%, or 90% heights.
        </p>
        <p class="text-gray-600 mb-4">
          Current: {activeSnapPoint ? \`\${(activeSnapPoint * 100).toFixed(0)}%\` : 'Loading...'}
        </p>
        <div class="space-y-2">
          <button 
            onclick={() => activeSnapPoint = 0.25}
            class="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Snap to 25%
          </button>
          <button 
            onclick={() => activeSnapPoint = 0.5}
            class="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Snap to 50%
          </button>
          <button 
            onclick={() => activeSnapPoint = 0.9}
            class="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Snap to 90%
          </button>
        </div>
      </div>
    </div>
  </DrawerContent>
</Drawer>`,
  };

  const externalLinkIcon = `<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" aria-hidden="true" class="w-3 h-3 ml-1">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
    <path d="M15 3h6v6"></path>
    <path d="M10 14L21 3"></path>
  </svg>`;
</script>

<svelte:head>
  <title>Svelte Drawer - A drawer component for Svelte 5</title>
  <meta
    name="description"
    content="A drawer component built with Svelte 5, inspired by Vaul. Supports multiple directions, nested drawers, and smooth animations."
  />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://drawer.abhivarde.in" />
  <meta
    property="og:title"
    content="Svelte Drawer - A drawer component for Svelte 5"
  />
  <meta
    property="og:description"
    content="A drawer component built with Svelte 5, inspired by Vaul. Supports multiple directions, nested drawers, and smooth animations."
  />
  <meta
    property="og:image"
    content="https://drawer.abhivarde.in/og-image.png"
  />
  <meta property="og:image:width" content="800" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Svelte Drawer" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://drawer.abhivarde.in" />
  <meta
    name="twitter:title"
    content="Svelte Drawer - A drawer component for Svelte 5"
  />
  <meta
    name="twitter:description"
    content="A drawer component built with Svelte 5, inspired by Vaul. Supports multiple directions, nested drawers, and smooth animations."
  />
  <meta
    name="twitter:image"
    content="https://drawer.abhivarde.in/og-image.png"
  />
  <meta name="twitter:site" content="@varde_abhi" />
  <meta name="twitter:creator" content="@varde_abhi" />

  <meta name="robots" content="index,follow" />
  <meta name="author" content="Abhi Varde" />
  <meta
    name="keywords"
    content="svelte drawer, svelte 5 component, drawer component, mobile drawer, bottom sheet, vaul svelte, svelte dialog, svelte modal, svelte sheet, ui component library, svelte ui, responsive drawer, gesture drawer, nested drawer, svelte animation, web component, mobile ui, tablet ui, svelte library, npm package, open source svelte"
  />
  <link rel="canonical" href="https://drawer.abhivarde.in" />

  <script
    defer
    src="https://cloud.umami.is/script.js"
    data-website-id="7825f96f-0b2e-4151-9038-a8b2484df381"
  ></script>
</svelte:head>

<div class="min-h-screen bg-[#fafafa] flex flex-col">
  <div class="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
    <p class="text-sm text-gray-500 mb-4">
      npm:
      <a
        href="https://www.npmjs.com/package/@abhivarde/svelte-drawer"
        target="_blank"
        rel="noopener noreferrer"
        class="underline underline-offset-2 hover:text-gray-800 transition-colors"
      >
        @abhivarde/svelte-drawer
      </a>
    </p>

    <h1 class="text-2xl sm:text-3xl font-medium mb-3">Svelte Drawer</h1>

    <p class="text-base text-gray-600 mb-6">
      A drawer component for Svelte 5, inspired by
      <a
        href="https://github.com/emilkowalski/vaul"
        target="_blank"
        rel="noopener noreferrer"
        class="underline underline-offset-4 hover:text-gray-900 transition-colors"
      >
        Vaul
      </a>.
    </p>

    <div class="flex justify-center gap-4 mb-6">
      <button
        onclick={() => (defaultOpen = true)}
        class="px-5 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition text-sm"
      >
        Render a drawer
      </button>

      <a
        href="https://github.com/AbhiVarde/svelte-drawer"
        target="_blank"
        rel="noopener noreferrer"
        class="px-5 py-2 bg-white text-black rounded-md font-medium border border-gray-200 hover:bg-gray-50 transition text-sm"
      >
        GitHub
      </a>
    </div>

    <div class="space-y-1 text-sm text-gray-400">
      <p>
        UI library:
        <a
          href="https://syncui.design"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 hover:text-gray-600 transition-colors"
        >
          syncui.design
        </a>
      </p>

      <p>
        by
        <a
          href="https://abhivarde.in"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 hover:text-gray-600 transition-colors"
        >
          abhivarde.in
        </a>
      </p>
    </div>
  </div>

  <div class="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-12">
    <section>
      <h2 class="text-xl font-medium mb-3">Installation</h2>
      <div class="bg-white rounded-md border border-gray-200 p-4 relative">
        <pre class="text-sm overflow-x-auto"><code
            >{codeExamples.installation}</code
          ></pre>
        <button
          onclick={() =>
            copyToClipboard(codeExamples.installation, "installation")}
          class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
        >
          {#if copyStatus.installation === "success"}
            <svg
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              /></svg
            >
          {:else}
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              /></svg
            >
          {/if}
        </button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-medium mb-3">Usage</h2>
      <p class="text-sm text-gray-600 mb-4">
        Basic setup with a bottom drawer.
      </p>
      <div class="bg-white rounded-md border border-gray-200 p-4 relative">
        <pre class="text-sm overflow-x-auto"><code>{codeExamples.usage}</code
          ></pre>
        <button
          onclick={() => copyToClipboard(codeExamples.usage, "usage")}
          class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
        >
          {#if copyStatus.usage === "success"}<svg
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              /></svg
            >{:else}<svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              /></svg
            >{/if}
        </button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-medium mb-3">Position</h2>
      <p class="text-sm text-gray-600 mb-4">
        Change direction with the <code>direction</code> prop.
      </p>
      <div class="bg-white rounded-md border border-gray-200 p-4 relative">
        <pre class="text-sm overflow-x-auto"><code>{codeExamples.position}</code
          ></pre>
        <button
          onclick={() => copyToClipboard(codeExamples.position, "position")}
          class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
        >
          {#if copyStatus.position === "success"}<svg
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              /></svg
            >{:else}<svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              /></svg
            >{/if}
        </button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-medium mb-3">Keyboard Shortcuts</h2>
      <p class="text-sm text-gray-600 mb-4">
        Press <kbd
          class="px-2 py-1 bg-gray-100 rounded border border-gray-300 text-xs font-mono"
          >Esc</kbd
        >
        to close the drawer. Disable with <code>closeOnEscape={false}</code>.
      </p>
      <div class="bg-white rounded-md border border-gray-200 p-4 relative">
        <pre class="text-sm overflow-x-auto"><code
            >&lt;Drawer bind:open closeOnEscape={true}&gt;
  &lt;!-- Drawer content --&gt;
&lt;/Drawer&gt;</code
          ></pre>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-medium mb-3">Prebuilt Variants</h2>
      <p class="text-sm text-gray-600 mb-4">
        Use prebuilt variants for common drawer styles. Available variants: <code
          >default</code
        >, <code>sheet</code>, <code>dialog</code>, <code>minimal</code>, and
        <code>sidebar</code>.
      </p>
      <div class="bg-white rounded-md border border-gray-200 p-4 relative">
        <pre class="text-sm overflow-x-auto"><code
            >&lt;Drawer bind:open&gt;
  &lt;DrawerOverlay /&gt;
  &lt;DrawerVariants variant="sheet"&gt;
    &lt;div class="p-6"&gt;
      &lt;h2&gt;Sheet Variant&lt;/h2&gt;
      &lt;p&gt;Prebuilt styling applied!&lt;/p&gt;
    &lt;/div&gt;
  &lt;/DrawerVariants&gt;
&lt;/Drawer&gt;

&lt;!-- Available variants --&gt;
&lt;DrawerVariants variant="default" /&gt;  &lt;!-- Default bottom drawer --&gt;
&lt;DrawerVariants variant="sheet" /&gt;    &lt;!-- Full-height sheet --&gt;
&lt;DrawerVariants variant="dialog" /&gt;   &lt;!-- Centered dialog --&gt;
&lt;DrawerVariants variant="minimal" /&gt;  &lt;!-- Minimal bottom --&gt;
&lt;DrawerVariants variant="sidebar" /&gt;  &lt;!-- Side panel --&gt;</code
          ></pre>
        <button
          onclick={() =>
            copyToClipboard(
              `<Drawer bind:open>
  <DrawerOverlay />
  <DrawerVariants variant="sheet">
    <div class="p-6">
      <h2>Sheet Variant</h2>
      <p>Prebuilt styling applied!</p>
    </div>
  </DrawerVariants>
</Drawer>

<!-- Available variants -->
<DrawerVariants variant="default" />  <!-- Default bottom drawer -->
<DrawerVariants variant="sheet" />    <!-- Full-height sheet -->
<DrawerVariants variant="dialog" />   <!-- Centered dialog -->
<DrawerVariants variant="minimal" />  <!-- Minimal bottom -->
<DrawerVariants variant="sidebar" />  <!-- Side panel -->`,
              "variants-feature"
            )}
          class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
        >
          {#if copyStatus["variants-feature"] === "success"}
            <svg
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              /></svg
            >
          {:else}
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              /></svg
            >
          {/if}
        </button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-medium mb-3">Snap Points</h2>
      <p class="text-sm text-gray-600 mb-4">
        Snap points allow the drawer to rest at predefined heights, creating an
        iOS-like sheet experience. Drag to snap between positions or control
        programmatically.
      </p>
      <div class="bg-white rounded-md border border-gray-200 p-4 relative">
        <pre class="text-sm overflow-x-auto"><code
            >{codeExamples.snapPointDrawer}</code
          ></pre>
        <button
          onclick={() =>
            copyToClipboard(codeExamples.snapPointDrawer, "snappoint")}
          class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
        >
          {#if copyStatus.snappoint === "success"}
            <svg
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              /></svg
            >
          {:else}
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              /></svg
            >
          {/if}
        </button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-medium mb-6">Examples</h2>
      <div class="space-y-10">
        {#each [{ title: "Default Drawer", key: "default", open: () => (defaultOpen = true) }, { title: "Side Drawer", key: "side", open: () => (sideOpen = true) }, { title: "Nested Drawers", key: "nested", open: () => (nested1Open = true) }, { title: "Scrollable Drawer", key: "scrollable", open: () => (scrollableOpen = true) }, { title: "Controlled Drawer", key: "controlled", open: () => (controlledOpen = true) }, { title: "Prebuilt Variants", key: "variant", open: () => (variantOpen = true) }, { title: "Snap Points", key: "snappoint", open: () => (snapPointOpen = true) }] as example}
          <div>
            <h3 class="text-lg font-medium mb-3">{example.title}</h3>
            <button
              onclick={example.open}
              class="px-5 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition text-sm mb-4"
            >
              Open {example.title}
            </button>

            {#if example.key === "default"}
              {@const code = codeExamples.defaultDrawer}
              <div
                class="bg-white rounded-md border border-gray-200 p-4 relative"
              >
                <pre class="text-sm overflow-x-auto"><code>{code}</code></pre>
                <button
                  onclick={() => copyToClipboard(code, "default")}
                  class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
                >
                  {#if copyStatus.default === "success"}
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      /></svg
                    >
                  {:else}
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      /></svg
                    >
                  {/if}
                </button>
              </div>
            {:else if example.key === "side"}
              {@const code = codeExamples.sideDrawer}
              <div
                class="bg-white rounded-md border border-gray-200 p-4 relative"
              >
                <pre class="text-sm overflow-x-auto"><code>{code}</code></pre>
                <button
                  onclick={() => copyToClipboard(code, "side")}
                  class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
                >
                  {#if copyStatus.side === "success"}
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      /></svg
                    >
                  {:else}
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      /></svg
                    >
                  {/if}
                </button>
              </div>
            {:else if example.key === "nested"}
              {@const code = codeExamples.nestedDrawer}
              <div
                class="bg-white rounded-md border border-gray-200 p-4 relative"
              >
                <pre class="text-sm overflow-x-auto"><code>{code}</code></pre>
                <button
                  onclick={() => copyToClipboard(code, "nested")}
                  class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
                >
                  {#if copyStatus.nested === "success"}
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      /></svg
                    >
                  {:else}
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      /></svg
                    >
                  {/if}
                </button>
              </div>
            {:else if example.key === "scrollable"}
              {@const code = codeExamples.scrollableDrawer}
              <div
                class="bg-white rounded-md border border-gray-200 p-4 relative"
              >
                <pre class="text-sm overflow-x-auto"><code>{code}</code></pre>
                <button
                  onclick={() => copyToClipboard(code, "scrollable")}
                  class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
                >
                  {#if copyStatus.scrollable === "success"}
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      /></svg
                    >
                  {:else}
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      /></svg
                    >
                  {/if}
                </button>
              </div>
            {:else if example.key === "controlled"}
              {@const code = codeExamples.controlledDrawer}
              <div
                class="bg-white rounded-md border border-gray-200 p-4 relative"
              >
                <pre class="text-sm overflow-x-auto"><code>{code}</code></pre>
                <button
                  onclick={() => copyToClipboard(code, "controlled")}
                  class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
                >
                  {#if copyStatus.controlled === "success"}
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      /></svg
                    >
                  {:else}
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      /></svg
                    >
                  {/if}
                </button>
              </div>
            {:else if example.key === "variant"}
              {@const code = codeExamples.variantDrawer}
              <div
                class="bg-white rounded-md border border-gray-200 p-4 relative"
              >
                <pre class="text-sm overflow-x-auto"><code>{code}</code></pre>
                <button
                  onclick={() => copyToClipboard(code, "variant")}
                  class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
                >
                  {#if copyStatus.variant === "success"}
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      /></svg
                    >
                  {:else}
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      /></svg
                    >
                  {/if}
                </button>
              </div>
            {:else if example.key === "snappoint"}
              {@const code = codeExamples.snapPointDrawer}
              <div
                class="bg-white rounded-md border border-gray-200 p-4 relative"
              >
                <pre class="text-sm overflow-x-auto"><code>{code}</code></pre>
                <button
                  onclick={() => copyToClipboard(code, "snappoint")}
                  class="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100"
                >
                  {#if copyStatus.snappoint === "success"}
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      /></svg
                    >
                  {:else}
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      /></svg
                    >
                  {/if}
                </button>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<Drawer bind:open={defaultOpen}>
  <DrawerOverlay />
  <DrawerContent
    class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">Drawer for Svelte.</h2>
        <p class="text-gray-600 mb-2">
          This component can be used as a Dialog replacement on mobile and
          tablet devices.
        </p>
        <p class="text-gray-600 mb-2">This is the simplest setup.</p>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://github.com/AbhiVarde/svelte-drawer"
          target="_blank"
          rel="noopener noreferrer">GitHub {@html externalLinkIcon}</a
        >
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://x.com/varde_abhi"
          target="_blank"
          rel="noopener noreferrer">X {@html externalLinkIcon}</a
        >
      </div>
    </div>
  </DrawerContent>
</Drawer>

<Drawer bind:open={sideOpen} direction="right">
  <DrawerOverlay />
  <DrawerContent
    class="right-2 top-2 bottom-2 fixed outline-none w-[310px] flex"
  >
    <div class="bg-zinc-50 h-full w-full grow p-5 flex rounded-[16px]">
      <DrawerHandle class="mr-4" />
      <div class="flex flex-col flex-1">
        <div class="max-w-md mx-auto">
          <h2 class="font-medium mb-2 text-zinc-900">
            It supports all directions.
          </h2>
          <p class="text-zinc-600 mb-2">
            This drawer is positioned on the right side.
          </p>
        </div>
        <div class="mt-auto pt-8">
          <div class="flex gap-6 justify-center">
            <a
              class="text-xs text-zinc-600 flex items-center gap-0.5 hover:text-zinc-900"
              href="https://github.com/AbhiVarde/svelte-drawer"
              target="_blank"
              rel="noopener noreferrer">GitHub {@html externalLinkIcon}</a
            >
            <a
              class="text-xs text-zinc-600 flex items-center gap-0.5 hover:text-zinc-900"
              href="https://x.com/varde_abhi"
              target="_blank"
              rel="noopener noreferrer">X {@html externalLinkIcon}</a
            >
          </div>
        </div>
      </div>
    </div>
  </DrawerContent>
</Drawer>

<Drawer bind:open={nested1Open}>
  <DrawerOverlay />
  <DrawerContent
    class="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 lg:h-fit max-h-[40%] fixed bottom-0 left-0 right-0"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">Nested Drawers.</h2>
        <p class="text-gray-600 mb-2">
          Nesting drawers creates a stacking effect.
        </p>
        <p class="text-gray-600 mb-4">
          Open the second drawer to see it in action.
        </p>
        <button
          onclick={() => (nested2Open = true)}
          class="rounded-md w-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Open Second Drawer
        </button>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://github.com/AbhiVarde/svelte-drawer"
          target="_blank"
          rel="noopener noreferrer">GitHub {@html externalLinkIcon}</a
        >
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://x.com/varde_abhi"
          target="_blank"
          rel="noopener noreferrer">X {@html externalLinkIcon}</a
        >
      </div>
    </div>
  </DrawerContent>
</Drawer>

<Drawer bind:open={nested2Open}>
  <DrawerOverlay class="z-[60]" />
  <DrawerContent
    class="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[60%] fixed bottom-0 left-0 right-0 z-[70]"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">This drawer is nested.</h2>
        <p class="text-gray-600 mb-2">Pull down to see the scaling effect.</p>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://github.com/AbhiVarde/svelte-drawer"
          target="_blank"
          rel="noopener noreferrer">GitHub {@html externalLinkIcon}</a
        >
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://x.com/varde_abhi"
          target="_blank"
          rel="noopener noreferrer">X {@html externalLinkIcon}</a
        >
      </div>
    </div>
  </DrawerContent>
</Drawer>

<Drawer bind:open={scrollableOpen}>
  <DrawerOverlay />
  <DrawerContent
    class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
      <div class="max-w-md mx-auto space-y-6">
        <div
          aria-hidden="true"
          class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
        ></div>
        <h2 class="font-medium text-xl text-gray-900">Why Svelte Drawer?</h2>
        <p class="text-gray-600 leading-relaxed">
          Svelte Drawer brings native-like sheet experiences to the web with
          smooth gesture support, nesting capabilities, and full accessibility.
        </p>
        <h3 class="font-medium text-lg text-gray-900 mt-6">Features</h3>
        <ul class="list-disc pl-5 space-y-2 text-gray-600">
          <li>Touch and mouse gesture support (drag to dismiss or snap)</li>
          <li>Multiple directions: bottom (default), top, left, right</li>
          <li>Nested drawers with automatic scaling of previous layers</li>
          <li>Scrollable content with proper momentum scrolling</li>
          <li>Fully accessible (keyboard support, focus management)</li>
          <li>No external dependencies – lightweight and fast</li>
          <li>Inspired by Vaul but built purely for Svelte 5</li>
        </ul>
        <h3 class="font-medium text-lg text-gray-900 mt-8">Installation</h3>
        <p class="text-gray-600">Just run:</p>
        <pre class="bg-gray-100 p-3 rounded-md text-sm mt-2"><code
            >npm install @abhivarde/svelte-drawer</code
          ></pre>
        <p class="text-gray-600 mt-6">
          Start building beautiful mobile-friendly interfaces today.
        </p>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://github.com/AbhiVarde/svelte-drawer"
          target="_blank"
          rel="noopener noreferrer">GitHub {@html externalLinkIcon}</a
        >
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://x.com/varde_abhi"
          target="_blank"
          rel="noopener noreferrer">X {@html externalLinkIcon}</a
        >
      </div>
    </div>
  </DrawerContent>
</Drawer>

<Drawer
  bind:open={controlledOpen}
  onOpenChange={(isOpen: boolean) =>
    console.log("Drawer is now:", isOpen ? "open" : "closed")}
>
  <DrawerOverlay />
  <DrawerContent
    class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">A controlled drawer.</h2>
        <p class="text-gray-600 mb-2">
          Control the state externally while still reacting to user gestures via
          onOpenChange.
        </p>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://github.com/AbhiVarde/svelte-drawer"
          target="_blank"
          rel="noopener noreferrer">GitHub {@html externalLinkIcon}</a
        >
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://x.com/varde_abhi"
          target="_blank"
          rel="noopener noreferrer">X {@html externalLinkIcon}</a
        >
      </div>
    </div>
  </DrawerContent>
</Drawer>

<Drawer bind:open={variantOpen} closeOnEscape={true}>
  <DrawerOverlay />
  <DrawerVariants variant="sheet">
    <div class="p-6">
      <DrawerHandle class="mb-6" />
      <h2 class="text-xl font-semibold mb-4 text-gray-900">Sheet Variant</h2>
      <p class="text-gray-600 mb-4">
        This drawer uses the prebuilt "sheet" variant.
      </p>
      <p class="text-gray-600 text-sm">
        Press <kbd
          class="px-2 py-1 bg-gray-100 rounded border text-xs font-mono"
          >Esc</kbd
        > to close.
      </p>
    </div>
  </DrawerVariants>
</Drawer>

<Drawer
  bind:open={snapPointOpen}
  snapPoints={[0.25, 0.5, 0.9]}
  bind:activeSnapPoint={currentSnapPoint}
  onSnapPointChange={(point: number) => console.log("Snapped to:", point)}
>
  <DrawerOverlay />
  <DrawerContent
    class="bg-gray-100 flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 outline-none"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">Snap Points Drawer</h2>
        <p class="text-gray-600 mb-2">
          Try dragging this drawer! It will snap to 25%, 50%, or 90% heights.
        </p>
        <p class="text-gray-600 mb-4">
          Current position: <strong
            >{currentSnapPoint
              ? `${(currentSnapPoint * 100).toFixed(0)}%`
              : "Loading..."}</strong
          >
        </p>
        <div class="space-y-2">
          <button
            onclick={() => (currentSnapPoint = 0.25)}
            class="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
          >
            Snap to 25%
          </button>
          <button
            onclick={() => (currentSnapPoint = 0.5)}
            class="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
          >
            Snap to 50%
          </button>
          <button
            onclick={() => (currentSnapPoint = 0.9)}
            class="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
          >
            Snap to 90%
          </button>
        </div>
      </div>
    </div>
    <div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="flex gap-6 justify-end max-w-md mx-auto">
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://github.com/AbhiVarde/svelte-drawer"
          target="_blank"
          rel="noopener noreferrer">GitHub {@html externalLinkIcon}</a
        >
        <a
          class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
          href="https://x.com/varde_abhi"
          target="_blank"
          rel="noopener noreferrer">X {@html externalLinkIcon}</a
        >
      </div>
    </div>
  </DrawerContent>
</Drawer>
