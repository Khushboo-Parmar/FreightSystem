import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Switch } from "react-native";
import { s } from '../../commonCSS/Style';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { setUser } from "../../../reduxFeatures/content/userReducer";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { setPhoneNumber } from '../../../reduxFeatures/content/phoneSlice';
const Loginphone = () => {

    const [phoneNumberinput, setPhoneNumberInput] = useState('');

    const navigation = useNavigation();

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
            console.warn('Response data:', data);

            if (response.status === 200) {
                dispatch(setPhoneNumber(phoneNumberinput));
                navigation.navigate('Login');
                Toast.show({
                    type: 'success',
                    text1: 'Verification code sent successfully!💐',
                  });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to send verification code',
                    text2: 'Please try again.',
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
        <View style={s.containerWhite}>
            <Image style={styles.bgImagelogin} source={require('../../Images/logo.png')} />
            <View style={s.container}>
                <Text style={styles.bigHeading}>WELCOME BACK</Text>

                <Text style={styles.smallPara}>Please enter your phone number for login</Text>
                <Text style={styles.label}>
                    <Icon name="user" size={20} color="#ee1d23" /> {' '}Phone Number
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#aaa"
                    onChangeText={setPhoneNumberInput}
                    value={phoneNumberinput}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
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
        marginTop:responsiveHeight(2)
    },
    smallPara: {
        fontSize: responsiveFontSize(1.8),
        color: '#666',
        alignSelf: 'center',
        marginBottom: responsiveHeight(5)
    },
    label: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
        color: 'black',
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
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        letterSpacing: 1.5
    }
});
export default Loginphone;
