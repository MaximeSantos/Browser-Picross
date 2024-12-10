<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h2>Register</h2>
<p>You need to be registered in order to submit your own puzzles.</p>
<p>In the future, this will allow your progression to be saved too.</p>
<em>For this version of the website, you don't need an email to register, a username will do.</em>

<form method="POST">
	<div class="input-container">
		<!-- TODO handle the TS error properly. It seems to be what SK docs recommends https://svelte.dev/docs/kit/form-actions -- Probably need to custom type it-->
		<input type="text" name="userName" placeholder="Username" value={form?.userName ?? ''} />
		<input type="email" name="email" placeholder="Email" value={form?.email ?? ''} />
		<input
			type="password"
			minlength="8"
			name="password"
			required
			aria-required="true"
			placeholder="Password"
		/>
		<input
			type="password"
			minlength="8"
			name="passwordConfirm"
			required
			aria-required="true"
			placeholder="Confirm password"
		/>
	</div>
	<button type="submit">Confirm</button>
	{#if form?.success}
		<p>{form.message}</p>
	{/if}
	{#if form?.error || form?.missing}
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
	em {
		margin-top: 1.2rem;
	}
</style>
