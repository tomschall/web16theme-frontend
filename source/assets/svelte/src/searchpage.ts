import SearchPage from './SearchPage.svelte';
import App from './App.svelte';

declare global {
  interface Window {
    estatico: any;
  }
}

const searchbar = new SearchPage({
  target: document.querySelector('.widg_searchpage'),
});

export default searchbar;
