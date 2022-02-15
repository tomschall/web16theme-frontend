import { getByLabelText, render, screen } from '@testing-library/svelte';
import ListingNormal from '../ListingNormal.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';
import prettyFormat from 'pretty-format';

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

test('render searchpage', () => {
  const { getByLabelText } = render(ListingNormal, {
    props: {
      item: {
        title_parents: [
          'Die FHNW',
          'Swiss Challenge Wettbewerbe',
          'Swiss Innovation Challenge',
          'Finalistinnen und Finalisten 2018',
          'Finalistinnen und Finalisten 2017',
        ],
        path_string:
          '/Plone/de/die-fhnw/swiss-challenge-wettbewerbe/innovationchallenge/finalistinnen-finalisten-2018/2017/swissdecode',
        filetype: null,
        description: 'DNA test on-site - your personnel - no lab - 30 minutes',
        news_date: null,
        end_event: null,
        effective: '2018-02-05T12:18:17+00:00',
        UID: '57dd00ea56a84015a18acc71c82d1555',
        review_state: null,
        start_event: null,
        end_date: null,
        start_date: null,
        '@id':
          'https://www.dev.fhnw.ch/de/die-fhnw/swiss-challenge-wettbewerbe/innovationchallenge/finalistinnen-finalisten-2018/2017/swissdecode',
        '@type': null,
        search_type: 'general',
        Description: 'DNA test on-site - your personnel - no lab - 30 minutes',
        filesize: null,
        oes: null,
        role: null,
        school: null,
        Title: 'SwissDeCode',
        institute: null,
        location_short: null,
        title: 'SwissDeCode',
      },
    },
  });

  expect(getByLabelText('Suche'));

  expect(
    document.querySelector('#searchpage_input').getAttribute('placeholder')
  ).toBe('Suche: Hier tippen');

  console.log('findByTitle', screen.findByTitle('Alle Suchresultate'));
  expect(screen.findByTitle('Alle Suchresultate')).not.toBeNull();
});
