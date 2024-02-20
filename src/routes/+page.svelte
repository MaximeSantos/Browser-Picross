<script lang="ts">
	import Board from './Board.svelte';

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
	const solution = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
	const height = 10;
	const width = 10;
	// Initialising a one dimensionnal array to represent our empty board.
	let board = Array.from({ length: height * width }, () => -1);
	let startDragOn = 0;

	function handleMouseDown({ detail }: CustomEvent<MouseDownType>) {
		startDragOn = board[detail.index];
		switch (detail.button) {
			// Left click
			case 0:
				board[detail.index] = board[detail.index] == 1 ? -1 : 1;
				break;
			// Middle Click
			case 1:
				board[detail.index] = -1;
				break;
			// Right Click
			case 2:
				board[detail.index] = board[detail.index] == 0 ? -1 : 0;
				break;
			// Everything else
			default:
				break;
		}
	}
	function handleMouseOver({ detail }: CustomEvent<MouseOverType>) {
		const curCell = board[detail.index];
		// Convert our button press to our expected result in our custom .non format
		// Left Click get 1 / Right Click get 0 / Middle Click get -1
		let action =
			detail.buttons == 1 ? 1 : detail.buttons == 2 ? 0 : detail.buttons == 4 ? -1 : null;

		// Now we check if we go to delete or write mode :
		if (action != null) {
			if (action == startDragOn) {
				// Delete mode : we only execute on cells of the same type as startDragOn, our output is alway -1
				if (curCell == startDragOn) {
					board[detail.index] = -1;
				}
			} else {
				// Write mode : we only execute on cells different from our action, our output is always our action
				if (curCell != action) {
					board[detail.index] = action;
				}
			}
		}
	}
</script>

<div class="container">
	<h1>Browser Picross</h1>
	<div class="board">
		<Board {height} {width} {board} on:mousedown={handleMouseDown} on:mouseover={handleMouseOver} />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
	}

	.board {
		margin: 2rem;
	}
</style>
