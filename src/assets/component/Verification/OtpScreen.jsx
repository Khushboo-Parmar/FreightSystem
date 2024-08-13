import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const OtpScreen = () => {
  const phoneNumber = useSelector(state => state.phone.phoneNumber);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const inputRefs = useRef([]);
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
        Toast.show({
          type: 'success',
          text1: 'Phone number verified successfully!',
        });
        navigation.navigate('SignUp', { token: data.token , userId: data.data.id});
        
      } else {
        setOtp('');
        inputRefs.current.forEach(ref => ref.clear());
        Toast.show({
          type: 'error',
          text1: 'Failed to verify code',
          text2: 'Please try again.',
        });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error verifying code:', error);
      setOtp('');
      inputRefs.current.forEach(ref => ref.clear());
      Toast.show({
        type: 'error',
        text1: 'Failed to verify code',
        text2: 'Please try again.',
      });
    }
  };

  const handleResend = async () => {
    try {
        const response = await fetch(`${process.env.BASE_URL}requestUser-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phoneNumber,
            }),
        });
        const data = await response.json();
        console.warn('Response data:', data);

        if (response.status === 200) {
            Toast.show({
                type: 'success',
                text1: 'OTP Resent',
                text2: 'A new OTP has been sent to your phone.',
            });
        } else {
            console.error('Resend OTP failed', data.message);
            Toast.show({
                type: 'error',
                text1: 'Resend OTP Failed',
                text2: data.message,
            });
        }
    } catch (error) {
        console.error('Error occurred during OTP resend', error);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occurred while resending OTP. Please try again.',
        });
    }
};
const focusNextInput = (index) => {
  if (index < 5) {
      inputRefs.current[index + 1].focus();
  }
};

  return (
    <View style={styles.container}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="chevron-left" size={responsiveFontSize(2)} color="black" />
      </TouchableOpacity>
      <Image style={styles.logo} source={require('../../Images/logoWithoutbg.png')} />
      <Text style={styles.label}>Enter the OTP</Text>
      <Text style={styles.label2}>Enter the code sent to {phoneNumber}.</Text>
      

                <Text style={styles.label}>
                    <Icon name="lock" size={20} color="#ee1d23" /> {' '} OTP
                </Text>

                <View style={styles.otpContainer}>
                    {[...Array(6)].map((_, i) => (
                        <TextInput
                            key={i}
                            ref={(ref) => (inputRefs.current[i] = ref)}
                            style={styles.otpInput}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                let otpText = otp.split('');
                                otpText[i] = text;
                                setOtp(otpText.join(''));
                                if (text) focusNextInput(i);
                            }}
                            value={otp[i] || ''}
                        />
                    ))}
                </View>
       <TouchableOpacity onPress={handleResend}>
       <Text style={styles.label3}>Didn't get code?</Text>
                    <Text style={styles.buttonText2}>Resend OTP</Text>
                </TouchableOpacity>

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
    marginBottom:responsiveHeight(2),
  },
  label3: {
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(1),
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

  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    letterSpacing: 1.5
},
buttonText2: {
    alignSelf: 'center',
    color: 'red',
    fontSize: responsiveFontSize(1.8)
},
bgImagelogin: {
  height: responsiveHeight(30),
  width: responsiveWidth(100),
},
bigHeading: {
  fontSize: responsiveFontSize(2.5),
  fontWeight: 'bold',
  marginBottom: responsiveHeight(1),
  color: 'black',
  alignSelf: 'center',
},
smallPara: {
  fontSize: responsiveFontSize(1.8),
  color: '#666',
  alignSelf: 'center',
  marginBottom: responsiveHeight(2)
},

otpContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: responsiveHeight(2),
},
otpInput: {
  height: responsiveHeight(6),
  width: responsiveWidth(12),
  borderColor: 'gray',
  borderWidth: 1,
  marginBottom: responsiveHeight(2),
  padding: responsiveHeight(1.8),
  borderRadius: 10,
  backgroundColor: '#fff',
  color: "black",
  textAlign: 'center',
  fontSize: responsiveFontSize(2),
},
spaceBetween: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: responsiveHeight(2),
},
smallHeading: {
  fontSize: responsiveFontSize(2),
  color: '#333',
},
button: {
  backgroundColor: 'black',
  padding: responsiveHeight(2.2),
  borderRadius: 30,
  alignItems: 'center',
  marginTop: responsiveHeight(2),
},
backButton: {
  marginLeft: responsiveWidth(1),
  width: responsiveWidth(10),
  height: responsiveHeight(5),
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:responsiveHeight(3),
  position:'absolute',
  top:10
},
});

export default OtpScreen;
