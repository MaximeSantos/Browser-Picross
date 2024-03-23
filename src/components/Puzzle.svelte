<script lang="ts">
	import Board from './Board.svelte';
	import HintsLeft from './HintsLeft.svelte';
	import HintsTop from './HintsTop.svelte';

	export let height: number;
	export let width: number;
	export let board: number[];
	export let isWon: boolean;
	export let hints: { rows: number[][]; columns: number[][] };
</script>

<!-- Disable right clicking on the board -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="board-container" on:contextmenu|preventDefault>
	<!-- Header Left -->
	<HintsLeft {hints} />

	<!-- Header Top -->
	<HintsTop {hints} />

	<!-- Body of the grid -->
	<Board {width} {height} bind:isWon bind:board />
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
</style>
