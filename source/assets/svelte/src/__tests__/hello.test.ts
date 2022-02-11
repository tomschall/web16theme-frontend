import { render, screen } from '@testing-library/svelte';
import TestComponent from '../TestComponent.svelte';

test("find text 'Studium suchen'", () => {
  render(TestComponent);
  const node = screen.queryByText('Studium suchen');
  expect(node).not.toBeNull();
});

test("find css class 'is_back'", () => {
  render(TestComponent);
  const node = screen.findAllByAltText('sindbad');
  expect(node).not.toBeNull();
});
