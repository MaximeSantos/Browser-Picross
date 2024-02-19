<script lang="ts">
	export let height: number;
	export let width: number;
</script>

<table>
	<thead>
		<th scope="col"></th>
		{#each { length: width } as _, i}
			<th scope="col">x {i}</th>
		{/each}
	</thead>
	<tbody>
		{#each { length: height } as _, j}
			<tr>
				<th scope="row">y {j}</th>
				{#each { length: width } as _, i}
					<td>{j}/{i}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	td {
		border: 1px solid white;
	}
</style>
