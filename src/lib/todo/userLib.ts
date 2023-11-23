/**
 * User library.
 */

import type { Cookies } from '@sveltejs/kit';

const userIdCookieName = 'userId';

export function getUserId(cookies: Cookies): string {
  let userId = cookies.get(userIdCookieName);
  if (!userId) {
    userId = generateId();
    setUserIdCookie(cookies, userId);
  }

  return userId;
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function setUserIdCookie(cookies: Cookies, userId: string) {
  cookies.set(userIdCookieName, userId, { path: '/' });
}
