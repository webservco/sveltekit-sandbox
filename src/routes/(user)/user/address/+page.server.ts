import { databaseConnectionPool, getDatabaseError } from '$lib/server/storage/mysql2';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

const userSchema = z.object({
  //id: z.string().min(1),
  name: z.string().min(3).max(35).includes('Test', { message: 'Missing the secret stuff' }),
  email: z.string().email().min(6).max(50),
});

export const load = async () => {
  // Server API:
  const form = await superValidate(userSchema);

  // Unless you throw, always return { form } in load and form actions.
  return { form };
};

/**
 * Handle form data, FORM style.
 */
export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, userSchema);

    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data
    try {
      const [rows, fields] = await databaseConnectionPool.execute(
        "INSERT INTO db.address (name, email) VALUES (?, ?)",
        [form.data.name, form.data.email]
      );
      console.log('rows', rows);
      console.log('fields', fields);
      /* Success:
      rows ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 0
      }
      fields undefined
       */
    } catch (exception: unknown) {
      console.log('Exception: %o', exception);
      const databaseError = getDatabaseError(exception);
      console.log('databaseError: %o', databaseError);
      return setError(form, 'name', databaseError.message);
    }

    // Yep, return { form } here too
    return { form };
  },
};
