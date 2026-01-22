import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Plugins para Performance
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
    // 1. CORREÇÃO: Ativando o PurgeCSS para limpar CSS inútil
    purgeCss({
      content: [`./src/**/*.tsx`, `./index.html`],
      safelist: {
        standard: [/active$/, /open$/, /visible$/], // Mantém classes dinâmicas
      },
    }),
    // 2. Compressão máxima para Mobile
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 512, // Comprime até arquivos menores
    }),
    imagetools(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 3. Upgrade para navegadores modernos (melhora performance mobile)
    target: "esnext",
    minify: "esbuild",
    cssMinify: true, // Garante minificação agressiva de CSS
    cssCodeSplit: true, // Divide o CSS por página/componente
    assetsInlineLimit: 4096, // Não deixa arquivos muito grandes "sujarem" o JS
    rollupOptions: {
      output: {
        // 4. ESTRATÉGIA GRANULAR: Evita um único vendor.css gigante que bloqueia a tela
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("swiper")) return "carousel";
            return "vendor";
          }
        },
      },
    },
  },
});
