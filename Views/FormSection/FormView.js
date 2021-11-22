import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text } from '@ui-kitten/components';
import { useAuth } from '../../Contexts/AuthContext';
import * as yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlledSelect from '../../Components/ControlledSelect';
import ControlledInput from '../../Components/ControlledInput';
import { useData } from '../../Contexts/DataContext';
import { useSales } from '../../Contexts/SalesContext';
import app from "../../realmApp";

const schema = yup.object({
  salePersonId: yup.string().required('Requerido salePersonId'),
  itemId: yup.string().required('Requerido itemId'),
  quantity: yup.number().required('Requerido total'),
  total: yup.number().required('Requerido total'),
});

const FormView = () => {
  const [user] = useState(app.currentUser);
  const { signOut } = useAuth();
  const { createSale } = useSales();
  const { data, syncData } = useData();
  const { control, trigger, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const { errors } = useFormState({ control });

  const onSyncData = async () => {
    console.log('SYNC')
    await syncData()
  };

  const onSubmit = async () => {
    if (!(await trigger())) {
      console.log('ERRORS->', errors);
      return;
    }
    const data = getValues();
    createSale({
      ...data,
      quantity: Number(data.quantity),
      total: Number(data.total),
      _partition: `user=${user?.id}`,
    });
    console.log('SALE CREADA');
  };


  return (
    <ScrollView>

      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Button onPress={() => onSyncData()}>Sincronizar datos</Button>
          <Button onPress={async () => await signOut()}>Cerrar sesión</Button>
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
            selectOptions={data ? data?.salespeople : []}
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
            selectOptions={data ? data?.items : []}
            selectProps={
              {
                placeholder: {

                  label: 'Seleccione un producto',
                  value: null,
                  color: '#9EA0A4',

                }
              }
            }
          />
        </View>
        <View style={styles.input}>
          <ControlledInput
            control={control}
            name='quantity'
            label='Cantidad'
            inputProps={{
              keyboardType: "numeric"
            }} />
        </View>
        <View style={styles.input}>
          <ControlledInput
            control={control}
            name='total'
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
    padding: 25,
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
    justifyContent: 'space-between',

  },
  input: {
    marginVertical: 10,
  },
  submitButton: {
    marginVertical: 10,
  }
});
