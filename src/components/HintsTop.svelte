<script lang="ts">
	export let hints: { rows: number[][]; columns: number[][] };
</script>

<div class="top-h">
	{#each hints.columns as hintList, i}
		<div class="hint-container" class:bg-light={i % 2}>
			{#each hintList as hint}
				<div class="hint">
					{hint}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.bg-light {
		background-color: var(--border-light);
	}

	.top-h {
		display: flex;
		grid-area: top;
		flex-direction: row;
	}

	.hint-container {
		display: flex;
		align-items: center;
		border: 1px solid var(--dark);
	}
	.top-h .hint-container {
		flex-direction: column;
		justify-content: flex-end;
		width: var(--row-width);
		height: var(--hint-length-size);
		padding-bottom: 0.2rem;
	}
	.hint-container {
		flex-direction: row;
		justify-content: flex-end;
		height: var(--col-height);
		width: var(--hint-length-size);
		margin: 0;
		border: 0;
	}
</style>
