<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Puzzles</h2>
<div>
	{#await data.puzzles}
		<p>Loading ...</p>
	{:then puzzles}
		{#if puzzles}
			<ul>
				{#each puzzles.items as puzzle}
					<li>
						<a href={`/puzzle/${puzzle.id}`}>{puzzle.title}</a>
					</li>
				{/each}
			</ul>
		{/if}
	{/await}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
</style>
