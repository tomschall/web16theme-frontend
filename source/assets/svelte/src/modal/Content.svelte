<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	import SearchBar from '../SearchBar.svelte';
	import CloseButton from './CloseButton.svelte';

	const { open } = getContext('simple-modal');

	let opening = false;
	let opened = false;
	let closing = false;
	let closed = false;

	const showPopupCustom = () => {
		open(
			SearchBar,
			{
				message: "It's a customized popup!",
			},
			{
				closeButton: CloseButton,
				styleBg: {
					background: '#fff',
				},
				styleWindowWrap: {
					margin: '4rem',
				},
				styleWindow: {
					border: '2px solid #000',
					background: '#fff',
				},
				styleContent: {
					color: '#000',
					fontFamily: 'robotic',
					fontStyle: 'normal',
				},
				transitionWindow: fly,
				transitionWindowProps: {
					x: 300,
					duration: 1000,
				},
			},
			{
				onOpen: () => {
					opening = true;
				},
				onOpened: () => {
					opening = false;
					opened = true;
				},
				onClose: () => {
					opened = false;
					closing = true;
				},
				onClosed: () => {
					closing = false;
					closed = true;
					setTimeout(() => {
						closed = false;
					}, 1000);
				},
			}
		);
	};
</script>

<section>
	<button class=".widg_actionbutton__item" on:click={showPopupCustom}
		>Suchen</button
	>

	<div id="state">
		{#if opening}
			<p>opening modal...</p>
		{:else if opened}
			<p>opened modal!</p>
		{:else if closing}
			<p>closing modal...</p>
		{:else if closed}
			<p>closed modal!</p>
		{/if}
	</div>
</section>

<style>
	section {
		padding-top: 0.5em;
	}

	#state {
		position: absolute;
		top: 0;
		right: 0;
		opacity: 0.33;
		font-size: 0.8em;
	}
</style>
