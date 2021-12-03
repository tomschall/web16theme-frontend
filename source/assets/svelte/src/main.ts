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

let searchBar: Svelte2TsxComponent;
let searchPage: Svelte2TsxComponent;

if (searchBarSelector) {
  searchBar = new Search({
    target: searchBarSelector,
    props: {
      template: 'searchbar',
    },
  });
} else {
  console.log('no searchBarSelector on this site');
}

if (searchPageSelector) {
  searchPage = new Search({
    target: searchPageSelector,
    props: {
      template: 'searchpage',
    },
  });
} else {
  console.log('no searchPageSelector on this site', searchPageSelector);
}

export default [searchBar, searchPage];
