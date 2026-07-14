import type { PageServerLoad } from "./$types";
import { GITHUB_TOKEN } from "$env/static/private";

const GITHUB_REPO = "AbhiVarde/svelte-drawer";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

let cache: { stars: number; stargazers: any[]; timestamp: number } | null =
  null;

async function fetchGitHubData() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  };

  const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
    headers,
  });
  if (!repoRes.ok) throw new Error(`repo fetch failed: ${repoRes.status}`);
  const repoData = await repoRes.json();

  const starsRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/stargazers?per_page=100`,
    { headers },
  );
  if (!starsRes.ok)
    throw new Error(`stargazers fetch failed: ${starsRes.status}`);
  const stargazers = await starsRes.json();

  return {
    stars: repoData.stargazers_count ?? 0,
    stargazers: Array.isArray(stargazers) ? stargazers : [],
  };
}

export const load: PageServerLoad = async () => {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return { stars: cache.stars, stargazers: cache.stargazers };
  }

  try {
    const data = await fetchGitHubData();
    cache = { ...data, timestamp: now };
    return data;
  } catch (err) {
    console.error("github fetch failed:", err);
    // serve stale cache if we have one, otherwise empty state
    if (cache) return { stars: cache.stars, stargazers: cache.stargazers };
    return { stars: 0, stargazers: [] };
  }
};
