<script lang="ts">
	import type { MouseDownType, MouseOverType } from '$lib/types/types';
	import type { PageData } from './$types';

	import Board from 'components/Board.svelte';

	import checkWinCondition from '$lib/functions/checkWinCondition';
	import getAction from '$lib/functions/getAction';
	import getNextCellStateOnMouseOver from '$lib/functions/getNextCellStateOnMouseOver';

	export let data: PageData;

	// Setting up our variables based on the .non format for now (https://webpbn.com/export.cgi amongst many other possibilities)
	// -1 is an empty cell / 0 is a crossed cell / 1 is a full cell
	const width = data.puzzle.width;
	const height = data.puzzle.height;
	const hints = {
		rows: data.puzzle.rows,
		cols: data.puzzle.columns
	};
	const solution = data.puzzle.solution;
	// Initialising a one dimensionnal array to represent our empty board.
	let board = Array.from({ length: height * width }, () => -1);
	let startDragOn = 0;
	let isWon = false;

	$: if (checkWinCondition(board, solution)) {
		isWon = true;
	} else {
		isWon = false;
	}

	function handleMouseDown({ detail }: CustomEvent<MouseDownType>) {
		if (!isWon) {
			startDragOn = board[detail.index];
			// Convert our button press to our expected result in our custom .non format
			// Left Click get 1 / Right Click get 0 / Middle Click get -1
			let action = getAction('mousedown', detail.button);
			if (action != null) {
				board[detail.index] = action == board[detail.index] ? -1 : action;
			}
		}
	}
	function handleMouseOver({ detail }: CustomEvent<MouseOverType>) {
		if (!isWon) {
			let action = getAction('mouseover', detail.buttons);
			board[detail.index] = getNextCellStateOnMouseOver(action, board[detail.index], startDragOn);
		}
	}
</script>

<div class="container">
	<h1>{isWon ? 'You won !' : 'Browser Picross'}</h1>
	<div class="board">
		{#await data.puzzle}
			<p>Loading ...</p>
		{:then puzzle}
			<Board
				{height}
				{width}
				{board}
				{hints}
				on:mousedown={handleMouseDown}
				on:mouseover={handleMouseOver}
			/>
		{:catch error}
			<p>Oups, erreur</p>
		{/await}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
	}
</style>
