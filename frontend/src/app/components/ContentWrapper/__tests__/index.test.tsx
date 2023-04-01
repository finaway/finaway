import * as React from 'react';
import { render } from '@testing-library/react';

import { ContentWrapper } from '..';

describe('<ContentWrapper  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <ContentWrapper>Hello World</ContentWrapper>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });

  it('should render the children', () => {
    const { getByText } = render(<ContentWrapper>Hello World</ContentWrapper>);
    expect(getByText('Hello World')).toBeInTheDocument();
  });
});
