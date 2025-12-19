// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward /api/* to backend
      "/api": {
        target: "http://127.0.0.1:5001", // backend url
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
