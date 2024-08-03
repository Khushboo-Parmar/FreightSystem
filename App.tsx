import React from 'react';
import AppNavigator from './src/assets/component/AppNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store , persistor} from './src/reduxFeatures/store'

//  let persistor =persistStore(store)


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
      <Toast />
      </PersistGate>
    </Provider>

  );
}

export default App;