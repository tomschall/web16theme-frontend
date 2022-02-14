import { render, screen } from '@testing-library/svelte';
import TestComponent from '../TestComponent.svelte';
import Subnav from '../Subnav.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';
import prettyFormat from 'pretty-format';

let lang: string = document.documentElement.lang;

export const format = (value: unknown): string =>
  typeof value === 'function'
    ? value.toString()
    : prettyFormat(value, { min: true });

// jest.mock('svelte-i18n', () => {
//   const originalModule = jest.requireActual('svelte-i18n');

//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => 'mocked baz'),
//     addMessages,
//     init,
//     _,
//   };
// });

addMessages('en', en);
addMessages('de', de);

init({
  fallbackLocale: 'de',
  initialLocale: lang,
});

test('render subnav', () => {
  const { getByText } = render(Subnav);

  expect(getByText('Die FHNW'));

  expect(getByText('Suchen'));

  const links = [
    '/de/die-fhnw',
    '/de/search_all',
    '/de/search_edu',
    '/de/search_filter',
    '/de/search_profiles',
    '/de/die-fhnw/veranstaltungen',
    '/de/medien/newsroom/news',
    '/de/',
  ];

  document
    .querySelectorAll('a')
    .forEach((el, i) => expect(el.getAttribute('href')).toBe(links[i]));
});
