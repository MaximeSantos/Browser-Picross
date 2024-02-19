<script lang="ts">
	export let height: number;
	export let width: number;
	export let board: number[];
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
			<div class="cell">{cell}</div>
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
		/* border: 1px solid #FBFBFE; */
	}

	.grid {
		grid-area: grid;
		display: grid;
		grid-template-columns: repeat(var(--width), 2rem);
		grid-template-rows: repeat(var(--height), 2rem);
	}
</style>
