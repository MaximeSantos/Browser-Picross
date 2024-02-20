<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let height: number;
	export let width: number;
	export let board: number[];
	export let hints: { rows: number[][]; cols: number[][] };

	const dispatch = createEventDispatcher();
	function mousedown(e: MouseEvent, i: number) {
		dispatch('mousedown', { button: e.button, index: i });
	}
	function mouseover(e: MouseEvent, i: number) {
		dispatch('mouseover', { buttons: e.buttons, index: i });
	}
</script>

<div class="container">
	<!-- Header Left -->
	<div class="left-h">
		{#each hints.rows as hintList}
			<div class="hint-container">
				{#each hintList as hint}
					<div class="hint">
						{hint}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Header Top -->
	<div class="top-h">
		{#each hints.cols as hintList}
			<div class="hint-container">
				{#each hintList as hint}
					<div class="hint">
						{hint}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Body of the grid -->
	<div class="grid" style:--n-rows={height} style:--n-cols={width}>
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
	:root {
		--col-height: 2rem;
		--row-width: 2rem;
	}

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
		grid-template-columns: repeat(var(--n-cols), var(--col-height));
		grid-template-rows: repeat(var(--n-rows), var(--row-width));
	}

	.top-h,
	.left-h {
		display: flex;
	}
	.top-h {
		grid-area: top;
		flex-direction: row;
	}
	.left-h {
		grid-area: left;
		flex-direction: column;
	}
	.hint-container {
		display: flex;
		align-items: center;
	}
	.top-h .hint-container {
		flex-direction: column;
		width: var(--row-width);
	}
	.left-h .hint-container {
		flex-direction: row;
		height: var(--col-height);
	}
	.hint {
		width: 1rem;
		height: 1rem;
	}

	.cell {
		width: 100%;
		height: 100%;
		padding: 0;
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
