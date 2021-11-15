<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import Search from './Search.svelte';
  import SearchResults from './SearchResults.svelte';
  import SearchCategories from './SearchCategories.svelte';
  import LoadingIndicator from './LoadingIndicator.svelte';
  import { init, getLocaleFromNavigator, addMessages } from 'svelte-i18n';
  import en from './lang/en.json';
  import de from './lang/de.json';

  addMessages('en', en);
  addMessages('de', de);

  init({
    fallbackLocale: 'de',
    initialLocale: getLocaleFromNavigator(),
  });

  let searchQuery: string = '';
  let searchTerm: string = null;
  let searchResults: string[] = [];
  let isLoading: boolean = false;
  let selectedCategory: string = '';
  let observer: any;
  let target: any;

  interface ObserverOptions {
    rootMargin: string;
    threshold: number;
  }

  const options: ObserverOptions = {
    rootMargin: '0px 0px 300px',
    threshold: 0,
  };

  const loadMoreResults = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        triggerSearch();
      }
    });
  };

  onMount(() => {
    observer = new IntersectionObserver(loadMoreResults, options);
    target = document.querySelector('.loading-indicator');
  });

  const handleSubmit = () => {
    searchTerm = searchQuery.trim();
    console.log('searchTerm', searchTerm);
    searchResults = [];

    if (!searchTerm) return;

    observer.observe(target);
    triggerSearch();
  };

  const triggerSearch = () => {
    isLoading = true;

    // if (!searchTerm) {
    //   console.log('trigger click', searchTerm, typeof searchTerm);
    //   searchResults = [];
    // }

    const endpoint = `https://www.fhnw.ch/de/searchbar.json?q=${searchTerm}&category=${
      selectedCategory || 'all'
    }`;

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        searchResults = [...searchResults, ...data.items];
      })
      .catch(() => console.log('An error occured!'))
      .finally(() => {
        isLoading = false;
      });
  };
</script>

<div class="widg_search_svelte">
  <Search bind:query={searchQuery} {handleSubmit} />
  <div class="search__results">
    <div class="widg_searchbar-bar__title">{$_('searchresult_title')}</div>
    <div
      class="widg_searchbar-bar__content custom-scrollbar"
      data-searchbar="content"
    >
      <div class="search__cat">
        <SearchCategories
          bind:selectedCategory
          triggerCategorySearch={() => triggerSearch()}
        />
        <SearchResults results={searchResults} />
        <div class="loading-indicator">
          {#if isLoading}
            <LoadingIndicator />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
