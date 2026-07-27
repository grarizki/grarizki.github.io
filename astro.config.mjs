import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://grarizki.github.io/",
  integrations: [tailwind(), mdx(), sitemap(), icon()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "github-dark",
        light: "github-light",
      }
    },
  },
});
