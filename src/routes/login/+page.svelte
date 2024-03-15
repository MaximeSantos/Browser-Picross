<script lang="ts">
	import { page } from '$app/stores';
</script>

<h2>Login Admin</h2>
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
</form>
<h2>{$page.status >= 400 ? 'Error, please try again.' : ''}</h2>

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
