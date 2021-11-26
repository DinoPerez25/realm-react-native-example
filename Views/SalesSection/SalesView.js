import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Alert } from 'react-native'
import { Button } from '@ui-kitten/components';
import { useSales } from '../../Contexts/SalesContext';
import { useData } from '../../Contexts/DataContext';

const SalesView = ({ navigation }) => {
  const { getSales, sales } = useSales();
  const { findNameById, data } = useData();

  console.log('Data-> ', data);
  useEffect(() => {
    if (!data) {
      Alert.alert('Error', `Datos no encontrados, favor sincronizar en el menú de la aplicación`);
    }
  }, [data]);

  const renderSales = () => {
    if (sales) {
      return sales.map((sale, key) => {
        return (
          <View style={styles.sale} key={sale._id}>
            <Text>{key}</Text>
            <Text>{findNameById(sale.itemId, 'items')}</Text>
            <Text>{findNameById(sale.salePersonId, 'salespeople')}</Text>
            <Text>{sale.quantity}</Text>
            <Text>{sale.total}</Text>
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
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Button onPress={() => getSales()} disabled={!data}>Actualizar ventas</Button>
          <Button onPress={() => navigation.navigate("MenuSection")}>Volver</Button>
        </View>
        <View style={styles.salesContainer}>
          <View style={styles.headTable} >
            <Text>Id</Text>
            <Text>Item ID</Text>
            <Text>Vendedor ID</Text>
            <Text>Cantidad</Text>
            <Text>Total</Text>
          </View>
          {renderSales()}
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
  }
});
