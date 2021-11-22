import React from 'react'; import
RNPickerSelect from 'react-native-picker-select';
import { Controller } from 'react-hook-form';

const ControlledSelect = ({
  control,
  name,
  label,
  selectOptions,
  selectProps,
  controllerProps,
}) => {
  return (
    <Controller
      {...controllerProps}
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <RNPickerSelect
          {...selectProps}
          onBlur={(event) => {
            onBlur(event);
            if (selectProps.onBlur) {
              selectProps.onBlur(event);
            }
          }}
          label={label}
          onSelect={(index) => onChange(index)}
          onValueChange={(value) => onChange(value)}
          items={selectOptions}
          value={value}
        />
      )}
    />
  )
};

export default ControlledSelect;
