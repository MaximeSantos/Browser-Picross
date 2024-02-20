<script lang="ts">
	import Board from './Board.svelte';

	type MouseDownType = {
		button: number;
		index: number;
	};

	// Setting up our variables based on the .non format for now (https://webpbn.com/export.cgi amongst many other possibilities)
	const solution = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
	const height = 10;
	const width = 10;
	// Initialising a one dimensionnal array to represent our board.
	let board = Array.from({ length: height * width }, () => 3);
	let startDragOn = 0;

	// TODO -- Use startDragonOn to improve the ability to drag
	// Right now it goes over anything -- we need to add some boundaries
	// Probably get rid of the ternaries
	function handleMouseDown({ detail }: CustomEvent<MouseDownType>) {
		switch (detail.button) {
			// Left click
			case 0:
				board[detail.index] = board[detail.index] == 1 ? 3 : 1;
				startDragOn = 1;
				break;
			// Middle Click
			case 1:
				board[detail.index] = 3;
				startDragOn = 3;
				break;
			// Right Click
			case 2:
				board[detail.index] = board[detail.index] == 0 ? 3 : 0;
				startDragOn = 0;
				break;
			// Everything else
			default:
				break;
		}
	}
	function handleMouseOver({ detail }: CustomEvent) {
		switch (detail.e.buttons) {
			// Left click
			case 1:
				board[detail.index] = board[detail.index] == 1 ? 3 : 1;
				break;
			// Right Click
			case 2:
				board[detail.index] = board[detail.index] == 0 ? 3 : 0;
				break;
			// Middle Click
			case 4:
				board[detail.index] = 3;
				break;
			// Everything else
			default:
				break;
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
