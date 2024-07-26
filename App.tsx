import React from 'react';
import AppNavigator from './src/assets/component/AppNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/reduxFeatures/store';
import ComplainHistory from './src/assets/component/complain/ComplainHistory';



const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>

  );
}

export default App;