import { auth } from '$lib/server/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';

import { getDatabaseError } from '$lib/server/storage/mysql2';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, '/user/auth');
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    // basic check
    if (typeof email !== 'string' || email.length < 4 || email.length > 31) {
      return fail(400, {
        message: 'Invalid email',
      });
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password',
      });
    }
    try {
      const user = await auth.createUser({
        key: {
          providerId: 'email', // auth method
          providerUserId: email.toLowerCase(), // unique id when using "email" auth method
          password, // hashed by Lucia
        },
        attributes: {
          email,
        },
      });
      console.log(user);

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      locals.auth.setSession(session); // set session cookie
    } catch (e) {
      // this part depends on the database you're using
      // check for unique constraint error in user table
      const databaseError = getDatabaseError(e);

      console.log(e);
      console.log(databaseError);

      if (databaseError.code === 'ER_DUP_ENTRY') {
        return fail(400, {
          message: 'email already taken',
        });
      }

      if (databaseError.message !== '') {
        return fail(400, {
          message: databaseError.message,
        });
      }
      return fail(500, {
        message: 'An unknown error occurred',
      });
    }
    // redirect to
    // make sure you don't throw inside a try/catch block!
    throw redirect(302, '/user/auth');
  },
};
