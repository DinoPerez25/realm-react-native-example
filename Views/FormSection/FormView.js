import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import * as yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlledInput from '../../Components/ControlledInput';
import app from '../../realmApp';
import { Order } from '../../schemas';
import { getPrivateRealm } from '../../Database';

const schema = yup.object({
  description: yup.string().required('Requerido description'),
});

const FormView = ({ navigation, route }) => {
  const { selectedAddress } = route.params;
  const [user] = useState(app.currentUser);
  const { control, trigger, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const { errors } = useFormState({ control });
  const onSubmit = async () => {
    if (!(await trigger())) {
      console.log('ERRORS->', errors);
      return;
    }
    console.log('HERE');
    const data = getValues();
    console.log(data, selectedAddress);
    /*try {
      const realm = await getPrivateRealm();
      const order = new Order({
        ...data,
        ...selectedAddress,
        _partition: `user=${user?.id}`,
      });
      realm.write(() => {
        realm.create('Order', order);
      });
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }*/
    Alert.alert('VENTA CREADA');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Button onPress={() => navigation.navigate('AddressSection')}>
            Volver
          </Button>
        </View>
        <View style={styles.head}>
          <Text>Registro de venta</Text>
        </View>
        <View style={styles.input}>
          <ControlledInput
            control={control}
            name="description"
            label="Descripción de la orden"
            error={errors.description}
          />
        </View>
        <View style={styles.submitButton}>
          <Button onPress={onSubmit}>Guardar orden</Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default FormView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    with: '100%',
    padding: 20,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
  },
  headerActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    marginVertical: 5,
  },
  submitButton: {
    marginVertical: 5,
  },
});
