<script lang="ts">
	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';
	import resetBoard from '$lib/functions/resetBoard';
	import Board from 'components/Board.svelte';

	export let form: ActionData;

	let height = 5;
	let width = 5;
	let board = resetBoard(height, width); // Initialising an array of values -1 to represent our empty board.

	// TODO: User can spam submit to submit the same puzzle multiple time
	// TODO: Prevent submitting multiple puzzles with the same name
</script>

<h2>Submit your puzzle</h2>

<div class="container">
	<!-- <div class="board-settings">
		<input type="number" bind:value={height} min="5" max="50" />
		<input type="number" bind:value={width} min="5" max="50" />
	</div> -->
	<Board bind:board {height} {width} />

	<form
		method="POST"
		use:enhance={({ formData }) => {
			formData.append('height', height.toString());
			formData.append('width', width.toString());
			formData.append('board', JSON.stringify(board));

			return async ({ result, update }) => {
				if (result.type === 'success') {
					board = resetBoard(height, width);
					update();
				} else if (result.type === 'failure' || result.type === 'error') {
				}
			};
		}}
	>
		<div class="input-container">
			<input type="title" name="title" required aria-required="true" placeholder="Title" />
			<input
				type="description"
				name="description"
				aria-required="false"
				placeholder="Description"
			/>
		</div>
		<div class="button-container">
			<button type="reset" on:click={() => (board = resetBoard(height, width))}>Reset</button>
			<button type="submit">Submit Puzzle</button>
		</div>
	</form>

	{#if form?.success}
		<p>{form.message}</p>
	{/if}
	{#if form?.error || form?.missing}
		<p>{form.message}</p>
	{/if}
</div>

<!-- <Modal bind:showModal> -->
<!-- 	<SubmitPuzzleForm {board} {height} {width} /> -->
<!-- </Modal> -->

<style>
	button {
		margin: 1rem;
		padding: 0.4rem 0.5rem;
		border: 1px solid var(--border-light);
		border-radius: 0.2rem;
	}
	button:hover {
		background-color: var(--border-light);
		text-decoration: none;
	}

	form,
	.input-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		margin: 0.5rem;
	}

	.button-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
	}

	button {
		margin: 0;
		margin-bottom: 1rem;
	}
</style>
