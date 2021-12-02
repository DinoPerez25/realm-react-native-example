import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, } from 'react-native'
import { Button, Text } from '@ui-kitten/components';
import { useAuth } from '../../Contexts/AuthContext';
import { initPublicRealm } from '../../Database';

const MenuView = ({ navigation }) => {
  const { signOut, user } = useAuth();

  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    console.log('APP INIT, user? ->', user?.id)
    console.log('CARGANDO INIT PUBLIC REALM', user?.id)
    if (user) {
      initPublicRealm(user).then(() => setLoaded(true)).catch(error => console.log(error, 'initPublicRealm()'));
    }
  }, [setLoaded, user]);

  if (!loaded) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Cargando...</Text>
        </View >
      </ScrollView>
    )
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Button onPress={async () => await signOut()}>Cerrar sesión</Button>
        </View>
        <View style={styles.body}>
          <Button onPress={() => navigation.navigate("AddressSection")} style={styles.button}>Buscar dirección</Button>
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
