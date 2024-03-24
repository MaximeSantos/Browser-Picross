<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	import Board from 'components/Board.svelte';
	import Modal from 'components/Modal.svelte';
	import SubmitPuzzleForm from 'components/SubmitPuzzleForm.svelte';

	let showModal = false;
	let height = 5;
	let width = 5;
	let board = Array.from({ length: height * width }, () => 0); // Initialising an array of values -1 to represent our empty board.
</script>

<h2>Admin Page</h2>

<div class="container">
	<!-- <div class="board-settings">
		<input type="number" bind:value={height} min="5" max="50" />
		<input type="number" bind:value={width} min="5" max="50" />
	</div> -->
	<Board bind:board {height} {width} />
	<button on:click={() => (showModal = true)}>Submit Picross</button>

	{#if form?.success}
		<p>{form.message}</p>
	{/if}
	{#if form?.error || form?.missing}
		<p>{form.message}</p>
	{/if}
</div>

<Modal bind:showModal>
	<SubmitPuzzleForm {board} {height} {width} />
</Modal>

<style>
	/* .board-settings {
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
	} */
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
</style>
