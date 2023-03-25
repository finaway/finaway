import * as React from 'react';
import { render } from '@testing-library/react';

import { ControlledSelect } from '..';

describe('<ControlledSelect  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ControlledSelect />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
