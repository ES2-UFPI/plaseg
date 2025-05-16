import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@": "/src",
		},
	},
	plugins: [react(), tailwind()],
});
