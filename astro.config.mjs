import { defineConfig } from "astro/config";
import icon from "astro-icon";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://grarizki.github.io/",
  integrations: [icon(), react()],
  build: {
    // inline all CSS into HTML: removes render-blocking stylesheet round-trip (FCP win)
    inlineStylesheets: "always",
  },
  markdown: {
    shikiConfig: {
      themes: {
        dark: "github-dark",
        light: "github-light",
      }
    },
  },
});
