import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Статическая сборка в build/ для GitHub Pages
			adapter: adapter({ fallback: '404.html' }),

			// На Pages без своего домена сайт живёт в /landos-aboy-trade.
			// BASE_PATH задаётся в GitHub Actions; локально пусто.
			paths: {
				base: (process.env.BASE_PATH ?? '') as '' | `/${string}`,
				relative: false
			}
		})
	]
});
