import SearchBar from './SearchBar.svelte';
import App from './App.svelte';

const searchbar = new SearchBar({
  target: document.querySelector('.widg_searchbar-bar'),
});

const app = new App({
  target: document.body,
  props: { name: 'world' },
});

export default searchbar;
