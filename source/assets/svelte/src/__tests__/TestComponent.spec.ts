import { render, screen } from '@testing-library/svelte';
import TestComponent from '../TestComponent.svelte';
import Subnav from '../Subnav.svelte';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages, _ } from 'svelte-i18n';

let lang: string = document.documentElement.lang;

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

test("find text 'Studium suchen'", () => {
  render(TestComponent);
  const node: HTMLElement = screen.queryByText('Studium suchen');
  expect(node).not.toBeNull();
});

test("find alt text attribute 'sindbad'", () => {
  render(TestComponent);

  const node = screen.findAllByAltText('sindbad');
  expect(node).not.toBeNull();

  const node2: HTMLElement = screen.queryByText('de');
  expect(node2).not.toBeNull();
});

test('render subnav', () => {
  const { getByText } = render(Subnav);
  expect(getByText('Die FHNW'));
});
