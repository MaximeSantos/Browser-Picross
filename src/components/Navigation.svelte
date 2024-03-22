<script lang="ts">
	export let isLoggedIn: boolean;
	export let isStaff: boolean;
</script>

<nav>
	{#if isLoggedIn}
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
	}
	a {
		padding-left: 2rem;
	}
</style>
