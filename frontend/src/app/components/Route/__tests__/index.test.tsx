import * as React from 'react';
import { render } from '@testing-library/react';

import { Route } from '..';

describe('<Route  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Route />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
