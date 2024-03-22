<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h2>Login</h2>
<form method="POST">
	<div class="input-container">
		<label for="email">
			EMAIL
			<input type="email" name="email" required aria-required="true" />
		</label>
		<label for="password">
			PASSWORD
			<input type="password" name="password" required aria-required="true" />
		</label>
	</div>
	<button type="submit">Login</button>
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
</style>
