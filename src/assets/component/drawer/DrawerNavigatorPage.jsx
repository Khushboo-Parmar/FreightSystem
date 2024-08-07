import React from 'react';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import AppNavigator from '../AppNavigator';
import CustumDrawerContent from './CustumDrawerContent';
import ClaimHistory from '../complain/claim/ClaimHistory';

const Drawer = createDrawerNavigator();

const DrawerNavigatorPage = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustumDrawerContent {...props} />}
    >
      <Drawer.Screen name="AppNavigator" component={AppNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorPage;
