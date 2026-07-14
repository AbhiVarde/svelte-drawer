<script lang="ts">
  import { onMount } from "svelte";
  import { Star, Github, Heart, ChevronRight, Coffee } from "lucide-svelte";

  interface Stargazer {
    id: number;
    login: string;
    avatar_url: string;
  }

  let {
    stars = 0,
    stargazers = [],
  }: { stars: number; stargazers: Stargazer[] } = $props();

  let visible = $state(false);
  let windowWidth = $state(0);

  const GITHUB_URL = "https://github.com/AbhiVarde/svelte-drawer";
  const SPONSOR_URL = "https://github.com/sponsors/AbhiVarde";
  const COFFEE_URL = "https://buymeacoffee.com/abhivarde9h";

  onMount(() => {
    setTimeout(() => (visible = true), 100);

    windowWidth = window.innerWidth;
    const handleResize = () => (windowWidth = window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  let displayCount = $derived.by(() => {
    if (windowWidth < 640) return 5;
    if (windowWidth < 768) return 7;
    return 10;
  });

  let firstStargazers = $derived(stargazers.slice(0, displayCount));
  let remainingCount = $derived(Math.max(0, stargazers.length - displayCount));

  function handleAvatarError(e: Event) {
    const img = e.currentTarget as HTMLImageElement;
    img.style.visibility = "hidden";
  }

  function animateCounter(node: HTMLElement, { value }: { value: number }) {
    const duration = 1600;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(value * easeOutQuart);
      node.textContent = current.toLocaleString();

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    return { destroy() {} };
  }
</script>

<section
  class="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-6 md:pb-8"
  style="opacity: {visible ? 1 : 0}; transition: opacity 0.3s ease-out;"
>
  <div class="text-center mb-6">
    <h2 class="text-xl sm:text-2xl font-medium mb-2">Trusted by developers</h2>
    <p class="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
      Open source and community driven
    </p>
  </div>

  <div
    class="border border-gray-200 rounded-lg p-4 sm:p-6 max-w-xl mx-auto overflow-hidden"
  >
    <div class="flex justify-center items-center h-11 mb-4 overflow-x-auto">
      <div class="flex items-center justify-center min-w-max px-2">
        {#each firstStargazers as user, i (user.id)}
          <img
            src={user.avatar_url}
            alt={user.login}
            class="avatar w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white bg-white flex-shrink-0"
            style="margin-left: {i > 0 ? '-8px' : '0'}; z-index: {displayCount -
              i}; animation-delay: {i * 40}ms;"
            loading="lazy"
            onerror={handleAvatarError}
          />
        {/each}
        {#if remainingCount > 0}
          <div
            class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-700 flex-shrink-0"
            style="margin-left: -8px; z-index: 0;"
          >
            +{remainingCount}
          </div>
        {/if}
      </div>
    </div>

    <div class="flex justify-center items-center gap-1.5 mb-4">
      <Star class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 flex-shrink-0" />
      <span class="text-sm font-medium">
        <span use:animateCounter={{ value: stars }}></span>
      </span>
      <span class="text-xs text-gray-500">stars</span>
    </div>

    <div
      class="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs items-center"
    >
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="link inline-flex items-center gap-1 font-medium text-gray-700 hover:text-black transition-colors group whitespace-nowrap"
      >
        <Github class="w-3.5 h-3.5 flex-shrink-0" />
        <span>Star</span>
        <ChevronRight
          class="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        />
      </a>

      <a
        href={SPONSOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="link inline-flex items-center gap-1 font-medium text-gray-700 hover:text-black transition-colors group whitespace-nowrap"
      >
        <Heart class="w-3.5 h-3.5 flex-shrink-0" />
        <span>Sponsor</span>
        <ChevronRight
          class="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        />
      </a>

      <a
        href={COFFEE_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="link inline-flex items-center gap-1 font-medium text-gray-700 hover:text-black transition-colors group whitespace-nowrap"
      >
        <Coffee class="w-3.5 h-3.5 flex-shrink-0" />
        <span>Buy me a coffee</span>
        <ChevronRight
          class="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        />
      </a>
    </div>
  </div>
</section>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .avatar {
    opacity: 0;
    animation: fadeIn 0.3s ease-out forwards;
  }
</style>
