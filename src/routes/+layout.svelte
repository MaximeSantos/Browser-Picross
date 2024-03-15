<script>
	import Navigation from 'components/Navigation.svelte';
	import '../style.css';
</script>

<div class="container">
	<Navigation />
	<h1><a href="/">Browser Picross</a></h1>
	<slot />
</div>
