<script lang="ts">
  import { enhance } from '$app/forms';

  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<h1>Sign in</h1>
<form method="post" use:enhance>
  <div class="card p-4 w-full text-token space-y-4">
    <label for="email">Email</label>
    <input class="input" name="email" id="email" /><br />

    <label for="password">Password</label>
    <input class="input" type="password" name="password" id="password" /><br />

    <button type="submit" class="btn btn-sm variant-filled-primary">Submit</button>
  </div>
</form>
{#if form?.message}
  <p class="text-error-500">{form.message}</p>
{/if}
<a href="/user/auth/signup">Create an account</a>
