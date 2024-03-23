<script lang="ts">
	import { enhance } from '$app/forms';

	export let height: number;
	export let width: number;
	export let board: number[];
</script>

<form
	method="POST"
	use:enhance={({ formData }) => {
		formData.append('height', height.toString());
		formData.append('width', width.toString());
		formData.append('board', JSON.stringify(board));
	}}
>
	<div class="input-container">
		<label for="title">
			Title
			<input type="title" name="title" required aria-required="true" />
		</label>
		<label for="description">
			Description
			<input type="description" name="description" aria-required="false" />
		</label>
	</div>
	<div>
		<button type="submit">Confirm</button>
	</div>
</form>

<style>
	form,
	.input-container {
		display: flex;
		flex-direction: column;
	}
	form {
		align-items: center;
	}
	.input-container {
		align-items: flex-end;
	}
	button {
		margin-top: 2rem;
	}

	label {
		padding: 0.5rem;
	}
</style>
