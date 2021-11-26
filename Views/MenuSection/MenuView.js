import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, } from 'react-native'
import { Button, Modal, Spinner } from '@ui-kitten/components';
import { useAuth } from '../../Contexts/AuthContext';
import { useData } from '../../Contexts/DataContext';

const MenuView = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();
  const { fetchDataCall } = useData();

  useEffect(() => {
    setLoading(true);
    fetchDataCall();
    setLoading(false);
  }, []);

  return (
    <ScrollView>
      <Modal visible={loading} backdropStyle={styles.backdrop}>
        <Spinner></Spinner>
      </Modal>
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Button onPress={async () => await signOut()}>Cerrar sesión</Button>
        </View>
        <View style={styles.body}>
          <Button onPress={() => navigation.navigate("FormSection")} style={styles.button}>Crear venta</Button>
          <Button onPress={() => navigation.navigate("SalesSection")} style={styles.button}>Ver ventas</Button>
        </View>
      </View >
    </ScrollView>
  );
}

export default MenuView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    with: '100%',
    padding: 25,
  },
  headerActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }, backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  body: {
    marginVertical: 25,
  },
  button: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
});
