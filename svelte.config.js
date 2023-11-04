import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	/**
	 * Content Security Policy configuration.
	 * "prevent scripts loading from external sites"
	 * https://kit.svelte.dev/docs/configuration#csp
	 */
	csp: {
		directives: {
			'script-src': ['self']
		},
		reportOnly: {
			'script-src': ['self']
		}
	},

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// https://kit.svelte.dev/docs/adapter-node
		adapter: adapter()
	}
};

export default config;
