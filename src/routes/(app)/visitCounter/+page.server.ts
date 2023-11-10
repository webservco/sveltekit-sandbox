/**
 * Implement a visit counter using cookies.
 *
 * https://learn.svelte.dev/tutorial/cookies
 */

export function load({ cookies }) {
  const cookieName = 'visitCounter';

  // Define
  let visitCounter = parseInt(cookies.get(cookieName) || '0');

  // Increment
  visitCounter += 1;

  // Save
  cookies.set(cookieName, visitCounter.toString(), { path: '/' });

  return {
    visitCounter
  };
}
