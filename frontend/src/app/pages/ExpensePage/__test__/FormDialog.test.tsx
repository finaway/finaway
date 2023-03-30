import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FormDialog } from '../FormDialog';
import { TestWrapper } from 'test-utils/TestWrapper';

describe('FormDialog', () => {
  it('renders the dialog title and buttons', () => {
    const { getByText } = render(
      <TestWrapper>
        <FormDialog open={true} onClose={jest.fn()} />,
      </TestWrapper>,
    );

    expect(getByText('Add Expense')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Add')).toBeInTheDocument();
  });

  it('triggers the onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <FormDialog open={true} onClose={onClose} />
      </TestWrapper>,
    );

    fireEvent.click(getByText('Cancel'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
