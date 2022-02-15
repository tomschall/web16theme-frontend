import { render, screen } from '@testing-library/svelte';
import ListingNormal from '../ListingNormal.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';
import prettyFormat from 'pretty-format';
import { itemsData, searchResultsHighlightingData } from '../mock/TestData';

let lang: string = document.documentElement.lang || 'de';

declare var global: any;
declare var window: any;

const originalWindow = { ...window };
originalWindow.estatico = jest.fn(() => ({ mq: jest.fn() }));
originalWindow.estatico.mq = jest.fn(() => false);
const windowSpy = jest.spyOn(global, 'window', 'get');
windowSpy.mockImplementation(() => ({
  ...originalWindow,
  estatico: {
    ...originalWindow.estatico,
    mq: {
      ...originalWindow.estatico.mq,
      query: jest.fn(() => true),
    },
  },
}));

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

const item: any = itemsData.items[0];

const searchResultsHighlighting: any = searchResultsHighlightingData;

test('render searchpage', () => {
  const { getByText } = render(ListingNormal, {
    props: {
      item,
      searchResultsHighlighting,
    },
  });

  expect(getByText('to be translated'));
});
