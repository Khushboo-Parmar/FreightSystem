// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// const OtpScreen = () => {

//   const phoneNumber = useSelector(state => state.phone.phoneNumber);

//   console.log('otp screen phoneNumber', phoneNumber);

//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   // const verifyCode = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await fetch(`${process.env.BASE_URL}submitUser-otp`, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         phone: phoneNumber,
//   //         otp: otp,
//   //       }),
//   //     });

//   //     const data = await response.json();
//   //     setLoading(false);

//   //     if (data.success) {
//   //       alert('Phone number verified successfully!');
//   //       navigation.navigate('SignUp');
//   //     } else {
//   //       alert('Failed to verify code. Please try again.');
//   //     }
//   //   } catch (error) {
//   //     setLoading(false);
//   //     console.error('Error verifying code:', error);
//   //     alert('Failed to verify code. Please try again.');
//   //   }
//   // };
//   const verifyCode = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.BASE_URL}submitUser-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           phone: phoneNumber,
//           otp: otp,
//         }),
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (data.status === 200) {
//         Alert.alert('Phone number verified successfully!');
      
//         navigation.navigate('SignUp', { token: data.token });
//       } else {
//         Alert.alert('Failed to verify code. Please try again.');
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error('Error verifying code:', error);
//       Alert.alert('Failed to verify code. Please try again.');
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Image style={styles.logo} source={require('../../Images/logoWithoutbg.png')} />
//       <Text style={styles.label}>Enter the OTP</Text>
//       <Text style={styles.label2}>Enter the code sent to {phoneNumber}.</Text>
//       <Text style={styles.label3}>Didn't get code?</Text>
//       <TextInput
//         style={styles.input}
//         value={otp}
//         onChangeText={setOtp}
//         keyboardType="numeric"
//         placeholder="OTP"
//         placeholderTextColor="#999"
//       />
//       {loading ? (
//         <ActivityIndicator size="large" color="#ee1d23" />
//       ) : (
//         <TouchableOpacity onPress={verifyCode} style={styles.verifyBtn}>
//           <Text style={styles.verifyBtnText}>Verify OTP</Text>
//         </TouchableOpacity>
//       )}
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
//     marginBottom: responsiveHeight(2),
//   },
//   label: {
//     fontSize: responsiveFontSize(2.5),
//     marginBottom: responsiveHeight(2),
//     textAlign: 'center',
//     color: 'black',
//     fontWeight: "500",
//   },
//   label2: {
//     fontSize: responsiveFontSize(1.8),
//     textAlign: 'center',
//     color: 'grey',
//   },
//   label3: {
//     fontSize: responsiveFontSize(1.8),
//     marginBottom: responsiveHeight(4),
//     textAlign: 'center',
//     color: 'grey',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: responsiveHeight(1.5),
//     marginBottom: responsiveHeight(3),
//     textAlign: 'center',
//     color: 'black',
//   },
//   verifyBtn: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ee1d23',
//     paddingVertical: responsiveHeight(2),
//     borderRadius: 25,
//     elevation: 2,
//     shadowColor: 'black',
//     shadowOffset: { width: 1, height: 4 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     marginTop: responsiveHeight(2),
//   },
//   verifyBtnText: {
//     color: '#fff',
//     fontSize: responsiveFontSize(2),
//   },
// });
// export default OtpScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const OtpScreen = () => {
  const phoneNumber = useSelector(state => state.phone.phoneNumber);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const verifyCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.BASE_URL}submitUser-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          otp: otp,
        }),
      });

      const data = await response.json();
      console.log('data', data);
      setLoading(false);

      if (data.status === 200) {
        Alert.alert('Phone number verified successfully!');
        navigation.navigate('SignUp', { token: data.token , userId: data.data.id});
        
      } else {
        Alert.alert('Failed to verify code. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error verifying code:', error);
      Alert.alert('Failed to verify code. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../Images/logoWithoutbg.png')} />
      <Text style={styles.label}>Enter the OTP</Text>
      <Text style={styles.label2}>Enter the code sent to {phoneNumber}.</Text>
      <Text style={styles.label3}>Didn't get code?</Text>
      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        placeholder="OTP"
        placeholderTextColor="#999"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#ee1d23" />
      ) : (
        <TouchableOpacity onPress={verifyCode} style={styles.verifyBtn}>
          <Text style={styles.verifyBtnText}>Verify OTP</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: responsiveHeight(2),
  },
  label: {
    fontSize: responsiveFontSize(2.5),
    marginBottom: responsiveHeight(2),
    textAlign: 'center',
    color: 'black',
    fontWeight: "500",
  },
  label2: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    color: 'grey',
  },
  label3: {
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(4),
    textAlign: 'center',
    color: 'grey',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: responsiveHeight(1.5),
    marginBottom: responsiveHeight(3),
    textAlign: 'center',
    color: 'black',
  },
  verifyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee1d23',
    paddingVertical: responsiveHeight(2),
    borderRadius: 25,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: responsiveHeight(2),
  },
  verifyBtnText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
});

export default OtpScreen;
