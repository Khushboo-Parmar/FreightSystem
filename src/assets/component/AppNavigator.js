import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Form from './auth/Form';
import SplashScreen from './splash/SplashScreen';
import ComplainForm from './complain/ComplainForm';
import ComplainHistory from './complain/ComplainHistory';
import Dashboard from './Dashboard';
import LoginDashboard from './LoginDashboard';
import Login from './auth/Login';
import ComplainDetailsStatus from './complain/ComplainDetailsStatus';
import SearchStatus from './SearchStatus';
import Profile from './profile/Profile';
import Home from './auth/Home';
import SignUp from './auth/SignUp';
import ClaimForm from './complain/claim/ClaimForm';

import PhoneNoScreen from './Verification/PhoneNoScreen';
import OtpScreen from './Verification/OtpScreen';
import ClaimHistory from './complain/claim/ClaimHistory';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">

        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Form" component={Form} options={{ headerShown: false }} />
        <Stack.Screen name="LoginDashboard" component={LoginDashboard} options={{ headerShown: false }} />
        {/* <Stack.Screen name="ComplainForm" component={ComplainForm} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="ComplainHistory" component={ComplainHistory} options={{ headerShown: false }} /> */}
        <Stack.Screen name="ComplainDetailsStatus" component={ComplainDetailsStatus} options={{ headerShown: false }} />
        <Stack.Screen name="SearchStatus" component={SearchStatus} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ClaimForm" component={ClaimForm} options={{ headerShown: false }} />
        <Stack.Screen name="PhoneNoScreen" component={PhoneNoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ClaimHistory" component={ClaimHistory} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;