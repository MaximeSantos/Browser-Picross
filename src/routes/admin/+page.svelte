<script lang="ts">
	import Board from 'components/Board.svelte';
	import Modal from 'components/Modal.svelte';
	import SubmitPuzzleForm from 'components/SubmitPuzzleForm.svelte';

	let showModal = false;
	let height = 5;
	let width = 5;
	// Initialising a one dimensionnal array with values -1 to represent our empty board.
	let board = Array.from({ length: height * width }, () => -1);

	const isWon = false;
</script>

<h2>Admin Page</h2>

<div class="container">
	<!-- <div class="board-settings">
		<input type="number" bind:value={height} min="5" max="50" />
		<input type="number" bind:value={width} min="5" max="50" />
	</div> -->
	<Board bind:board {height} {width} {isWon} />
	<button on:click={() => (showModal = true)}>Submit Picross</button>
</div>

<Modal bind:showModal>
	<SubmitPuzzleForm />
</Modal>

<style>
	/* .board-settings {
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
	} */
	button {
		margin-top: 2rem;
	}
</style>
