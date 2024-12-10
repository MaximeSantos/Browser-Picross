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
		<span>/</span>
		<a class="route" class:active={route === '/submit'} href="/submit">Submit</a>
		{#if isLoggedIn && isStaff}
			<span>/</span>
			<a class="route" class:active={route === '/admin'} href="/admin">Admin</a>
		{/if}
		<span>/</span>
		<a
			class="route"
			href="https://en.wikipedia.org/wiki/Nonogram#Solution_techniques"
			target="_blank">How to play</a
		>
	</nav>
	<h1><a href="/">Browser Picross</a></h1>
	<div class="right">
		{#if !isLoggedIn}
			<a class="route" class:active={route === '/login'} href="/login">Login</a>
			<span>/</span>
			<a class="route" class:active={route === '/register'} href="/register">Register</a>
		{/if}
		{#if isLoggedIn}
			<a class="route" href="/logout" data-sveltekit-reload>Logout</a>
			<span>/</span>
		{/if}
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
		margin: 1.5rem;
	}

	.left {
		display: flex;
		margin-left: 1rem;
	}

	.right {
		display: flex;
		flex-direction: row;
		margin-right: 1rem;
	}

	.active {
		text-decoration: underline;
	}

	h1 {
		margin: 0;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
