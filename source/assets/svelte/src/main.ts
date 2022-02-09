import Search from './Search.svelte';
import Subnav from './Subnav.svelte';
import ContinuingEducationSearch from './ContinuingEducationSearch.svelte';
import EducationSearch from './EducationSearch.svelte';
import type { SvelteComponent } from 'svelte';

declare global {
  interface Window {
    estatico: any;
  }
}

const searchBarSelector = document.querySelector('.widg_searchbar-bar');
const searchPageSelector = document.querySelector('.widg_svelte_searchpage');
const subNavSelector = document.querySelector('.widg_subnav.svelte');
const continuingEducationSelector = document.querySelector(
  '.widg_continuing_education_search'
);
const educationSelector = document.querySelector('.widg_education_search');

let searchBar: SvelteComponent = null;
let searchPage: SvelteComponent = null;
let subNav: SvelteComponent = null;
let continuingEducationSearch: SvelteComponent = null;
let educationSearch: SvelteComponent = null;

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

if (subNavSelector) {
  subNav = new Subnav({
    target: subNavSelector,
    props: {
      template: 'searchpage',
    },
  });
}

if (continuingEducationSelector) {
  continuingEducationSearch = new ContinuingEducationSearch({
    target: continuingEducationSelector,
    props: {
      template: 'continuing_education',
    },
  });
}

if (educationSelector) {
  educationSearch = new EducationSearch({
    target: educationSelector,
    props: {
      template: 'education',
    },
  });
}

export default [
  searchBar,
  searchPage,
  subNav,
  continuingEducationSearch,
  educationSearch,
];
