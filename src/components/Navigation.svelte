<script lang="ts">
	export let isLoggedIn: boolean;
	export let isStaff: boolean;
	export let username: string = '';
</script>

<div class="nav-container">
	<nav>
		<a class="route" href="/">Home</a>
		<span>/</span>
		{#if isLoggedIn && isStaff}
			<a class="route" href="/admin">Admin</a>
		{/if}
	</nav>
	<div class="container">
		{#if isLoggedIn}
			{#if username}
				<p>Hello {username} :</p>
			{/if}
			<a class="login-logout" href="/logout" data-sveltekit-reload>Logout</a>
		{:else}
			<a class="login-logout" href="/login">Login</a>
		{/if}
	</div>
</div>

<style>
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
	nav {
		display: flex;
		align-items: center;
		margin-left: 1rem;
	}
	.login-logout {
		margin-left: 2rem;
		padding: 0.4rem 0.5rem;
		border: 1px solid var(--border-light);
		border-radius: 0.2rem;
		background-color: var(--light-dark);
	}
	.login-logout:hover {
		background-color: var(--border-light);
		text-decoration: none;
	}

	span {
		margin: 0 1rem;
	}
</style>
