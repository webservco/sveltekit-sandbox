<!--
Tutorial: API routes / GET handlers
https://learn.svelte.dev/tutorial/get-handlers
-->
<script lang="ts">
  let number: number;

  async function roll() {
    const response = await fetch('/dice/roll');

    number = await response.json();
  }
</script>

<button class="btn variant-filled" on:click={roll}>Roll the dice</button>

{#if number !== undefined}
  <p>You rolled a <strong>{number}</strong>.</p>
{/if}
