<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h2>Login</h2>
<p>You will need to login in order to submit your own puzzle.</p>
<p>No account yet ? <a href="/register">Sign up here.</a></p>

<form method="POST">
	<div class="input-container">
		<input
			type="text"
			name="emailOrUsername"
			required
			aria-required="true"
			placeholder="Email or username"
		/>
		<input type="password" name="password" required aria-required="true" placeholder="Password" />
	</div>
	<button type="submit">Confirm</button>
	{#if form?.success}
		<p>{form.message}</p>
	{/if}
	{#if form?.error}
		<p>{form.message}</p>
	{/if}
</form>

<style>
	.input-container,
	form {
		display: flex;
		flex-direction: column;
	}
	form {
		align-items: center;
	}
	.input-container {
		margin: 1rem;
		align-items: flex-end;
	}
	input {
		margin: 0.5rem;
	}
	button {
		margin-bottom: 1rem;
	}

	a {
		font-size: 1.2rem;
	}
</style>
