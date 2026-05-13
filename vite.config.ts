import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/traveler-api": {
        target: "https://influenttraveler.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/traveler-api/, ""),
      },
      "/glamour-api": {
        target: "https://influentglamour.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/glamour-api/, ""),
      },
    },
  },
});
