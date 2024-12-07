import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true, // Vẫn bật source map cho mã của bạn
    },
    optimizeDeps: {
        esbuildOptions: {
            sourcemap: false, // Tắt source map cho dependencies
        },
    },
});
