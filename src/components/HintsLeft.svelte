<script lang="ts">
	export let hints: { rows: number[][]; columns: number[][] };
</script>

<div class="left-h">
	{#each hints.rows as hintList, i}
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

	.left-h {
		display: flex;
		grid-area: top;
		flex-direction: row;
		grid-area: left;
		flex-direction: column;
	}
	.hint-container {
		display: flex;
		align-items: center;
		border: 1px solid var(--dark);
	}
	.hint-container {
		flex-direction: column;
		justify-content: flex-end;
		width: var(--row-width);
		height: var(--hint-length-size);
		padding-bottom: 0.2rem;
	}
	.left-h .hint-container {
		flex-direction: row;
		justify-content: flex-end;
		height: var(--col-height);
		width: var(--hint-length-size);
	}
	.hint {
		width: 1rem;
		height: 1rem;
	}
</style>
