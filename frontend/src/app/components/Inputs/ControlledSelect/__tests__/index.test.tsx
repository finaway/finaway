import { render, renderHook } from '@testing-library/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ControlledSelect } from '..';

interface FormValues {
  test: string;
}

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
];

describe('<ControlledSelect  />', () => {
  const { result } = renderHook(() => useForm<FormValues>());
  const { control } = result.current;

  it('should match snapshot', () => {
    const loadingIndicator = render(
      <ControlledSelect
        control={control}
        name="test"
        label="Input Test"
        options={options}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
