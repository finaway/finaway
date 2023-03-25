import * as React from 'react';
import { render } from '@testing-library/react';

import { ControlledInputNumeric } from '..';

describe('<ControlledInputNumeric  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ControlledInputNumeric />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
