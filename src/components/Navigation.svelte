<script lang="ts">
	import type { LayoutRouteId } from '../routes/$types';

	export let isLoggedIn: boolean;
	export let isStaff: boolean;
	export let username: string = '';
	export let route: LayoutRouteId;
</script>

<div class="header">
	<nav class="left">
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
	<div>
		<h1><a href="/">Browser Picross</a></h1>
	</div>
	<div class="right">
		{#if isLoggedIn && username}
			<p>Hello {username}</p>
		{/if}
	</div>
</div>

<style>
	span,
	p {
		margin: 0 1rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding-bottom: 2rem;
	}

	.left {
		display: flex;
		margin-left: 1rem;
	}

	.right {
		margin-right: 1rem;
	}

	.active {
		text-decoration: underline;
	}

	h1 {
		margin: 0;
	}
</style>
