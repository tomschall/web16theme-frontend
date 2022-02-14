import { render, screen } from '@testing-library/svelte';
import SearchBarIntro from '../SearchBarIntro.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';
import prettyFormat from 'pretty-format';

let lang: string;

beforeAll(() => {
  lang = document.documentElement.lang || 'de';

  addMessages('en', en);
  addMessages('de', de);

  init({
    fallbackLocale: 'de',
    initialLocale: lang,
  });
});

// jest.mock('svelte-markdown', () => {
//   const originalModule = jest.requireActual('svelte-markdown');

//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => 'mocked svelte-markdown'),
//   };
// });

test('render search', () => {
  const { getByText } = render(SearchBarIntro, {
    props: { lang },
  });

  expect(getByText('Studium suchen'));
});
