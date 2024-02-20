<script lang="ts">
	import Board from './Board.svelte';
	import getAction from '../functions/getAction';
	import getNextCellStateOnMouseOver from '../functions/getNextCellStateOnMouseOver';

	// 0 == Left Click / 2 == Right Click / 1 == Middle Click
	type MouseDownType = {
		button: number;
		index: number;
	};

	// 1 == Left Click / 2 == Right Click / 4 == Middle Click
	type MouseOverType = {
		buttons: number;
		index: number;
	};

	// Setting up our variables based on the .non format for now (https://webpbn.com/export.cgi amongst many other possibilities)
	// 0 is a crossed cell / 1 is a full cell
	// We also use -1 to represent an empty cell in our code
	const width = 5;
	const height = 10;
	const hints = {
		rows: [[2], [2, 1], [1, 1], [3], [1, 1], [1, 1], [2], [1, 1], [1, 2], [2]],
		cols: [[2, 1], [2, 1, 3], [7], [1, 3], [2, 1]]
	};
	const solution = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
	// Initialising a one dimensionnal array to represent our empty board.
	let board = Array.from({ length: height * width }, () => -1);
	let startDragOn = 0;

	function handleMouseDown({ detail }: CustomEvent<MouseDownType>) {
		startDragOn = board[detail.index];
		// Convert our button press to our expected result in our custom .non format
		// Left Click get 1 / Right Click get 0 / Middle Click get -1
		let action = getAction('mousedown', detail.button);
		if (action != null) {
			board[detail.index] = action == board[detail.index] ? -1 : action;
		}
	}
	function handleMouseOver({ detail }: CustomEvent<MouseOverType>) {
		let action = getAction('mouseover', detail.buttons);
		board[detail.index] = getNextCellStateOnMouseOver(action, board[detail.index], startDragOn);
	}
</script>

<div class="container">
	<h1>Browser Picross</h1>
	<div class="board">
		<Board
			{height}
			{width}
			{board}
			{hints}
			on:mousedown={handleMouseDown}
			on:mouseover={handleMouseOver}
		/>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
	}
</style>
