import ContinuingEducationSearch from './ContinuingEducationSearch.svelte';
import App from './App.svelte';

declare global {
  interface Window {
    estatico: any;
  }
}

const searchbar = new ContinuingEducationSearch({
  target: document.querySelector('.widg_continuing_education_search'),
});

export default searchbar;
