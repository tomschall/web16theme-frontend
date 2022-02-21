import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';

import TestSelect from '../components/shared/TestSelect.svelte';

describe('Component', () => {
  test('Should render', () => {
    const { container } = render(TestSelect);
    expect(true);
  });
});
