// @ts-ignore
import Search from './Search.svelte';
import type { SvelteComponent } from 'svelte';

declare global {
  interface Window {
    estatico: any;
  }
}
const searchBarSelector = document.querySelector('.widg_searchbar-bar');
const searchPageSelector = document.querySelector('.widg_svelte_searchpage');

let searchBar: SvelteComponent = null;
let searchPage: SvelteComponent = null;

if (searchBarSelector) {
  searchBar = new Search({
    target: searchBarSelector,
    props: {
      template: 'searchbar',
    },
  });
}

if (searchPageSelector) {
  searchPage = new Search({
    target: searchPageSelector,
    props: {
      template: 'searchpage',
    },
  });
}

export default [searchBar, searchPage];
