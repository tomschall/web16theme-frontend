import Search from './Search.svelte';
import App from './App.svelte';

declare global {
  interface Window {
    estatico: any;
  }
}
const searchBarSelector = document.querySelector('.widg_searchbar-bar');
const searchPageSelector = document.querySelector('.widg_searchpage');

const searchBar = new Search({
  target: searchBarSelector,
  props: {
    template: 'searchbar',
  },
});

if (searchPageSelector) {
  const searchPage = new Search({
    target: searchPageSelector,
    props: {
      template: 'searchpage',
    },
  });
}

export default searchBar;
