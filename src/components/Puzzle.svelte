<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// import Board from './Board.svelte';
	import HintsLeft from './HintsLeft.svelte';
	import HintsTop from './HintsTop.svelte';

	export let height: number;
	export let width: number;
	export let board: number[];
	export let hints: { rows: number[][]; cols: number[][] };

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

	const dispatch = createEventDispatcher();
	function mousedown(e: MouseEvent, i: number) {
		dispatch('mousedown', { button: e.button, index: i });
	}
	function mouseover(e: MouseEvent, i: number) {
		dispatch('mouseover', { buttons: e.buttons, index: i });
	}
</script>

<!-- Disable right clicking on the board -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="board-container" on:contextmenu|preventDefault>
	<!-- Header Left -->
	<HintsLeft {hints} />

	<!-- Header Top -->
	<HintsTop {hints} />

	<!-- Body of the grid -->
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
				on:mousedown={(e) => mousedown(e, i)}
				on:mouseover={(e) => mouseover(e, i)}
				on:focus
				type="button"
				tabindex="0"
			/>
		{/each}
	</div>
</div>

<style>
	.board-container {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto 1fr;
		grid-template-areas:
			'. top'
			'left grid';
		margin-right: var(--hint-length-size);
	}

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
