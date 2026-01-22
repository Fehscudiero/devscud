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
    // 1. Otimização de Imagens
    imagetools(),
    // 2. Compressão Gzip/Brotli para produção
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
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
    cssCodeSplit: true, // Mantém o CSS modular (melhor cache)

    // Voltamos para um limite seguro (4kb) para evitar inchar o JS com CSS/Imagens inline
    // Isso ajuda a evitar que o arquivo principal fique gigante
    assetsInlineLimit: 4096,

    // Aumenta o limite do aviso de tamanho para não poluir o terminal
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // A MÁGICA SEGURA (Evita que o site quebre):
        manualChunks(id) {
          // 1. SEGURANÇA MÁXIMA: Agrupa o Core do React junto.
          // Se separar react de react-dom, o site quebra.
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/scheduler")
          ) {
            return "react-core";
          }

          // 2. PERFORMANCE: Isola o Framer Motion (ele é muito pesado).
          // Carregando separado, o resto do site aparece antes.
          if (id.includes("node_modules/framer-motion")) {
            return "motion-engine";
          }

          // 3. PERFORMANCE: Isola o Swiper (Carrossel).
          if (
            id.includes("node_modules/swiper") ||
            id.includes("node_modules/dom7")
          ) {
            return "carousel-lib";
          }

          // 4. ÍCONES (Opcional, mas ajuda a organizar)
          if (id.includes("lucide-react")) {
            return "ui-icons";
          }

          // 5. O RESTO: Vai para o vendor genérico
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
