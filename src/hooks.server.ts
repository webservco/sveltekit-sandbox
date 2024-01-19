import { auth } from '$lib/server/auth/lucia';
import { sourceLanguageTag } from '$paraglide/runtime';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const lang = event.params.lang ?? sourceLanguageTag;

  // we can pass `event` because we used the SvelteKit middleware
  event.locals.auth = auth.handleRequest(event);
  return await resolve(event, {
    transformPageChunk({ done, html }) {
      //Only do it at the very end of the rendering process
      if (done) {
        return html.replace('%lang%', lang);
      }
    },
  });
};
