import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/v1/AUTH_bf54165fdce343acb5e9b289e67832d2/zoozooclub-frontend/",
  plugins: [react(), svgr()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
//
