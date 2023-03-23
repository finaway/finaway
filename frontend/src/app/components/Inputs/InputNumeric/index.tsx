import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface InputNumericProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const InputNumeric = React.forwardRef<
  NumericFormatProps,
  InputNumericProps
>(function InputNumeric(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});
