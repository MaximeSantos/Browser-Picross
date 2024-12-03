<script lang="ts">
	import type { PageData } from './$types';

	import Puzzle from 'components/Puzzle.svelte';

	import checkWinCondition from '$lib/functions/checkWinCondition';
	import resetBoard from '$lib/functions/resetBoard';
	import getHintsFromBoard from '$lib/functions/getHintsFromBoard';

	export let data: PageData;

	// Setting up our variables based on the .non format for now (https://webpbn.com/export.cgi amongst many other possibilities)
	// -1 is an crossed cell / 0 is an empty cell / 1 is a full cell
	const width = data.puzzle?.width;
	const height = data.puzzle?.height;
	const solution = data.puzzle?.solution;
	// Generates the propers hints from the solution
	const hints = getHintsFromBoard(data.puzzle?.solution, data.puzzle?.height, data.puzzle?.width);
	// Initialising a one dimensionnal array with values 0 to represent our empty board.
	let board = resetBoard(height, width);
	let isWon = false;

	// Checks win condition every time the board refreshes
	$: if (checkWinCondition(board, solution)) {
		isWon = true;
	} else {
		isWon = false;
	}

	/* TODO: Go to next puzzle instead of back to list of puzzles */
</script>

{#if data.puzzle}
	<Puzzle {height} {width} {hints} bind:isWon bind:board />
{:else}
	<p>Something went wrong</p>
{/if}
{#if isWon}
	<h2>You won !</h2>
	<a href="/">Go back to the list of Puzzles</a>
{/if}
