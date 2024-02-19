<script>
  import Table from './Table.svelte';

  // Setting up our variables based on the .non format for now
  const solution = [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0];
  const board = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];
  const height = 5;
  const width = 5;

  let test = "Hello";
</script>

<h1>Browser Picross</h1>
<p>{test}</p>
<div class="board">
  <Table {height} {width}/>
</div>