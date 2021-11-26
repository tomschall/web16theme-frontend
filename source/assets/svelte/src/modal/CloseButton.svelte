<script>
	// This property is used by Modal.svelte to pass down the close function
	export let onClose;
</script>

<button on:click={onClose}>Close</button>

<style>
	button {
		position: absolute;
		top: -1.5rem;
		right: 0;
		color: #000;
		background: #fff;
		border: 2px solid #000;
	}
</style>
