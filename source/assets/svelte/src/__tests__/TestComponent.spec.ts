import { render, screen } from '@testing-library/svelte';
import TestComponent from '../TestComponent.svelte';
import Subnav from '../Subnav.svelte';

import { of } from 'rxjs';
import { writable } from 'svelte/store';

import { _ } from 'svelte-i18n';
import en from '../lang/en.json';
import de from '../lang/de.json';
import { init, addMessages } from 'svelte-i18n';

jest.mock('svelte-i18n', () => {
  const originalModule = jest.requireActual('svelte-i18n');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    addMessages: jest.fn(() => void 0),
  };
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
});

test('render subnav', () => {
  render(Subnav);
});
