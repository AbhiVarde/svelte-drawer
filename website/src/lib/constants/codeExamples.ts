export const codeExamples = {
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
    <DrawerFooter />
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
      <DrawerFooter />
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
    <DrawerFooter />
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
    <DrawerFooter />
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
    <DrawerFooter />
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
    <DrawerFooter />
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
    <DrawerFooter />
  </DrawerContent>
</Drawer>`,

  portalDrawer: `<script>
  let open = $state(false);
<\/script>

<Drawer bind:open portal={true}>
  <DrawerOverlay />
  <DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 outline-none">
    <div class="p-4 bg-white rounded-t-[10px] flex-1">
      <DrawerHandle class="mb-8" />
      <div class="max-w-md mx-auto">
        <h2 class="font-medium mb-4 text-gray-900">Portal Drawer</h2>
        <p class="text-gray-600 mb-2">
          This drawer is rendered in a portal at the end of the document body.
        </p>
        <p class="text-gray-600 mb-2">
          This prevents z-index conflicts in complex layouts.
        </p>
      </div>
    </div>
    <DrawerFooter />
  </DrawerContent>
</Drawer>`,
};
