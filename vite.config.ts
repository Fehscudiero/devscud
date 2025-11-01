import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Plugins adicionados
import { imagetools } from "vite-imagetools";
import purgeCss from "vite-plugin-purgecss";
import compression from "vite-plugin-compression";

export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  plugins: [
    react(),
    // Compressão Brotli para reduzir tamanho dos arquivos
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
    // Remoção de CSS não utilizado

    // Geração de imagens otimizadas e responsivas
    imagetools(),
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
