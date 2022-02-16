<script lang="ts">
	import { setContext, createEventDispatcher, onMount } from 'svelte';
	import Parser from './Parser.svelte';
	import { defaultOptions, defaultRenderers } from './markdown-parser';
	import { key } from './context';
	import { Lexer, Slugger } from 'marked';

	export let source = '';
	export let renderers = {};
	export let options = {};
	export let isInline = false;

	const dispatch = createEventDispatcher();

	let tokens;
	let lexer;
	let mounted;

	$: slugger = source ? new Slugger() : undefined;
	$: combinedOptions = { ...defaultOptions, ...options };
	$: {
		lexer = new Lexer(combinedOptions);

		tokens = isInline ? lexer.inlineTokens(source) : lexer.lex(source);

		dispatch('parsed', { tokens });
	}

	$: combinedRenderers = { ...defaultRenderers, ...renderers };

	setContext(key, {
		slug: (val) => (slugger ? slugger.slug(val) : ''),
		getOptions: () => combinedOptions,
	});
	$: mounted && dispatch('parsed', { tokens });

	onMount(() => {
		mounted = true;
	});
</script>

<Parser {tokens} renderers={combinedRenderers} />
