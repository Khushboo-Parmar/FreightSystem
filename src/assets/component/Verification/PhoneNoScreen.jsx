// without redux

// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const PhoneNoScreen = () => {
//   const navigation = useNavigation();
//   const [countryCode, setCountryCode] = useState('+91');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const sendVerificationCode = async () => {
//     console.warn(phoneNumber);
//     console.warn(countryCode);
//     try {
//       const response = await fetch('http://192.168.0.192:3000/api/send-verification-code', {
//       // const response = await fetch('http://192.168.29.223:3000/api/send-verification-code', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           number: phoneNumber,
//           code: countryCode,
//         }),
//       });
//       const data = await response.json();
//       console.log('Response data:', data);
//       navigation.navigate('OtpScreen', { phoneNumber });
//     } catch (error) {
//       console.error('Error sending verification code:', error);
//       alert('Failed to send verification code. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.logo} source={require('../../Images/logoWithoutbg.png')} />
//       <Text style={styles.label}>Verify your phone number</Text>
//       <Text style={styles.label2}>Please enter your mobile number to receive a verification code </Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.countryCodeInput}
//           value={countryCode}
//           onChangeText={setCountryCode}
//           keyboardType="phone-pad"
//           placeholderTextColor="gray"
//         />
//         <TextInput
//           style={styles.phoneInput}
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           keyboardType="phone-pad"
//           placeholder="Phone Number"
//           placeholderTextColor="gray"
//         />
//       </View>

//       <TouchableOpacity onPress={sendVerificationCode} style={styles.sendBtn}>
//         <Icon name="send" size={20} color="#fff" />
//         <Text style={styles.sendBtnText}>SEND OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: responsiveWidth(5),
//     backgroundColor: '#fff',
//   },
//   logo: {
//     width: responsiveWidth(50),
//     height: responsiveHeight(20),
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginBottom: responsiveHeight(3),
//   },
//   label: {
//     fontSize: responsiveFontSize(2.5),
//     textAlign: 'center',
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   label2: {
//     fontSize: responsiveFontSize(1.8),
//     marginBottom: responsiveHeight(4),
//     textAlign: 'center',
//     color: 'grey',
//     // fontWeight: 'bold',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     marginBottom: responsiveHeight(3),
//     paddingHorizontal: responsiveWidth(2),
//     // paddingVertical: responsiveHeight(1),
//   },
//   countryCodeInput: {
  
//     padding: responsiveHeight(1.5),
//     color: '#333',
//   },
//   phoneInput: {
 
//     padding: responsiveHeight(1.5),
//     color: 'black',
//   },
//   sendBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ee1d23',
//     paddingVertical: responsiveHeight(2),
//     borderRadius: 25,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     marginTop:responsiveHeight(2)
//   },
//   sendBtnText: {
//     color: '#fff',
//     fontSize: responsiveFontSize(2),
//     marginLeft: 8,
//   },
// });

// export default PhoneNoScreen;



// with redux
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setPhoneNumber } from '../../../reduxFeatures/content/phoneSlice';

const PhoneNoScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const phoneNumber = useSelector(state => state.phone.phoneNumber);
console.log('rr p no', phoneNumber);
  const [countryCode, setCountryCode] = useState('+91');

  const sendVerificationCode = async () => {
    console.warn(phoneNumber);
    console.warn(countryCode);
    try {
      const response = await fetch('http://192.168.0.192:3000/api/send-verification-code', {
      // const response = await fetch('http://192.168.29.223:3000/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: phoneNumber,
          code: countryCode,
        }),
      });
      const data = await response.json();
      console.log('Response data:', data);
      navigation.navigate('OtpScreen', { phoneNumber });
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('Failed to send verification code. Please try again.');
    }
  };

  const handlePhoneNumberChange = (value) => {
    dispatch(setPhoneNumber(value)); 
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../Images/logoWithoutbg.png')} />
      <Text style={styles.label}>Verify your phone number</Text>
      <Text style={styles.label2}>Please enter your mobile number to receive a verification code </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.countryCodeInput}
          value={countryCode}
          onChangeText={setCountryCode}
          keyboardType="phone-pad"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange} // Update phoneNumber in Redux store
          keyboardType="phone-pad"
          placeholder="Phone Number"
          placeholderTextColor="gray"
        />
      </View>

      <TouchableOpacity onPress={sendVerificationCode} style={styles.sendBtn}>
        <Icon name="send" size={20} color="#fff" />
        <Text style={styles.sendBtnText}>SEND OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: responsiveHeight(3),
  },
  label: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  label2: {
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(4),
    textAlign: 'center',
    color: 'grey',
    // fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(2),
    // paddingVertical: responsiveHeight(1),
  },
  countryCodeInput: {
  
    padding: responsiveHeight(1.5),
    color: '#333',
  },
  phoneInput: {
 
    padding: responsiveHeight(1.5),
    color: 'black',
  },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee1d23',
    paddingVertical: responsiveHeight(2),
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop:responsiveHeight(2)
  },
  sendBtnText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    marginLeft: 8,
  },
});

export default PhoneNoScreen;
