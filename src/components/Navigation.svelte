<script lang="ts">
	import type { LayoutRouteId } from '../routes/$types';

	export let isLoggedIn: boolean;
	export let isStaff: boolean;
	export let username: string = '';
	export let route: LayoutRouteId;
</script>

<div class="nav-container">
	<nav>
		<a class="route" class:active={route === '/'} href="/">Home</a>
		{#if isLoggedIn && isStaff}
			<span>/</span>
			<a class="route" class:active={route === '/admin'} href="/admin">Admin</a>
		{/if}
		{#if isLoggedIn}
			<span>/</span>
			<a class="route" href="/logout" data-sveltekit-reload>Logout</a>
		{:else}
			<span>/</span>
			<a class="route" href="/login">Login</a>
		{/if}
	</nav>
	<div class="container">
		{#if isLoggedIn && username}
			<p>Hello {username}</p>
		{/if}
	</div>
</div>

<style>
	nav {
		display: flex;
		align-items: center;
		margin-left: 1rem;
	}

	span,
	p {
		margin: 0 1rem;
	}

	.nav-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.container {
		flex-direction: row;
		margin-right: 1rem;
	}

	.active {
		text-decoration: underline;
	}
</style>
