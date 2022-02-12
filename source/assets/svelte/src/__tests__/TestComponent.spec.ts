import { render, screen } from '@testing-library/svelte';
import TestComponent from '../TestComponent.svelte';

test("find text 'Studium suchen'", () => {
  render(TestComponent);
  const node: HTMLElement = screen.queryByText('Studium suchen');
  expect(node).not.toBeNull();
});

test("find alt text attribute 'sindbad'", () => {
  render(TestComponent);

  const node = screen.findAllByAltText('sindbad');
  expect(node).not.toBeNull();

  const node2: HTMLElement = screen.queryByText('en');
  expect(node2).not.toBeNull();
});
