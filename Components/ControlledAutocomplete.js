import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { Text, StyleSheet } from 'react-native';
import AutoComplete from './Autocomplete'

const ControlledAutocomplete = ({
  control,
  error,
  name,
  label,
  options,
  placeholder,
  autocompleteProps,
  controllerProps,
}) => {

  return (
    <Fragment>
      <Controller
        {...controllerProps}
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <AutoComplete
            {...autocompleteProps}
            onSelect={onChange}
            initOptions={options}
            value={value}
            label={label}
            placeholder={placeholder}
          />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </Fragment>
  )
};

export default ControlledAutocomplete;
const styles = StyleSheet.create({
  error: {
    color: 'red'
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingLeft: 15,
    width: '100%',
  },
});
