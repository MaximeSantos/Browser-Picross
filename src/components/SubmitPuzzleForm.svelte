<script lang="ts">
</script>

<form method="POST">
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
