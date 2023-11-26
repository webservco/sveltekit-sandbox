<script lang="ts">

import type { NoteInput } from "../../app";
import { addNote } from "./NoteStore";

let formData: NoteInput = {
    title: '',
    language: 'Plaintext',
    description: '',
  };

</script>

<div class="card p-4 w-full text-token space-y-4">
    <label class="label">
      <span>Title</span>
      <input class="input" type="text" placeholder="title.." bind:value={formData.title} />
    </label>

    <label class="label">
      <span>Language</span>
      <select class="select" bind:value={formData.language}>
        <option value="Bash">Bash</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
        <option value="JSON">JSON</option>
        <option value="HTML">HTML</option>
        <option value="Markdown">Markdown</option>
        <option value="PHP">PHP</option>
        <option value="Plaintext">Plaintext</option>
        <option value="Shell">Shell</option>
      </select>
    </label>

    <label class="label">
      <span>Description</span>
      <textarea
        class="textarea"
        rows="4"
        placeholder="description.."
        bind:value={formData.description}
      />
    </label>

    <button
      type="button"
      class="btn btn-sm variant-filled-primary"
      on:click={() => addNote(formData)}
    >
      Save
    </button>
  </div>
