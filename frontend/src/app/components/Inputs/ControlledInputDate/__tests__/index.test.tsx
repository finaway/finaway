import * as React from 'react';
import { render } from '@testing-library/react';

import { ControlledInputDate } from '..';

describe('<ControlledInputDate  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ControlledInputDate />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
