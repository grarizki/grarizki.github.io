import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://grarizki.github.io/",
  integrations: [tailwind(), mdx(), icon()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "github-dark",
        light: "github-light",
      }
    },
  },
});
