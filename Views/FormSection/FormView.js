import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import { Button, Text } from '@ui-kitten/components';
import * as yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlledSelect from '../../Components/ControlledSelect';
import ControlledInput from '../../Components/ControlledInput';
import { useData } from '../../Contexts/DataContext';
import { useAuth } from '../../Contexts/AuthContext';
import app from "../../realmApp";
import { Sale } from '../../schemas';

const schema = yup.object({
  salePersonId: yup.string().required('Requerido salePersonId'),
  itemId: yup.string().required('Requerido itemId'),
  quantity: yup.number().required('Requerido quantity'),
  total: yup.number().required('Requerido total'),
});

const FormView = ({ navigation }) => {
  const [user] = useState(app.currentUser);
  const { getRealm } = useAuth();
  const { data } = useData();
  console.log('DATA->', data);
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
    try {
      const realm = await getRealm();
      const sale = new Sale({
        ...data,
        quantity: Number(data.quantity),
        total: Number(data.total),
        _partition: `user=${user?.id}`,
      });
      realm.write(() => {
        realm.create(
          "Sales",
          sale
        );
      });
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
    Alert.alert('VENTA CREADA');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Button onPress={() => navigation.navigate("MenuSection")}>Volver</Button>
        </View>
        <View style={styles.head}>
          <Text>
            Registro de venta
          </Text>
        </View>
        <View style={styles.input}>
          <ControlledSelect
            control={control}
            name='salePersonId'
            label='Vendedor'
            selectOptions={data ? data?.salespeopleOptions : []}
            error={errors.salePersonId}
            selectProps={
              {
                placeholder: {

                  label: 'Seleccione un vendedor',
                  value: null,
                  color: '#9EA0A4',

                }
              }
            }
          />
        </View>
        <View style={styles.input}>
          <ControlledSelect
            control={control}
            name='itemId'
            label='Producto'
            selectOptions={data ? data?.itemsOptions : []}
            error={errors.itemId}
            textInputProps={{
              onEndEditing: async () => await trigger('itemId')
            }}
            selectProps={
              {
                placeholder: {

                  label: 'Seleccione un producto',
                  value: null,
                  color: '#9EA0A4',

                },
              }
            }
          />
        </View>
        <View style={styles.input}>
          <ControlledInput
            control={control}
            name='quantity'
            label='Cantidad'
            error={errors.quantity}
            inputProps={{
              keyboardType: "numeric"
            }} />
        </View>
        <View style={styles.input}>
          <ControlledInput
            control={control}
            name='total'
            error={errors.total}
            label='total'
            inputProps={{
              keyboardType: "numeric"
            }} />
        </View>
        <View style={styles.submitButton}>
          <Button onPress={onSubmit}>Guardar venta</Button>
        </View>
      </View >
    </ScrollView>
  );
}

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
  }
});
