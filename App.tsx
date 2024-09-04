import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/assets/component/AppNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/reduxFeatures/store'
import DrawerNavigatorPage from './src/assets/component/drawer/DrawerNavigatorPage';
import { NavigationContainer } from '@react-navigation/native';
//  let persistor =persistStore(store)
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const App = () => {
  return (
    // <SafeAreaProvider style={{ paddingVertical: responsiveHeight(3.2), backgroundColor: 'white' }}>
<SafeAreaProvider> 
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <DrawerNavigatorPage />
          </NavigationContainer>

          <Toast />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>

  );
}

export default App;