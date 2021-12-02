import Search from './Search.svelte';
import App from './App.svelte';

declare global {
  interface Window {
    estatico: any;
  }
}

const searchBar = new Search({
  target: document.querySelector('.widg_searchbar-bar'),
  props: {
    template: 'searchbar',
  },
});

const searchPage = new Search({
  target: document.querySelector('.widg_searchpage'),
  props: {
    template: 'searchpage',
  },
});

export default [searchBar, searchPage];
