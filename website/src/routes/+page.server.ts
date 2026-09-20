import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";

const GITHUB_REPO = "AbhiVarde/svelte-drawer";
const CACHE_DURATION = 60 * 60 * 1000;

let cache: { stars: number; stargazers: any[]; timestamp: number } | null =
  null;

async function ghFetch(url: string) {
  const base = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (env.GITHUB_TOKEN) {
    const res = await fetch(url, {
      headers: { ...base, Authorization: `Bearer ${env.GITHUB_TOKEN}` },
    });
    if (res.status !== 401) return res;
  }

  return fetch(url, { headers: base });
}

async function fetchGitHubData() {
  const repoRes = await ghFetch(`https://api.github.com/repos/${GITHUB_REPO}`);
  if (!repoRes.ok) throw new Error(`repo fetch failed: ${repoRes.status}`);
  const repoData = await repoRes.json();

  const starsRes = await ghFetch(
    `https://api.github.com/repos/${GITHUB_REPO}/stargazers?per_page=100`,
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
    if (cache) return { stars: cache.stars, stargazers: cache.stargazers };
    return { stars: 0, stargazers: [] };
  }
};
