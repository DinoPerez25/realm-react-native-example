import React, { Fragment } from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';

const ControlledInput = ({
  control,
  name,
  error,
  label,
  inputProps,
  controllerProps,
}) => {
  return (
    <Fragment>
      <Text>{label}</Text>
      <Controller
        {...controllerProps}
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...inputProps}
            onBlur={(event) => {
              onBlur(event);
              if (inputProps?.onBlur) {
                inputProps.onBlur(event);
              }
            }}
            label={label}
            style={styles.inputStyle}
            onChangeText={(value) => {
              onChange(value);
            }}
            value={value}
          />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </Fragment>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingLeft: 15,
    width: '100%',
  },
  error: {
    color: 'red',
  },
});
