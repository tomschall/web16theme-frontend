import { render } from '@testing-library/svelte';
import Subnav from '../components/nav/Subnav.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';

let lang: string = document.documentElement.lang;

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
