import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Windicss from 'vite-plugin-windicss';

const config: UserConfig = {
	plugins: [sveltekit(), Windicss({ transformCSS: 'pre' })]
};

export default config;
