import React, { useEffect, useState } from 'react'
import { TouchableHighlight, Text, TextInput, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

const AutoComplete = ({ initOptions, onSelect, label, placeholder }) => {
  const [selected, setSelected] = useState({});
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setOptions(initOptions.filter(function (str) { return str.label.toLowerCase().includes(text.toLowerCase()); }));
  },
    [text]);

  const onHandleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setOptionsVisible(false);
  };

  const renderOptions = () => {
    if (!options.length) {
      return (
        <ScrollView style={styles.optionsContainer}>
          <TouchableHighlight
            activeOpacity={0.6}
            style={styles.option}
          >
            <Text>
              No hay coincidencias
            </Text>
          </TouchableHighlight>
        </ScrollView>
      )
    }

    return (
      <ScrollView style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableHighlight
            key={index}
            suggestionText={option.label}
            activeOpacity={0.6}
            style={styles.option}
            onPress={() => onHandleSelect(option)}
            underlayColor='white'
          >
            <Text>
              {option.label}
            </Text>
          </TouchableHighlight>
        ))
        }
      </ScrollView>
    )
  }

  return (
    <View >
      <TextInput
        onChangeText={(newValue) => {
          setSelected({});
          setText(newValue);
        }}
        label={label}
        style={styles.input}
        onBlur={() => { setOptionsVisible(true) }}
        placeholder={placeholder}
        value={selected.label}
      />
      {optionsVisible && renderOptions()}
    </View>
  );
}

export default AutoComplete

const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: 'white',
    padding: 10,
    maxHeight: 300,
  },
  option: {
    marginVertical: 5,
    borderBottomColor: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 15
  }
});
