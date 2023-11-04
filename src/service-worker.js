/**
 * Service worker (svelte).
 *
 * Inspired from:
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers
 * https://kit.svelte.dev/docs/service-workers
 *
 * Important: in order to prevent type errors (vscode and svelte-check),
 * make sure file is in `src/service-worker.js` and not `src/service-worker/index.js`
 *
 * https://kit.svelte.dev/docs/service-workers#type-safety
 */

/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

import { build, files, version } from '$service-worker';

const APP_CACHE_NAME = `hrdr-${version}`;

const APP_STATIC_ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

/**
 * Saving the cache on PWA installation
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers#saving_the_cache_on_pwa_installation
 * Install event only triggers once.
 */
sw.addEventListener('install', (event) => {
	console.log('[Service Worker] install event');

	event.waitUntil(
		(async () => {
			const cache = await caches.open(APP_CACHE_NAME);
			console.log('[Service Worker] Caching all.');
			// Note: with addAll, if one fails, all are discarded.
			return cache.addAll(APP_STATIC_ASSETS);
		})()
	);
});

/**
 * Updating the PWA and deleting old caches
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers#updating_the_pwa_and_deleting_old_caches
 */
sw.addEventListener('activate', (event) => {
	console.log('[Service Worker] activate event');

	event.waitUntil(
		(async () => {
			const names = await caches.keys();
			await Promise.all(
				names.map((name) => {
					if (name !== APP_CACHE_NAME) {
						return caches.delete(name);
					}
				})
			);
			// Seems this (from Firefox) is discouraged (by Google):
			await sw.clients.claim();
		})()
	);
});

/**
 * Intercept requests
 *
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers#the_fetch_event
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/App_structure
 * This part implemented from: https://kit.svelte.dev/docs/service-workers
 */
sw.addEventListener('fetch', (event) => {
	console.log(`[Service Worker] fetch event: ${event.request.url}`);

	// ignore POST requests etc
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(APP_CACHE_NAME);

		// `build`/`files` can always be served from the cache
		if (APP_STATIC_ASSETS.includes(url.pathname)) {
			return cache.match(url.pathname);
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			return cache.match(event.request);
		}
	}

	event.respondWith(respond());
});
