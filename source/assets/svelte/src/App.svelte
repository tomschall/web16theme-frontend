<script lang="ts">
	import Content from './modal/Content.svelte';
	import Modal from './modal/Modal.svelte';
	import { modal } from './stores.js';
</script>

<Modal show={$modal}>
	<Content />
</Modal>
