import { databaseConnectionPool } from '$lib/server/storage/mysql2';
import { dev } from '$app/environment';
import { lucia } from 'lucia';
import { mysql2 } from '@lucia-auth/adapter-mysql';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
  adapter: mysql2(databaseConnectionPool, {
    user: 'auth_user',
    key: 'auth_user_key',
    session: 'auth_user_session',
  }),
  env: dev ? 'DEV' : 'PROD',
  getUserAttributes: (data) => {
    return {
      email: data.email,
    };
  },
  middleware: sveltekit(),
});

export type Auth = typeof auth;
