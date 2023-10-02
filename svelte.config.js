
import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import adapter from '@sveltejs/adapter-auto';
const isSubdomain = process.env.VERCEL_URL.includes('studio');


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
		paths: {
			base: isSubdomain ? '/app' : '',
			assets: isSubdomain ? '/app' : ''
		  },
	}
};

export default config;
