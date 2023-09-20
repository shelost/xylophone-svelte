
import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import adapter from '@sveltejs/adapter-auto';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			scss: {
				includePaths: ['src'],
			  },
		})
	],

	kit: {
        adapter: vercel(),
	}
};

export default config;
