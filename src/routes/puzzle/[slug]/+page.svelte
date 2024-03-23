<script lang="ts">
	import type { PageData } from './$types';

	import Puzzle from 'components/Puzzle.svelte';

	import checkWinCondition from '$lib/functions/checkWinCondition';

	export let data: PageData;

	// Setting up our variables based on the .non format for now (https://webpbn.com/export.cgi amongst many other possibilities)
	// -1 is an crossed cell / 0 is an empty cell / 1 is a full cell
	const width = data.puzzle?.width;
	const height = data.puzzle?.height;
	const hints = {
		rows: data.puzzle?.rows,
		columns: data.puzzle?.columns
	};
	const solution = data.puzzle?.solution;
	// Initialising a one dimensionnal array with values 0 to represent our empty board.
	let board = Array.from({ length: height * width }, () => 0);
	let isWon = false;

	// Checks win condition every time the board refreshes
	$: if (checkWinCondition(board, solution)) {
		isWon = true;
	} else {
		isWon = false;
	}
</script>

{#await data.puzzle}
	<p>Loading ...</p>
{:then}
	<Puzzle {height} {width} {hints} bind:isWon bind:board />
{:catch error}
	<p>Oups, erreur</p>
	<p>{error}</p>
{/await}
<h2>{isWon ? 'You won !' : ''}</h2>
