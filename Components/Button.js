import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const getAppearanceText = (appearance) => {
  switch (appearance) {
    case 'filled':
      return 'filledText';
    case 'outline':
      return 'outlineText';
    case 'ghost':
      return 'ghostText';
  }
};

const Button = ({
  onPress,
  disabled,
  style,
  appearance = 'filled',
  children,
}) => {
  const appearanceText = getAppearanceText(appearance);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[appearance],
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[appearanceText],
          disabled && styles.disabledText,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 45,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    marginHorizontal: 4,
  },
  filled: { backgroundColor: '#3366FF', borderColor: '#3366FF' }, //color-primary-default
  outline: {
    backgroundColor: 'rgba(51, 102, 255, 0.08)', //color-primary-transparent-100
    borderColor: '#3366FF', //color-primary-default
  },
  ghost: { backgroundColor: 'transparent', borderColor: 'transparent' },
  disabled: {
    backgroundColor: 'rgba(143, 155, 179, 0.24)',
    borderColor: 'rgba(143, 155, 179, 0.24)', //color-basic-disabled-border
  },
  filledText: { color: '#FFFFFF' },
  outlineText: { color: '#3366FF' },
  ghostText: { color: '#3366FF' },
  disabledText: { color: 'rgba(143, 155, 179, 0.48)' }, //text-disabled-color
  text: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
