<script lang="ts">
	import getAction from '$lib/functions/getAction';
	import getNextCellStateOnMouseOver from '$lib/functions/getNextCellStateOnMouseOver';

	export let board: number[];
	export let height: number;
	export let width: number;
	export let isWon: boolean = false; // Initialised to false when no props given

	let startDragOn = 0;

	function handleMouseDown(e: MouseEvent, i: number) {
		if (!isWon) {
			startDragOn = board[i];
			// Convert our button press to our expected result in our custom .non format
			// Left Click get 1 / Right Click get 0 / Middle Click get -1
			let action = getAction('mousedown', e.button);
			if (action != null) {
				board[i] = action == board[i] ? -1 : action;
			}
		}
	}
	function handleMouseOver(e: MouseEvent, i: number) {
		if (!isWon) {
			let action = getAction('mouseover', e.buttons);
			board[i] = getNextCellStateOnMouseOver(action, board[i], startDragOn);
		}
	}

	// TODO Show active row/column and cell where the cursor is positioned
	// TODO Add animations when interacting with a cell
	// TODO Find a better solution to add the borders (maybe add a dataset or something similar on each cell to help locate their coordinates later on)
	function accentTop(i: number): boolean {
		return i > width && (i + 1) % (5 * width) <= width && (i + 1) % (5 * width) > 0;
	}
	function accentBottom(i: number): boolean {
		return (
			i + width < board.length &&
			i + width + 1 > width &&
			(i + width + 1) % (5 * width) <= width &&
			(i + width + 1) % (5 * width) > 0
		);
	}
	function accentRight(i: number): boolean {
		// Must not be last cell of a row && the cell must be a multiple of five reset on each row
		return (i + 1) % width != 0 && ((i + 1) % width) % 5 === 0;
	}
	function accentLeft(i: number): boolean {
		return i % width !== 0 && (i % width) % 5 === 0;
	}
</script>

<div class="grid" style:--n-rows={height} style:--n-cols={width}>
	{#each board as cell, i}
		<!-- Probably many ways to improve on the accent class conditons -->
		<button
			class="cell"
			class:crossed={cell == 0}
			class:full={cell == 1}
			class:accent-t={accentTop(i)}
			class:accent-r={accentRight(i)}
			class:accent-b={accentBottom(i)}
			class:accent-l={accentLeft(i)}
			on:mousedown={(e) => handleMouseDown(e, i)}
			on:mouseover={(e) => handleMouseOver(e, i)}
			on:focus
			type="button"
			tabindex="0"
		/>
	{/each}
</div>

<style>
	.grid {
		grid-area: grid;
		display: grid;
		grid-template-columns: repeat(var(--n-cols), var(--col-height));
		grid-template-rows: repeat(var(--n-rows), var(--row-width));
	}

	.cell {
		width: 100%;
		height: 100%;
		padding: 0;
		border: 1px solid var(--dark);
		background-color: var(--light-dark);
	}
	.cell.accent-t {
		border-top: 1px solid var(--border-light);
	}
	.cell.accent-r {
		border-right: 1px solid var(--border-light);
	}
	.cell.accent-b {
		border-bottom: 1px solid var(--border-light);
	}
	.cell.accent-l {
		border-left: 1px solid var(--border-light);
	}
	.cell.full {
		background-color: var(--full-cross-light);
	}
	.cell.crossed {
		position: relative;
		overflow: hidden;
	}
	.cell.crossed:before,
	.cell.crossed:after {
		position: absolute;
		content: '';
		background-color: var(--full-cross-light);
		display: block;
		width: 100%;
		height: 1px;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	.cell.crossed:after {
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
