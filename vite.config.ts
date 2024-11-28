import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		cors: {
			origin: process.env.VITE_ALLOWED_ORIGIN,
			methods: ['GET'],
			allowedHeaders: ['Content-Type'],
			credentials: true
		}
	}
});
