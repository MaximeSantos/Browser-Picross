<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Puzzles</h2>
<div>
	{#each data.puzzles.items as puzzle}
		<a href={`/puzzle/${puzzle.id}`}>{puzzle.title}</a>
	{/each}
</div>
