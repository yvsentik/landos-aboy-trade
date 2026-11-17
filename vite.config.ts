import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// SITE=agency – отдельная сборка сайта агентства в корне домена (build-agency/).
// Без переменной собирается сайт Обоитрейда, агентство в нём живёт в /agency/.
const agency = process.env.SITE === 'agency';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Статическая сборка в build/ для GitHub Pages
			adapter: adapter(agency ? { pages: 'build-agency', assets: 'build-agency', fallback: '404.html' } : { fallback: '404.html' }),
			files: agency ? { routes: 'src/routes/agency', appTemplate: 'src/app.agency.html' } : undefined,

			// На Pages без своего домена сайт живёт в /landos-aboy-trade.
			// BASE_PATH задаётся в GitHub Actions; локально пусто.
			paths: {
				base: (process.env.BASE_PATH ?? '') as '' | `/${string}`,
				relative: false
			}
		})
	]
});
