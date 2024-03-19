<script lang="ts">
	export let isLoggedIn: boolean;
</script>

<nav>
	<a href="/admin">Admin</a>
	{#if isLoggedIn}
		<a href="/logout" data-sveltekit-reload>Logout</a>
	{:else}
		<a href="/login">Login</a>
	{/if}
</nav>
