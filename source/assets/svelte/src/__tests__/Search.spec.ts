import { render, screen } from '@testing-library/svelte';
import Search from '../Search.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';
import prettyFormat from 'pretty-format';

let lang: string = document.documentElement.lang;

// jest.mock('svelte-markdown', () => {
//   const originalModule = jest.requireActual('svelte-markdown');

//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => 'mocked svelte-markdown'),
//   };
// });

addMessages('en', en);
addMessages('de', de);

init({
  fallbackLocale: 'de',
  initialLocale: lang,
});

test('render search', () => {
  const { getByText } = render(Search, { props: { template: 'searchpage' } });

  expect(getByText('Suchresultate'));
});
