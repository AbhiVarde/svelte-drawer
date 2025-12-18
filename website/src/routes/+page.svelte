<script lang="ts">
  import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
  } from "@abhivarde/svelte-drawer";

  // Drawer states
  let defaultOpen = $state(false);
  let sideOpen = $state(false);
  let nested1Open = $state(false);
  let nested2Open = $state(false);
  let scrollableOpen = $state(false);
  let controlledOpen = $state(false);

  // Copy feedback
  let copyStatus: Record<string, "idle" | "success"> = $state({
    installation: "idle",
    usage: "idle",
    position: "idle",
    default: "idle",
    side: "idle",
    nested: "idle",
    scrollable: "idle",
    controlled: "idle",
  });

  async function copyToClipboard(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    copyStatus[key] = "success";
    setTimeout(() => (copyStatus[key] = "idle"), 2000);
  }

  const codeExamples = {
    installation: `npm install @abhivarde/svelte-drawer`,
    usage: `import { Drawer, DrawerOverlay, DrawerContent } from '@abhivarde/svelte-drawer';

<script>
  let open = $state(false);
<\/script>

<button onclick={() => open = true}>Open Drawer</button>

<Drawer bind:open>
  <DrawerOverlay />
  <DrawerContent class="bg-white rounded-t-lg p-6">
    <div class="mx-auto w-12 h-1.5 rounded-full bg-gray-300 mb-8" />
    <h2 class="text-lg font-medium">Drawer Title</h2>
    <p class="text-gray-600">Drawer content goes here.</p>
  </DrawerContent>
</Drawer>`,
    position: `<Drawer direction="bottom"> <!-- Default: from bottom --> </Drawer>
<Drawer direction="top"> <!-- From top --> </Drawer>
<Drawer direction="left"> <!-- From left --> </Drawer>
<Drawer direction="right"> <!-- From right --> </Drawer>`,
    defaultDrawer: `<Drawer bind:open={defaultOpen}>
  <DrawerOverlay />
  <DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <div aria-hidden="true" class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
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
      <div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
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
      <div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
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
        <div aria-hidden="true" class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
        <h2 class="font-medium mb-4 text-gray-900">Scrollable Drawer</h2>
        <!-- Long content here -->
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
      <div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
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
</svelte:head>

<div class="min-h-screen bg-[#fafafa] flex flex-col">
  <!-- Hero -->
  <div class="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
    <h2 class="text-sm text-gray-500 mb-3">
      Packages by
      <a
        href="https://abhivarde.in"
        target="_blank"
        rel="noopener noreferrer"
        class="underline underline-offset-2 hover:text-gray-800 transition-colors"
      >
        abhivarde.in
      </a>
    </h2>

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

    <div class="flex flex-wrap gap-4 justify-center">
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
  </div>

  <!-- Docs -->
  <div class="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-12">
    <!-- Installation -->
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

    <!-- Usage -->
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

    <!-- Position -->
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

    <!-- Examples -->
    <section>
      <h2 class="text-xl font-medium mb-6">Examples</h2>
      <div class="space-y-10">
        {#each [{ title: "Default Drawer", key: "default", open: () => (defaultOpen = true) }, { title: "Side Drawer", key: "side", open: () => (sideOpen = true) }, { title: "Nested Drawers", key: "nested", open: () => (nested1Open = true) }, { title: "Scrollable Drawer", key: "scrollable", open: () => (scrollableOpen = true) }, { title: "Controlled Drawer", key: "controlled", open: () => (controlledOpen = true) }] as example}
          <div>
            <h3 class="text-lg font-medium mb-3">{example.title}</h3>
            <button
              onclick={example.open}
              class="px-5 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition text-sm mb-4"
            >
              Open {example.title}
            </button>

            <!-- Safe & type-checked dynamic code access -->
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
            {/if}
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<!-- Live Drawers -->
<Drawer bind:open={defaultOpen}>
  <DrawerOverlay />
  <DrawerContent
    class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <div
        aria-hidden="true"
        class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
      ></div>
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
    <div class="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
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
  </DrawerContent>
</Drawer>

<Drawer bind:open={nested1Open}>
  <DrawerOverlay />
  <DrawerContent
    class="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 lg:h-fit max-h-[96%] fixed bottom-0 left-0 right-0"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <div
        class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
      ></div>
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
    class="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[94%] fixed bottom-0 left-0 right-0 z-[70]"
  >
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <div
        class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
      ></div>
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
      <div
        class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
      ></div>
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
