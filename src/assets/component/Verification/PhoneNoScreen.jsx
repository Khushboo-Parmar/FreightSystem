import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoneNumber } from '../../../reduxFeatures/content/phoneSlice';

const PhoneNoScreen = () => {
  const navigation = useNavigation();
  const [phoneNumberinput, setPhoneNumberInput] = useState('');

  const dispatch = useDispatch();
  const sendVerificationCode = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}requestUser-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumberinput,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        console.warn('Navigation to OtpScreen');
        dispatch(setPhoneNumber(phoneNumberinput));
   
        navigation.navigate('OtpScreen');
      } else {
        alert('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('Failed to send verification code. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../Images/logoWithoutbg.png')} />
      <Text style={styles.label}>Verify your phone number</Text>
      <Text style={styles.label2}>Please enter your mobile number to receive a verification code </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.phoneInput}
          value={phoneNumberinput}
          onChangeText={setPhoneNumberInput}
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
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(2),
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
    marginTop: responsiveHeight(2)
  },
  sendBtnText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    marginLeft: 8,
  },
});
export default PhoneNoScreen;
