/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
/* eslint-disable max-nested-callbacks */
import React, { useCallback, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Modal, Spinner } from '@ui-kitten/components';
import ControlledInput from '../../Components/ControlledInput';
import Button from '../../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchAddresses } from '../../API/get-addresses-api';
import { getPublicRealm } from '../../Database';
import { Address } from '../../schemas';

const size = 10000;
let currentPage = 0;
const pages = 130;
const schema = yup.object({
  address: yup.string().required('Debe digitar una direccion a buscar').trim(),
});

const AddressView = ({ navigation }) => {
  const [countDB, setCountDB] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addressesFiltered, setAddressesFiltered] = useState([]);
  const [counter, setCounter] = useState(0);

  const { control, trigger, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const { errors } = useFormState({ control });

  const getData = useCallback(async () => {
    setLoading(true);
    setCounter(0);
    try {
      while (currentPage < pages) {
        console.log(`${currentPage}/${pages}`);
        const response = await fetchAddresses(currentPage, size);
        const data = response.data.data;
        const list = data.addresses;
        const realm = await getPublicRealm();
        await realm.write(() => {
          list.map((address) => {
            const newAddress = new Address({
              addressId: Number(address?.addressId),
              department: address?.department,
              departmentId: Number(address?.departmentId),
              fullAddress: address?.fullAddress,
            });
            realm.create('Addresses', newAddress);
          });
        });
        setCounter(currentPage);
        currentPage += 1;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      await AsyncStorage.setItem('progressSyncData', currentPage);
      console.log(error, 'getAddresses()');
    }
  }, [setCounter]);

  const getObjectValues = (array) => {
    return array.map((item) => {
      return JSON.parse(JSON.stringify(item));
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    if (!(await trigger())) {
      setLoading(false);
      console.log('ERRORS->', errors);
      return;
    }
    const data = getValues();
    const { address } = data;

    const realm = await getPublicRealm();
    setAddressesFiltered(
      getObjectValues(
        realm
          .objects('Addresses')
          .filtered(`fullAddress LIKE[c] "*${address}*"`)
          .slice(0, 10)
      )
    );
    setLoading(false);
  };

  const renderFilteredAddresses = () => {
    if (addressesFiltered.length === 0) {
      return (<Text>Oopsie</Text>);
    }
    return addressesFiltered.map((item) => {
      return (
        <View style={styles.addressCard} key={item.addressId}>
          <Text>{item.addressId}</Text>
          <Text>{item.fullAddress}</Text>
        </View>
      );
    });
  };

  const countAll = async () => {
    const realm = await getPublicRealm();
    setCountDB(realm.objects('Addresses').length);
  };

  return (
    <ScrollView style={styles.container}>
      <Modal visible={loading}>
        <Spinner />
      </Modal>
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Button onPress={() => getData()}>{`Sync: ${counter}/${pages}`}</Button>
          <Button onPress={() => countAll()}>{`Count all: ${countDB}`}</Button>
          <Button onPress={() => navigation.navigate('MenuSection')}>
            Volver
          </Button>
        </View>
        <View style={styles.head}>
          <Text>Busqueda de dirección</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formRow}>
            <View style={styles.input}>
              <ControlledInput
                control={control}
                name="address"
                label="Direccción"
                error={errors.address}
              />
            </View>
            <View>
              <Button onPress={() => onSubmit()}>Enviar</Button>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.headerActions}>
            <View />
            <View>
              <Text>cantidad:{`Sync: ${currentPage}/${pages}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.addressesContainer} />
        {renderFilteredAddresses()}
      </View>
    </ScrollView>
  );
};

export default AddressView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    with: '100%',
    padding: 20,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  submitButton: {
    marginVertical: 5,
  },
  formContainer: {
    width: '100%',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  addressesContainer: {},
  addressCard: {
    backgroundColor: 'white',
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
