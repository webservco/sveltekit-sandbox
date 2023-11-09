<script lang="ts">
	import { appVersion } from '$lib/appVersion';
	import '../../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppShell, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Skeleton UI (YT tutorial)
	import { AppBar, storeHighlightJs } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	storeHighlightJs.set(hljs);

	// Theme mode switch
	import { LightSwitch } from '@skeletonlabs/skeleton';

	// Navigation
	import Navigation from '$lib/navigation/Navigation.svelte';

	// Drawer Component
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	initializeStores();
	const drawerStore = getDrawerStore();
	function drawerOpen(): void {
		drawerStore.open({});
	}

	// Selectively Disable the Sidebar
	import { page } from '$app/stores';

	$: classesSidebar = $page.url.pathname === '/' ? 'w-0 md:w-64' : 'w-0';
</script>

<!-- [How to implement a responsive sidebar drawer](https://www.skeleton.dev/blog/how-to-implement-a-responsive-sidebar-drawer) -->
<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navigation />
</Drawer>

<!-- https://www.skeleton.dev/components/app-shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 {classesSidebar}">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<a href="/"><strong class="text-xl uppercase">Sandbox</strong></a>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
			<!--
			<svelte:fragment slot="headline">(headline)</svelte:fragment>
			-->
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<!-- +page.svelte is rendered in this <slot> -->
	<slot />

</AppShell>
