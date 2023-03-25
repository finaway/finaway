import * as React from 'react';
import { render } from '@testing-library/react';

import { ControlledInputText } from '..';

describe('<InputControlled  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ControlledInputText />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
