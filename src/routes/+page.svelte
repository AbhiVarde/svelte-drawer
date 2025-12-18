<script lang="ts">
	import { Drawer, DrawerOverlay, DrawerContent } from '$lib';
	
	type TabId = 'default' | 'side' | 'nested' | 'scrollable' | 'controlled';
	
	let activeTab: TabId = $state('default');
	
	// Drawer state management
	let defaultOpen = $state(false);
	let sideOpen = $state(false);
	let nested1Open = $state(false);
	let nested2Open = $state(false);
	let scrollableOpen = $state(false);
	let controlledOpen = $state(false);
	
	// Tab configuration
	const tabs: Array<{ id: TabId; label: string }> = [
		{ id: 'default', label: 'Default' },
		{ id: 'side', label: 'Side drawer' },
		{ id: 'nested', label: 'Nested Drawers' },
		{ id: 'scrollable', label: 'Scrollable' },
		{ id: 'controlled', label: 'Controlled' }
	];
	
	// Tab content configuration
	const tabContent: Record<TabId, { title: string; description: string }> = {
		default: {
			title: 'Default',
			description: 'The most basic setup for a drawer.'
		},
		side: {
			title: 'Side drawer',
			description: 'Set the direction prop to "right" or "left" to change the position of the drawer.'
		},
		nested: {
			title: 'Nested Drawers',
			description: 'Nest drawers inside each other.'
		},
		scrollable: {
			title: 'Scrollable',
			description: 'A scrollable drawer. The behavior here mimics Apple\'s Sheet component.'
		},
		controlled: {
			title: 'Controlled',
			description: 'You can programmatically open or close the drawer.'
		}
	};
	
	// External link icon
	const externalLinkIcon = `<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" aria-hidden="true" class="w-3 h-3 ml-1">
		<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
		<path d="M15 3h6v6"></path>
		<path d="M10 14L21 3"></path>
	</svg>`;
</script>

<svelte:head>
	<title>Svelte Drawer - A drawer component for Svelte 5</title>
	<meta name="description" content="A drawer component built with Svelte 5, inspired by Vaul. Supports multiple directions, nested drawers, and smooth animations." />
</svelte:head>

