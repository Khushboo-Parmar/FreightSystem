import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Switch } from "react-native";
import { s } from '../../commonCSS/Style';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { setPhoneNumber } from '../../../reduxFeatures/content/phoneSlice';
const Loginphone = () => {

    const [phoneNumberinput, setPhoneNumberInput] = useState('');

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const sendVerificationCode = async () => {
        if (phoneNumberinput === '9999999999') {
            dispatch(setPhoneNumber(phoneNumberinput));
            navigation.navigate('Login');
            Toast.show({
                type: 'success',
                text1: 'Demo login successful!',
            });
            return;
        }
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
            // console.warn('Response data:', data);

            if (response.status === 200) {
                dispatch(setPhoneNumber(phoneNumberinput));
                navigation.navigate('Login');
                Toast.show({
                    type: 'success',
                    text1: 'Verification code sent successfully.',
                    text2: 'Please check your messages to proceed.',
                });
            } else if (response.status === 401) {
                // Account not verified
                Toast.show({
                    type: 'error',
                    text1: data.message,
                });
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: data.message,
                    // text1: 'Number not recognized.',
                    // text2: 'This number is not registered. Please sign up or try a different number.',
                });
                navigation.navigate('PhoneNoScreen');
            }

        } catch (error) {
            console.error('Error sending verification code:', error);
            Toast.show({
                type: 'error',
                text1: "Oops! Error sending verification code",
                text2: 'Please try again.',
            });
        }
    };

    return (
        <View style={[s.containerWhite, { justifyContent: 'center', paddingVertical: responsiveHeight(3), gap: responsiveHeight(5) }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
                <FontAwesome name="chevron-left" size={responsiveFontSize(2)} color="black" />
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Image style={[styles.bgImagelogin, { alignItems: 'center' }]} source={require('../../Images/BTIcon.png')} />
            </View>
            <View style={styles.container}>
                <Text style={styles.bigHeading}>WELCOME BACK</Text>

                <Text style={styles.smallPara}>Please enter your phone number for login</Text>
                <Text style={[styles.labelphone, { color: 'grey', textAlign: 'center', marginBottom: responsiveHeight(3)}]}>
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
                <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
                <Text style={styles.registerText}>
                    <Text
                        style={{ color: '#ee1d23', }}
                        onPress={() => navigation.navigate('Help')}>
                        Customer Support
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: responsiveHeight(3),
    },

    bgImagelogin: {
        height: responsiveWidth(25),
        width: responsiveWidth(25),
    },
    bigHeading: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(1),
        color: 'black',
        alignSelf: 'center',
        // marginTop:responsiveHeight(2)
    },
    smallPara: {
        fontSize: responsiveFontSize(1.8),
        color: '#666',
        alignSelf: 'center',
        marginBottom: responsiveHeight(3)
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
    },
    backButton: {
        marginLeft: responsiveWidth(1),
        width: responsiveWidth(10),
        // backgroundColor: '#3c3c3c',
        height: responsiveHeight(5),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
        position: 'absolute',
        top: 10
    },
    registerText: {
        paddingTop:responsiveHeight(1),
        textAlign: 'center',
        fontSize: responsiveFontSize(1.8),
        color: 'black',
        fontWeight:'bold'
      },
});
export default Loginphone;
