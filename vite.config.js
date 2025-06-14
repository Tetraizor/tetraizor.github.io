import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/styles/index.scss";`,
      },
    },
  },
  envPrefix: "PUBLIC_",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3002,
    strictPort: true,
  },
});
