<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<h1><a href="/">Browser Picross</a></h1>
	<h2>Puzzles</h2>
	<div>
		{#each data.puzzles.items as puzzle}
			<a href={`/puzzle/${puzzle.id}`}>{puzzle.title}</a>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
	}
</style>
