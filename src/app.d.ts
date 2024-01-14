import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="lucia" />
declare global {
  namespace App {
    interface Locals {
      auth: import('lucia').AuthRequest;
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
  }

  namespace Lucia {
    type Auth = import('$lib/server/auth/lucia').Auth;
    type DatabaseUserAttributes = {
      email: string;
    };
    type DatabaseSessionAttributes = {};
  }
}

// THIS IS IMPORTANT!!!
export {};
