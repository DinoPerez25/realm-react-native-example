/* Libraries */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../Contexts/AuthContext';
import { FormNavigator } from '../../Routes/Navigation';

const FormSection = ({ navigation }) => {
  const { user } = useAuth();
  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <FormNavigator />
    </View>
  );
};

export default FormSection;

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
