import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Alert } from 'react-native'
import { Button, Modal, Spinner } from '@ui-kitten/components';
import { useData } from '../../Contexts/DataContext';
import { TrashIcon } from '../../Components/Icons';
import { useAuth } from '../../Contexts/AuthContext';

const SalesView = ({ navigation }) => {
  const { getRealm, getLocalRealm } = useAuth();
  const { findNameById, data } = useData();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) {
      Alert.alert('Error', `Datos no encontrados, favor sincronizar en el menú de la aplicación`);
    }
  }, [data]);


  const fetchSalesListCall = () => {
    getRealm().then(realm => {
      console.log('ENTRE')
      const salesList = realm.objects('Sales');
      console.log('SALES -> ', salesList);
      setSales(salesList);
      setLoading(false);
      return () => {
        realm.close();
      };
    }).catch(error => {
      setLoading(false);
      console.log(error, 'ERROR');
    });
  };

  const deleteSale = async (id) => {
    try {
      const realm = await getRealm();
      const deleteSale = realm.objectForPrimaryKey('Sales', id);
      realm.write(() => {
        if (deleteSale) {
          realm.delete(deleteSale);
        }
      });
      const results = realm.objects('Sales');
      setSales(results);
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  }
  const deleteLocalSale = async (id) => {
    console.log('ENTRE')
    try {
      const realm = await getLocalRealm();
      const deleteSale = realm.objectForPrimaryKey('Sales', id);
      realm.write(() => {
        if (deleteSale) {
          realm.delete(deleteSale);
        }
      });
      const results = realm.objects('Sales');
      setSales(results);
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    return fetchSalesListCall();
  }, []);

  const renderSales = (salesList, type) => {
    if (salesList && salesList.length !== 0) {
      return salesList.map((sale, key) => {
        return (
          <View style={styles.sale} key={sale._id}>
            <Text>{key}</Text>
            <Text>{findNameById(sale.itemId, 'items')}</Text>
            <Text>{findNameById(sale.salePersonId, 'salespeople')}</Text>
            <Text>{sale.quantity}</Text>
            <Text>{sale.total}</Text>
            <Text>{sale.total}</Text>
            <Button
              accessoryLeft={TrashIcon}
              status='danger'
              size='small'
              onPress={() => { type === 'local' ? deleteLocalSale(sale._id) : deleteSale(sale._id) }}
            />
          </View>
        )
      });
    }
    return (
      <View style={styles.container}>
        <Text>No hay ventas</Text>
      </View>
    );
  };


  return (
    <ScrollView>
      <Modal visible={loading} backdropStyle={styles.backdrop}>
        <Spinner></Spinner>
      </Modal>
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Button onPress={() => fetchSalesListCall()}>Actualizar</Button>
          <Button onPress={() => navigation.navigate("MenuSection")}>Volver</Button>
        </View>
        <View style={styles.salesContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>VENTAS MONGO</Text>
          </View>
          <View style={styles.headTable} >
            <Text>Id</Text>
            <Text>Item ID</Text>
            <Text>Vendedor ID</Text>
            <Text>Cantidad</Text>
            <Text>Total</Text>
            <Text></Text>
          </View>
          {renderSales(sales)}
        </View>
      </View >
    </ScrollView>
  );
}

export default SalesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    with: '100%',
    padding: 25,
  },
  headerActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  salesContainer: {
    marginVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',

  },
  headTable: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e3e8f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sale: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleContainer: {
    marginTop: 25,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});
