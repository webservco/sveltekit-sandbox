<script lang="ts">
  import type { PageData } from './$types';

  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

  import { superForm } from 'sveltekit-superforms/client';

  export let data: PageData;

  // Client API:
  const { form, enhance, errors, constraints } = superForm(data.form);
</script>

<form method="POST" use:enhance>
  <div class="card p-4 w-full text-token space-y-4">
    <label for="name">Name</label>
    <input
      class="input {$errors.name ? 'input-error' : ''}"
      type="text"
      id="name"
      name="name"
      placeholder="Name"
      required
      aria-invalid={$errors.name ? 'true' : undefined}
      bind:value={$form.name}
      {...$constraints.name}
    />
    {#if $errors.name}
        <span class="text-error-500">{$errors.name}</span>
    {/if}

    <label for="email">Email</label>
    <input
    class="input {$errors.email ? 'input-error' : ''}"
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      required
      aria-invalid={$errors.email ? 'true' : undefined}
      bind:value={$form.email}
      {...$constraints.email}
    />
    {#if $errors.email}
        <span class="text-error-500">{$errors.email}</span>
    {/if}

    <button type="submit" class="btn btn-sm variant-filled-primary">Submit</button>
  </div>
</form>

<hr />

<SuperDebug data={$form} />