<div class="min-h-screen bg-[#fafafa]">
	<!-- Header -->
	<div class="border-b border-gray-200 bg-white">
		<div class="max-w-5xl mx-auto px-4 py-6">
			<h1 class="text-3xl mb-2">Drawer component for Svelte.</h1>
			<p class="text-gray-600 text-sm">A drawer component built with Svelte 5, inspired by Vaul.</p>
		</div>
	</div>
	
	<!-- Tabs -->
	<div class="border-b border-gray-200 bg-white sticky top-0 z-30">
		<div class="max-w-5xl mx-auto px-4">
			<div class="flex gap-6 overflow-x-auto">
				{#each tabs as tab}
					<button 
						onclick={() => activeTab = tab.id} 
						class="py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap {activeTab === tab.id ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}"
					>
						{tab.label}
					</button>
				{/each}
			</div>
		</div>
	</div>
	
	<!-- Content -->
	<div class="max-w-5xl mx-auto px-4 py-12">
		{#if activeTab === 'default'}
			<div class="text-center">
				<h2 class="text-2xl font-light mb-3">{tabContent.default.title}</h2>
				<p class="text-gray-600 mb-8">{tabContent.default.description}</p>
				<button 
					onclick={() => defaultOpen = true}
					class="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
				>
					Open Drawer
				</button>
			</div>
		{:else if activeTab === 'side'}
			<div class="text-center">
				<h2 class="text-2xl font-light mb-3">{tabContent.side.title}</h2>
				<p class="text-gray-600 mb-8">{tabContent.side.description}</p>
				<button 
					onclick={() => sideOpen = true}
					class="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
				>
					Open Drawer
				</button>
			</div>
		{:else if activeTab === 'nested'}
			<div class="text-center">
				<h2 class="text-2xl font-light mb-3">{tabContent.nested.title}</h2>
				<p class="text-gray-600 mb-8">{tabContent.nested.description}</p>
				<button 
					onclick={() => nested1Open = true}
					class="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
				>
					Open Drawer
				</button>
			</div>
		{:else if activeTab === 'scrollable'}
			<div class="text-center">
				<h2 class="text-2xl font-light mb-3">{tabContent.scrollable.title}</h2>
				<p class="text-gray-600 mb-8">{tabContent.scrollable.description}</p>
				<button 
					onclick={() => scrollableOpen = true}
					class="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
				>
					Open Drawer
				</button>
			</div>
		{:else if activeTab === 'controlled'}
			<div class="text-center">
				<h2 class="text-2xl font-light mb-3">{tabContent.controlled.title}</h2>
				<p class="text-gray-600 mb-8">{tabContent.controlled.description}</p>
				<button 
					onclick={() => controlledOpen = true}
					class="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
				>
					Open Drawer
				</button>
			</div>
		{/if}
	</div>
</div>

<!-- Default Drawer -->
<Drawer bind:open={defaultOpen}>
	<DrawerOverlay />
	<DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
		<div class="p-4 bg-white rounded-t-[10px] flex-1">
			<div aria-hidden="true" class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
			<div class="max-w-md mx-auto">
				<h2 class="font-medium mb-4 text-gray-900">Drawer for Svelte.</h2>
				<p class="text-gray-600 mb-2">
					This component can be used as a Dialog replacement on mobile and tablet devices.
				</p>
				<p class="text-gray-600 mb-2">
					This one specifically is the most simplest setup you can have, just a simple drawer with a trigger.
				</p>
			</div>
		</div>
		<div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
			<div class="flex gap-6 justify-end max-w-md mx-auto">
				<a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900 transition-colors" href="https://github.com/AbhiVarde/svelte-drawer" target="_blank" rel="noopener noreferrer">
					GitHub {@html externalLinkIcon}
				</a>
				<a class="text-xs text-gray-600 flex items-center gap-0.5 hover:text-gray-900 transition-colors" href="https://twitter.com/AbhiVarde" target="_blank" rel="noopener noreferrer">
					Twitter {@html externalLinkIcon}
				</a>
			</div>
		</div>
	</DrawerContent>
</Drawer>

<!-- Side Drawer -->
<Drawer bind:open={sideOpen} direction="right">
	<DrawerOverlay />
	<DrawerContent class="right-2 top-2 bottom-2 fixed outline-none w-[310px] flex">
		<div class="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
			<div class="max-w-md mx-auto">
				<h2 class="font-medium mb-2 text-zinc-900">It supports all directions.</h2>
				<p class="text-zinc-600 mb-2">
					This one specifically is not touching the edge of the screen, but that's not required for a side drawer.
				</p>
			</div>
		</div>
	</DrawerContent>
</Drawer>

<!-- Nested Drawer 1 -->
<Drawer bind:open={nested1Open}>
	<DrawerOverlay />
	<DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 lg:h-fit max-h-[96%] fixed bottom-0 left-0 right-0">
		<div class="p-4 bg-white rounded-t-[10px] flex-1">
			<div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
			<div class="max-w-md mx-auto">
				<h2 class="font-medium mb-4 text-gray-900">Nested Drawers.</h2>
				<p class="text-gray-600 mb-2">Nesting drawers creates a stacking effect.</p>
				<p class="text-gray-600 mb-2">You can nest as many drawers as you want. All you need to do is add a nested drawer inside.</p>
				<button 
					onclick={() => nested2Open = true}
					class="rounded-md mt-4 w-full bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
				>
					Open Second Drawer
				</button>
			</div>
		</div>
		<div class="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
			<div class="flex gap-6 justify-end max-w-md mx-auto">
				<a class="text-xs text-gray-600 flex items-center gap-0.5" href="https://github.com/AbhiVarde/svelte-drawer" target="_blank" rel="noopener noreferrer">
					GitHub {@html externalLinkIcon}
				</a>
			</div>
		</div>
	</DrawerContent>
</Drawer>

<!-- Nested Drawer 2 -->
<Drawer bind:open={nested2Open}>
	<DrawerOverlay class="z-[60]" />
	<DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] lg:h-[327px] h-full mt-24 max-h-[94%] fixed bottom-0 left-0 right-0 z-[70]">
		<div class="p-4 bg-white rounded-t-[10px] flex-1">
			<div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
			<div class="max-w-md mx-auto">
				<h2 class="font-medium mb-4 text-gray-900">This drawer is nested.</h2>
				<p class="text-gray-600 mb-2">If you pull this drawer down a bit, it'll scale the drawer underneath it as well.</p>
			</div>
		</div>
	</DrawerContent>
</Drawer>

<!-- Scrollable Drawer -->
<Drawer bind:open={scrollableOpen}>
	<DrawerOverlay />
	<DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
		<div class="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
			<div class="max-w-md mx-auto space-y-4">
				<div aria-hidden="true" class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
				<h2 class="font-medium mb-4 text-gray-900">Ira Glass on Taste</h2>
				<p class="text-gray-600">Nobody tells this to people who are beginners, I wish someone told me. All of us who do creative work, we get into it because we have good taste.</p>
				<p class="text-gray-600">But there is this gap. For the first couple years you make stuff, it's just not that good. It's trying to be good, it has potential, but it's not. But your taste, the thing that got you into the game, is still killer. And your taste is why your work disappoints you. A lot of people never get past this phase, they quit.</p>
				<p class="text-gray-600">Most people I know who do interesting, creative work went through years of this. We know our work doesn't have this special thing that we want it to have. We all go through this. And if you are just starting out or you are still in this phase, you gotta know its normal and the most important thing you can do is do a lot of work</p>
				<p class="text-gray-600">Put yourself on a deadline so that every week you will finish one story. It is only by going through a volume of work that you will close that gap, and your work will be as good as your ambitions. And I took longer to figure out how to do this than anyone I've ever met. It's gonna take awhile. It's normal to take awhile. You've just gotta fight your way through.</p>
			</div>
		</div>
	</DrawerContent>
</Drawer>

<!-- Controlled Drawer -->
<Drawer bind:open={controlledOpen} onOpenChange={(open: boolean) => console.log('Drawer is now:', open ? 'open' : 'closed')}>
	<DrawerOverlay />
	<DrawerContent class="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
		<div class="p-4 bg-white rounded-t-[10px] flex-1">
			<div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"></div>
			<div class="max-w-md mx-auto">
				<h2 class="font-medium mb-4 text-gray-900">A controlled drawer.</h2>
				<p class="text-gray-600 mb-2">This means that the drawer no longer manages its own state. Instead, you can control it programmatically from the outside.</p>
				<p class="text-gray-600 mb-2">But you can still let the drawer help you a bit by passing the onOpenChange prop. This way, the drawer will change your open state when the user clicks outside of it, or when they press the escape key for example.</p>
			</div>
		</div>
	</DrawerContent>
</Drawer>