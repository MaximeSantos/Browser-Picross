<script lang="ts">
	import Navigation from 'components/Navigation.svelte';
	import '../style.css';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<Navigation isStaff={data.isStaff} isLoggedIn={data.isLoggedIn} />
	<h1><a href="/">Browser Picross</a></h1>
	<slot />
</div>
