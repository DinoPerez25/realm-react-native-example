import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import FormSection from '../Views/FormSection/FormSection';
import FormView from '../Views/FormSection/FormView';
import { Login } from '../Views/Login/Login';

const MainStack = createStackNavigator();
const FormStack = createStackNavigator();

export const FormNavigator = () => (
  <FormStack.Navigator headerMode="none">
    <FormStack.Screen name="FormView" component={FormView} options={{ title: "FormView" }} />
  </FormStack.Navigator>
);
const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator headerMode="none">
          <MainStack.Screen name="Login" component={Login} />
          <MainStack.Screen name="FormSection" component={FormSection} />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
