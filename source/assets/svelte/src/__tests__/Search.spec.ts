import { render, screen } from '@testing-library/svelte';
import Search from '../Search.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';
import prettyFormat from 'pretty-format';

let lang: string = document.documentElement.lang || 'de';

const observe: any = jest.fn();
const unobserve: any = jest.fn();
const root: any = jest.fn();
const rootMargin: any = jest.fn();
const thresholds: any = jest.fn();
const disconnect: any = jest.fn();
const takeRecords: any = jest.fn();

// you can also pass the mock implementation
// to jest.fn as an argument
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  root,
  rootMargin,
  thresholds,
  disconnect,
  takeRecords,
}));

addMessages('en', en);
addMessages('de', de);

init({
  fallbackLocale: 'de',
  initialLocale: lang,
});

test('render search', () => {
  const { getByText } = render(Search, { props: { template: 'searchpage' } });

  expect(getByText('Studium suchen'));
});
