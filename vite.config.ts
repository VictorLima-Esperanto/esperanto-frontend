import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/stores": path.resolve(__dirname, "src/stores"),
      "@/contexts": path.resolve(__dirname, "src/contexts"),
      "@/services": path.resolve(__dirname, "src/services"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/config": path.resolve(__dirname, "src/config")
    }
  }
})
