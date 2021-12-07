import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import FormSection from '../Views/FormSection/FormSection';
import FormView from '../Views/FormSection/FormView';

import SalesSection from '../Views/SalesSection/SalesSection';
import SalesView from '../Views/SalesSection/SalesView';

import MenuSection from '../Views/MenuSection/MenuSection';
import MenuView from '../Views/MenuSection/MenuView';

import AddressSection from '../Views/AddressSection/AddressSection';
import AddressView from '../Views/AddressSection/AddressView';

import { Login } from '../Views/Login/Login';

const MainStack = createStackNavigator();
const MenuStack = createStackNavigator();
const FormStack = createStackNavigator();
const SalesStack = createStackNavigator();
const AddressStack = createStackNavigator();

export const MenuNavigator = () => (
  <MenuStack.Navigator headerMode="none">
    <MenuStack.Screen
      name="MenuView"
      component={MenuView}
      options={{ title: 'MenuView' }}
    />
  </MenuStack.Navigator>
);
export const FormNavigator = (props) => (
  <FormStack.Navigator headerMode="none">
    <FormStack.Screen
      {...props}
      name="FormView"
      component={FormView}
      options={{ title: 'FormView' }}
      p
    />
  </FormStack.Navigator>
);
export const SalesNavigator = () => (
  <SalesStack.Navigator headerMode="none">
    <SalesStack.Screen
      name="SalesView"
      component={SalesView}
      options={{ title: 'SalesView' }}
    />
  </SalesStack.Navigator>
);
export const AddressNavigator = () => (
  <AddressStack.Navigator headerMode="none">
    <AddressStack.Screen
      name="AddressView"
      component={AddressView}
      options={{ title: 'AddressView' }}
    />
  </AddressStack.Navigator>
);
const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator headerMode="none">
          <MainStack.Screen name="Login" component={Login} />
          <MainStack.Screen name="MenuSection" component={MenuSection} />
          <MainStack.Screen name="FormSection" component={FormSection} />
          <MainStack.Screen name="SalesSection" component={SalesSection} />
          <MainStack.Screen name="AddressSection" component={AddressSection} />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
