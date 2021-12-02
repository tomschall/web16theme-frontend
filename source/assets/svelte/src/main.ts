// @ts-ignore
import Search from './Search.svelte';
import App from './App.svelte';

declare global {
  interface Window {
    estatico: any;
  }
}
const searchBarSelector = document.querySelector('.widg_searchbar-bar');
const searchPageSelector = document.querySelector('.widg_searchpage');
let searchBar = console.log(
  'no searchBarSelector on this site',
  searchBarSelector
);
let searchPage = console.log(
  'no searchPageSelector on this site',
  searchPageSelector
);

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
