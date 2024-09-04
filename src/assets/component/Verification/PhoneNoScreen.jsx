import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoneNumber } from '../../../reduxFeatures/content/phoneSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
const PhoneNoScreen = () => {
  const navigation = useNavigation();
  const [phoneNumberinput, setPhoneNumberInput] = useState('');

  const dispatch = useDispatch();
  const sendVerificationCode = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}send-otp`, {
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
        dispatch(setPhoneNumber(phoneNumberinput));
        Toast.show({
            type: 'success',
            text1: 'Verification code sent successfully.',
            text2: 'Please check your messages to proceed.',
        });
        navigation.navigate('OtpScreen');
    } else if (response.status === 400 && data.message === "Phone number already exists.") {
        Toast.show({
            type: 'error',
            text1: 'Phone number already exists.',
            text2: 'Please proceed to login.',
        });
        navigation.navigate('Loginphone');
    } else {
        Toast.show({
            type: 'error',
            text1: 'Failed to send verification code.',
            text2: 'Please try again later.',
        });
    }
    
    } catch (error) {
      console.error('Error sending verification code:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to send verification code',
        text2: 'Please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        {/* <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="black" /> */}
        <FontAwesome name="chevron-left" size={responsiveFontSize(2)} color="black" />
      </TouchableOpacity>

      <View style={{alignItems:'center'}}>
           <Image style={[styles.bgImagelogin,{alignItems:'center',       height: responsiveWidth(25),
        width: responsiveWidth(25),}]} source={require('../../Images/BTIcon.png')} />
           </View>
      {/* <Text style={styles.label}>Verify your phone number</Text> */}
     <View>
     <Text style={styles.label}>Register your phone number</Text>
      <Text style={styles.label2}>Please enter your mobile number to receive a {'\n'} verification code </Text>
      <Text style={[styles.labelphone,{textAlign:'center',marginBottom:responsiveHeight(3)}]}>
        <Icon name="user" size={18} color="#ee1d23" /> {' '}Enter The Phone Number
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="#aaa"
        onChangeText={setPhoneNumberInput}
        value={phoneNumberinput}
        autoCapitalize="none"
      />
            <TouchableOpacity onPress={sendVerificationCode} style={styles.sendBtn}>
        <Icon name="send" size={15} color="#fff" />
        <Text style={styles.sendBtnText}>SEND OTP</Text>
      </TouchableOpacity>
     </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
    gap:responsiveHeight(13)
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: responsiveHeight(3),
  },
  label: {
    fontSize: responsiveFontSize(2.8),
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginBottom:responsiveHeight(1)
  },
  labelphone: {
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(1),
    color: 'black',
    fontWeight: "600"
  },
  label2: {
    fontSize: responsiveFontSize(1.5),
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
  input: {
    height: responsiveHeight(6),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: responsiveHeight(2),
    paddingLeft: responsiveHeight(3),
    borderRadius: 10,
    backgroundColor: '#fff',
    color: "black"
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
    fontSize: responsiveFontSize(1.7),
    marginLeft: 8,
  },
  backButton: {
    marginLeft: responsiveWidth(1),
    width: responsiveWidth(10),
    // backgroundColor: '#3c3c3c',
    height: responsiveHeight(5),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:responsiveHeight(3),
    position:'absolute',
    top:10
  },
});
export default PhoneNoScreen;
