import React, { useState, useRef  } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { setUser } from "../../../reduxFeatures/content/userReducer";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { s } from '../../commonCSS/Style';
const Login = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const [otp, setOtp] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const inputRefs = useRef([]);

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


 // Focus the next input field
 const focusNextInput = (index) => {
    if (index < 5) {
        inputRefs.current[index + 1].focus();
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
        paddingLeft: responsiveHeight(3),
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
