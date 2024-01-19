import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';
import { defineConfig } from 'vite';

// Icons https://github.com/unplugin/unplugin-icons
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide',
    }),
    purgeCss(),
    Icons({
      compiler: 'svelte',
    }),
  ],
});
