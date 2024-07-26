/**
 * @format
 */
// if (global.HermesInternal == null) {
//     import('react-native/Libraries/Core/Devtools/setupDevtools');
//   }
// if (global.HermesInternal == null) {
//     require('react-native/Libraries/Core/Devtools/setupDevtools')
// }

// if(__DEV__){
//     require('react-native/Libraries/Core/Devtools/')
// }
// import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


// if (__DEV__) {
//     // Open React Native Debugger
//     const connectToDevTools = require('react-devtools-core').connectToDevTools;
//     connectToDevTools({
//       host: 'localhost',
//       port: 8081,
//     });
//   }

AppRegistry.registerComponent(appName, () => App);
