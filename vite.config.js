import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "${path.join(process.cwd(), "styles/_variables.scss")}" as *;
          @use "${path.join(process.cwd(), "styles/_mixins.scss")}" as *;
          @use "${path.join(process.cwd(), "styles/_global.scss")}" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      styles: path.resolve(__dirname, "./styles"),
    },
  },
  envPrefix: "PUBLIC_",
  server: {
    port: 3002,
    strictPort: true,
  },
});
