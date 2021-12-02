import React, { Fragment } from 'react';
import { Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Controller } from 'react-hook-form';

const ControlledSelect = ({
  control,
  error,
  name,
  label,
  selectOptions,
  selectProps,
  controllerProps,
  textInputProps,
}) => {
  return (
    <Fragment>
      <Controller
        {...controllerProps}
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <RNPickerSelect
            {...selectProps}
            style={styles.input}
            textInputProps={textInputProps}
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
      {error && <Text style={styles.error}>{error.message}</Text>}
    </Fragment>
  )
};

export default ControlledSelect;
const styles = StyleSheet.create({
  error: {
    color: 'red'
  },
  input: {
    backgroundColor: 'gray',
    marginHorizontal: 50,
  },
});
