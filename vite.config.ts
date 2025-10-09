import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Plugins adicionados
import viteImagemin from "vite-plugin-imagemin";
import purgeCss from "vite-plugin-purgecss";
import compression from "vite-plugin-compression";

export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
  },
  plugins: [
    react(),
    // Compressão Brotli para reduzir tamanho dos arquivos
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
    // Otimização de imagens
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      svgo: {
        plugins: [
          { name: "removeViewBox" },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
    }),
    // Remoção de CSS não utilizado
    purgeCss({
      content: ["./index.html", "./src/**/*.{ts,tsx}"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2015",
    minify: "esbuild",
    sourcemap: false,
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
