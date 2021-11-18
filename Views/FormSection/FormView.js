import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input, Button, Text } from '@ui-kitten/components';
import { useAuth } from '../../Contexts/AuthContext';


const FormView = () => {
  const [number, setNumber] = useState('');
  const [text, setText] = useState('');
  const { signOut } = useAuth();
  const onSyncData = () => {
    console.log('SYNC')
  };
  const onSubmit = () => {
    console.log('SUBMIT', { text: text, number: number })
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={async () => await signOut()}>Cerrar sesión</Button>
      </View>
      <View style={styles.head}>
        <Text>
          Formulario de prueba
        </Text>
        <Button onPress={onSyncData}>Sincronizar datos</Button>
      </View>
      <Input
        placeholder='Texto de prueba'
        value={text}
        onChangeText={nextValue => setText(nextValue)}
      />
      <Input
        placeholder='Número de prueba'
        value={number}
        onChangeText={nextValue => setNumber(nextValue)}
        inputProps={{
          keyboardType: "numeric"
        }}
      />
      <Button onPress={onSubmit}>Guardar Datos</Button>
    </View >
  );
}

export default FormView;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    with: '100%',
    padding: 25,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
  }
});
