<script lang="ts">
  import { enhance } from '$app/forms';

  // Prevent lint "not defined" error
  import type UserProfile from '$lib/types/ambient';

  export let data: UserProfile;
</script>

<h1>Profile</h1>
<p>User id: {data.userId}</p>
<p>Email: {data.email}</p>
<form method="post" action="?/logout" use:enhance>
  <input class="btn btn-sm variant-filled-primary" type="submit" value="Sign out" />
</form>
