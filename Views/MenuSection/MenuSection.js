/* Libraries */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../Contexts/AuthContext';
import { MenuNavigator } from '../../Routes/Navigation';

const MenuSection = ({ navigation }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <MenuNavigator />
    </View>
  );
};

export default MenuSection;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
