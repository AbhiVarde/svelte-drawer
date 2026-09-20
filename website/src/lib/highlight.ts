import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

let instance: ReturnType<typeof createHighlighterCore> | undefined;

function getHighlighter() {
  instance ??= createHighlighterCore({
    themes: [
      import("@shikijs/themes/github-light"),
      import("@shikijs/themes/github-dark"),
    ],
    langs: [import("@shikijs/langs/svelte"), import("@shikijs/langs/bash")],
    engine: createJavaScriptRegexEngine(),
  });
  return instance;
}

export async function highlight(code: string, lang: "svelte" | "bash") {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
