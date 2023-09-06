import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
    build: {
        esbuild: {
          target: '0.16.17'
        }
      }
};

export default config;