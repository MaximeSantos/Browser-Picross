<script lang="ts">
	export let isLoggedIn: boolean;
	export let isStaff: boolean;
	export let username: string = '';
</script>

<nav>
	{#if isLoggedIn}
		{#if username}
			<p>Hello {username} :</p>
		{/if}
		{#if isStaff}
			<a href="/admin">Admin</a>
		{/if}
		<a href="/logout" data-sveltekit-reload>Logout</a>
	{:else}
		<a href="/login">Login</a>
	{/if}
</nav>

<style>
	nav {
		margin-right: 2dvw;
		margin-left: auto;
		display: flex;
		align-items: center;
	}
	a {
		margin-left: 2rem;
		padding: 0.4rem 0.5rem;
		border: 1px solid var(--border-light);
		border-radius: 0.2rem;
		background-color: var(--light-dark);
	}
	a:hover {
		background-color: var(--border-light);
		text-decoration: none;
	}
</style>
