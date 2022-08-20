import preprocess from 'svelte-preprocess';
import { adapter } from 'sveltekit-adapter-aws';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		prerender: {
			default: true
		},
		adapter: adapter({
			artifactPath: 'build',
			autoDeploy: true,
			FQDN: 'monsterplaybook.rip',
			stackName: 'monster-of-the-week-ui'
		})
	}
};

export default config;
