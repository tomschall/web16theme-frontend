<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import en from './lang/en.json';
	import de from './lang/de.json';
	import { init, addMessages } from 'svelte-i18n';

	let lang: string = document.documentElement.lang;

	addMessages('en', en);
	addMessages('de', de);

	init({
		fallbackLocale: 'de',
		initialLocale: lang,
	});
</script>

<div class="widg_subnav__title has-subtitle">
	<div class="widg_subnav__main-link">
		<a href={$_('subnav_title_link')} class="anchor-link">
			<h2>{$_('subnav_title')}</h2>
		</a>
	</div>
	<div class="widg_subnav__subtitle">
		<a href={$_('subnav_subtitle_link')}>
			<span>{$_('subnav_subtitle')}</span>
		</a>
	</div>
</div>
<div class="widg_subnav__list">
	<ul>
		<li>
			<a href="/{lang}{$_('subnav_studys_link')}">{$_('subnav_studys')}</a>
		</li>
		<li>
			<a href="/{lang}{$_('subnav_education_link')}">{$_('subnav_education')}</a
			>
		</li>
		<li>
			<a href="/{lang}{$_('subnav_persons_link')}">{$_('subnav_persons')}</a>
		</li>
		<li>
			<a href="/{lang}{$_('subnav_events_link')}">{$_('subnav_events')}</a>
		</li>
		<li>
			<a href="/{lang}{$_('subnav_news_link')}">{$_('subnav_news')}</a>
		</li>
		<li>
			<a href="/{lang}/" class="is_back">{$_('subnav_startpage')}</a>
		</li>
	</ul>
</div>
