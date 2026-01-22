import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import path from "path";

// Plugins de Performance

import { imagetools } from "vite-imagetools";

import compression from "vite-plugin-compression";

export default defineConfig({
  server: {
    host: "localhost",

    port: 3000,

    open: true,
  },

  plugins: [
    react(),

    // 1. Geração de imagens responsivas (essencial para LCP mobile)

    imagetools(),

    // 2. Compressão máxima Brotli para redes 4G lentas

    compression({
      algorithm: "brotliCompress",

      ext: ".br",

      threshold: 512, // Comprime até arquivos menores para garantir leveza
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: "esnext",

    minify: "esbuild",

    cssCodeSplit: true,

    // 3. ESTRATÉGIA PARA NOTA 100:

    // Aumentamos para 15kb para embutir o CSS inicial direto no index.html.

    // Isso elimina o aviso "Renderizar solicitações de bloqueio" do PageSpeed.

    assetsInlineLimit: 15360,

    rollupOptions: {
      output: {
        // 4. Divisão granular para evitar um "vendor.js" gigante que trava a thread principal

        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "motion-engine";

            if (id.includes("lucide-react")) return "icons";

            if (id.includes("swiper") || id.includes("dom7")) return "carousel";

            return "vendor";
          }
        },
      },
    },
  },
});
