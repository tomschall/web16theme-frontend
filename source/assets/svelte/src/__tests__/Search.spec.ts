import {
  fireEvent,
  getByLabelText,
  prettyDOM,
  render,
  screen,
  waitFor,
} from '@testing-library/svelte';
import Search from '../components/Search.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';
import { itemsData } from '../mock/TestData';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { _ as lodash } from 'lodash';

enableFetchMocks();

jest.unmock('lodash');
lodash.debounce = jest.fn((fn) => fn);

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

// const mockFetch = (data): any => {
//   return new Promise((resolve) => {
//     resolve({
//       ok: true,
//       status: 200,
//       json: () => Promise.resolve(data),
//     });
//   });
// };

// window.fetch = jest.fn(() => mockFetch(itemsData));

window.estatico = {
  mq: {
    query: jest.fn(() => true),
  },
};

// jest.mock('../components/list/SearchResults.svelte', () => ({
//   default: () => MockSearchResults,
// }));

beforeEach(() => {
  // if you have an existing `beforeEach` just add the following lines to it
  // fetchMock.mockIf(/^https?:\/\/www.dev.fhnw.ch.*$/, (req): any => {
  //   console.log('req', req.url);
  //   return {
  //     ok: true,
  //     status: 200,
  //     body: jest.fn(() => mockFetch(itemsData)),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  // });
  fetch.resetMocks();
});

test('render searchpage', () => {
  const { getByLabelText } = render(Search, {
    props: { template: 'searchpage' },
  });

  expect(getByLabelText('Suche'));

  expect(
    document.querySelector('#searchpage_input').getAttribute('placeholder')
  ).toBe('Suche: Hier tippen');

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

test('search something and check is list gets rendered properly', async () => {
  fetch.mockResponseOnce(JSON.stringify(itemsData));

  const { getByText, debug } = render(Search, {
    props: { template: 'searchpage' },
  });

  const input: any = screen.getByLabelText('Suche');
  const value = 'test';
  await fireEvent.input(input, { target: { value } });
  expect(input.value).toBe('test');

  await screen.findAllByText('1848');
  await screen.findAllByText('- Testprodukt 1');
  await screen.findByText('DAS Sicherheitsmanagement und Human Factors');

  await waitFor(
    () => getByText('DAS Sicherheitsmanagement und Human Factors'),
    { timeout: 2000 }
  );
  await waitFor(
    () =>
      debug(screen.getByText('DAS Sicherheitsmanagement und Human Factors')),
    {
      timeout: 3000,
    }
  );
});
