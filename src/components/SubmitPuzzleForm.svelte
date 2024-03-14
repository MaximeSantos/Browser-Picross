<script lang="ts">
</script>

<form>
	<div>
		<label for="title">
			Title
			<input type="title" name="title" required aria-required="true" />
		</label>
		<label for="author">
			Author
			<input type="author" name="author" required aria-required="true" />
		</label>
		<label for="copyright">
			Copyright
			<input type="copyright" name="copyright" required aria-required="true" />
		</label>
		<label for="licence">
			Licence
			<input type="licence" name="licence" required aria-required="true" />
		</label>
		<!-- Width and height should be pre-determined by a preceding form ? -->
		<!-- Rows hints / Columns hints / Solution should be based on the state of the puzzle when the first form is submitted -->
		<!-- Store those values in a global state ? -->
	</div>
	<button type="submit">Submit Puzzle</button>
</form>
