import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: VitePWAOptions = {
  registerType: "prompt",
  includeAssets: ["vite.svg"],
  manifest: {
    name: "Bible reader appp",
    short_name: "bible-reader",
    description: "Bible reading plan for christians",
    icons: [
      {
        src: "/vite.svg",
        sizes: "192x192",
        type: "image/svg",
        purpose: "favicon",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "any",
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
