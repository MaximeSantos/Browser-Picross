<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let height: number;
	export let width: number;
	export let board: number[];

	const dispatch = createEventDispatcher();

	function mousedown(e: MouseEvent, i: number) {
		dispatch('mousedown', { button: e.button, index: i });
	}
	function mouseover(e: MouseEvent, i: number) {
		dispatch('mouseover', { e: e, index: i });
	}
</script>

<div class="container">
	<!-- Header Left -->
	<div class="left-h">
		{#each { length: height } as _, i}
			<div>
				{i}
			</div>
		{/each}
	</div>

	<!-- Header Top -->
	<div class="top-h">
		{#each { length: width } as _, i}
			<div>
				{i}
			</div>
		{/each}
	</div>

	<!-- Body of the grid -->
	<div class="grid" style:--height={height} style:--width={width}>
		{#each board as cell, i}
			<button
				class="cell"
				class:crossed={cell == 0}
				class:full={cell == 1}
				on:contextmenu|preventDefault
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
	.container {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto 1fr;
		grid-template-areas:
			'. top'
			'left grid';
	}

	.grid {
		grid-area: grid;
		display: grid;
		grid-template-columns: repeat(var(--width), 2rem);
		grid-template-rows: repeat(var(--height), 2rem);
	}

	.top-h {
		grid-area: top;
		display: flex;
		flex-direction: row;
		gap: 1px;
	}
	.left-h {
		display: flex;
		flex-direction: column;
		grid-area: left;
		gap: 1px;
	}
	.top-h div,
	.left-h div {
		height: 2rem;
		width: 2rem;
	}

	.cell {
		border: 1px solid #1c1b22;
	}
	.cell.full {
		background-color: #cccccc;
	}
	.cell.crossed {
		position: relative;
		overflow: hidden;
	}
	.cell.crossed:before,
	.cell.crossed:after {
		position: absolute;
		content: '';
		background-color: #fbfbfb;
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
