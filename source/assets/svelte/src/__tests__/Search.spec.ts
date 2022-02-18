import { getByLabelText, render, screen } from '@testing-library/svelte';
import Search from '../components/Search.svelte';
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

test('render searchpage', () => {
  const { getByLabelText } = render(Search, {
    props: { template: 'searchpage' },
  });

  expect(getByLabelText('Suche'));

  expect(
    document.querySelector('#searchpage_input').getAttribute('placeholder')
  ).toBe('Suche: Hier tippen');

  console.log('findByTitle', screen.findByTitle('Alle Suchresultate'));
  expect(screen.findByTitle('Alle Suchresultate')).not.toBeNull();
});

test('render searchbar', () => {
  const { getByLabelText, getByText } = render(Search, {
    props: { template: 'searchbar' },
  });

  expect(getByLabelText('Suche'));

  expect(
    document.querySelector('#searchbar_input').getAttribute('placeholder')
  ).toBe('Suche: Hier tippen');

  expect(getByText('Studium suchen'));
  expect(getByText('Weiterbildungen und Kurse suchen'));
  expect(getByText('Personen suchen'));
  expect(getByText('Veranstaltungen suchen'));
  expect(getByText('News suchen'));
});
