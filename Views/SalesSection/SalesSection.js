/* Libraries */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../Contexts/AuthContext';
import { SalesNavigator } from '../../Routes/Navigation';

const SalesSection = ({ navigation }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <SalesNavigator />
    </View>
  );
};

export default SalesSection;

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
