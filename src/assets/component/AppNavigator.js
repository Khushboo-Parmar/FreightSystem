import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './splash/SplashScreen';
import Dashboard from './Dashboard';
import LoginDashboard from './LoginDashboard';
import Login from './auth/Login';
import SearchStatus from './SearchStatus';
import Profile from './profile/Profile';
import SignUp from './auth/SignUp';
import ClaimForm from './complain/claim/ClaimForm';
import PhoneNoScreen from './Verification/PhoneNoScreen';
import OtpScreen from './Verification/OtpScreen';
import ClaimHistory from './complain/claim/ClaimHistory';
import Loginphone from './auth/Loginphone';
import UpdateProfile from './profile/UpdateProfile';
import AddProduct from './complain/claim/AddProduct';
import GeneralTerms from './policies/GeneralTerms';
import PrivacyPolicy from './policies/PrivacyPolicy';
import DisclaimerPolicy from './policies/DisclaimerPolicy';
import CustumerSupport from './policies/CustumerSupport';
import Help from '../Help';
// import CameraTaking from './complain/claim/CameraTaking';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['mychat://'],
  config: {
    screens: {
      SearchStatus: 'search-status',

    },
  },
};

const AppNavigator = () => {

  return (
    // <NavigationContainer linking={linking}>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="PhoneNoScreen" component={PhoneNoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="ClaimForm" component={ClaimForm} options={{ headerShown: false }} />
      <Stack.Screen name="ClaimHistory" component={ClaimHistory} options={{ headerShown: false }} />
      <Stack.Screen name="SearchStatus" component={SearchStatus} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="LoginDashboard" component={LoginDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Loginphone" component={Loginphone} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }} />
      <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
      <Stack.Screen name="GeneralTerms" component={GeneralTerms} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
      <Stack.Screen name="DisclaimerPolicy" component={DisclaimerPolicy} options={{ headerShown: false }} />
      <Stack.Screen name="CustumerSupport" component={CustumerSupport} options={{ headerShown: false }} />
      <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />

    </Stack.Navigator>
    //  </NavigationContainer>
  );
}

export default AppNavigator;