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

const Login = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${process.env.BASE_URL}user-login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phoneNumber,
                    otp
                })
            });

            const data = await response.json();
            console.warn('login data', data);
            console.log('login data', data);
            console.log('Response Status:', response.status);
            console.log('Response OK:', response.ok);

            if (response.ok) {
  
                const { data: userData, token } = data;
    
                dispatch(setUser({ user: userData, token }));
                console.warn('Login successful', userData);

                Toast.show({
                    type: 'success',
                    text1: 'Login Successful',
                    text2: 'Welcome back!',
                });
                await AsyncStorage.setItem('token', token);

                navigation.navigate('LoginDashboard');
            } else {
                console.error('Login failed', data.message);
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed',
                    text2: data.message,
                });
            }
        } catch (error) {
            console.error('Error occurred', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occurred during login. Please try again.',
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

    return (
        <View style={s.containerWhite}>
            <Image style={styles.bgImagelogin} source={require('../../Images/logo.png')} />
            <View style={s.container}>
                <Text style={styles.bigHeading}>WELCOME BACK!</Text>
                <Text style={styles.smallPara}>Please Login</Text>

                <Text style={styles.label}>
                    <Icon name="lock" size={20} color="#ee1d23" /> {' '} OTP :
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your OTP"
                    placeholderTextColor="#aaa"
                    onChangeText={setOtp}
                    value={otp}
                    secureTextEntry
                />

                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.buttonText2}>Resend OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
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
    },
    smallPara: {
        fontSize: responsiveFontSize(1.8),
        color: '#666',
        alignSelf: 'center',
        marginBottom: responsiveHeight(2)
    },
    label: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
        color: 'black',
        fontWeight: '500'
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
    buttonText2: {
        alignSelf: 'flex-end',
        color: 'red',
        fontSize: responsiveFontSize(1.8)

    }
});
export default Login;
