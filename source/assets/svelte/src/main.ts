import SearchBar from './SearchBar.svelte';
import App from './App.svelte';

declare global {
  interface Window {
    estatico: any;
  }
}

// const app = new App({
//   target: document.body,
// });

const searchbar = new SearchBar({
  target: document.querySelector('.widg_searchbar-bar'),
});

export default searchbar;
