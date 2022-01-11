<script lang="ts">
	import type { Item } from './definitions/Item';
	import { _ } from 'svelte-i18n';
	import SvelteMarkdown from 'svelte-markdown';
	import Paragraph from './Paragraph.svelte';

	// export let item: Item;
	// export let searchResultsHighlighting: any[];

	// let mq = window.estatico.mq.query({ from: 'small' }); // Estatico media query
</script>

<li class="widg_linklist___entry">
	<a class="anchor-link" href="http://localhost:9000">
		<div class="widg_linklist__img-wrapper">
			<img src="https://dummyimage.com/113x125/ccc/000.png" alt="Dummy Image" />
		</div>
		<span class="widg_linklist__dateline">CAS</span>
		<h3 class="childless">Title</h3>
		<span>01.01.2022 | Hochschule Wirtschaft</span>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet fugit,
			soluta consectetur natus, temporibus cupiditate quo assumenda expedita
			sequi nostrum ab non. Reiciendis repellat explicabo voluptas nemo
			recusandae asperiores quia.
		</p>
	</a>
</li>
