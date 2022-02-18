import { render, screen } from '@testing-library/svelte';
import ListingNormal from '../components/list/ListingNormal.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';
import prettyFormat from 'pretty-format';
import { itemsData, searchResultsHighlightingData } from '../mock/TestData';

let lang: string = document.documentElement.lang || 'de';

const observe: any = jest.fn();
const unobserve: any = jest.fn();
const root: any = jest.fn();
const rootMargin: any = jest.fn();
const thresholds: any = jest.fn();
const disconnect: any = jest.fn();
const takeRecords: any = jest.fn();

const originalWindow = {
  ...window,
};

let windowSpy: any;

// beforeEach(() => {});

// afterEach(() => {
//   windowSpy.mockRestore();
// });

windowSpy = jest.spyOn(window, 'window', 'get');

// why is it not possible to destructure window object directly in windowSpy.mockImplementation
windowSpy.mockImplementation(() => ({
  ...originalWindow,
  estatico: {
    mq: {
      query: jest.fn(() => true),
    },
  },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  IntersectionObserver: jest.fn(() => ({
    observe,
    unobserve,
    root,
    rootMargin,
    thresholds,
    disconnect,
    takeRecords,
  })),
}));

addMessages('en', en);
addMessages('de', de);

init({
  fallbackLocale: 'de',
  initialLocale: lang,
});

const item: any = itemsData.items[0];
const searchResultsHighlighting: any = searchResultsHighlightingData;

test('render searchpage - svelte-markdown parses string', () => {
  const { getByText } = render(ListingNormal, {
    props: {
      item,
      searchResultsHighlighting,
    },
  });

  expect(getByText('Form'));
  expect(getByText('Test'));
});
