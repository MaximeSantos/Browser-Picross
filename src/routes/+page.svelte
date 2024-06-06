<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Puzzles</h2>
<div>
	{#if data.puzzles && data.puzzles.items.length > 0}
		<ul>
			{#each data.puzzles.items as puzzle}
				<li>
					<a href={`/puzzle/${puzzle.id}`}>{puzzle.title}</a>
				</li>
			{/each}
		</ul>
	{:else if data.puzzles && data.puzzles.items.length === 0}
		<p>No puzzles available</p>
	{:else}
		<p>Something went wrong</p>
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
</style>
