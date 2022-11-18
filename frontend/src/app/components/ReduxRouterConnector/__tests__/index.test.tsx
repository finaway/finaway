import * as React from 'react';
import { render } from '@testing-library/react';

import { ReduxRouterConnector } from '..';

describe('<ReduxRouterConnector  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ReduxRouterConnector />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
