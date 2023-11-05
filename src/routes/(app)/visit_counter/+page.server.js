/**
 * Implement a visit counter using cookies.
 *
 * https://learn.svelte.dev/tutorial/cookies
 */

export function load({ cookies }) {
	const cookie_name = 'visit_counter';

	// Define
	let visit_counter = parseInt(cookies.get(cookie_name) || '0');

	// Increment
	visit_counter += 1;

	// Save
	cookies.set(cookie_name, visit_counter.toString(), { path: '/' });

	return {
		visit_counter
	};
}
