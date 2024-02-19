<script>
	import Board from './Board.svelte';

	// Setting up our variables based on the .non format for now (https://webpbn.com/export.cgi amongst many other possibilities)
	const solution = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
	const height = 10;
	const width = 10;
	// Initialising a one dimensionnal array to represent our board.
	let board = Array.from({ length: height * width }, () => 3);
</script>

<h1>Browser Picross</h1>
<div class="board">
	<Board {height} {width} {board} />
</div>

<style>
	.board {
		margin: 2rem;
	}
</style>
