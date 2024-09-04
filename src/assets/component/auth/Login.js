import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { setUser } from "../../../reduxFeatures/content/userReducer";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { s } from '../../commonCSS/Style';

const Login = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const [otp, setOtp] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalRef.current);
    }, []);

    const startTimer = () => {
        clearInterval(intervalRef.current);
        setTimer(60);
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };
    const handleResend = async () => {
        try {
            const response = await fetch(`${process.env.BASE_URL}resend-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phoneNumber,
                }),
            });
            const data = await response.json();
            // console.warn('Response data:', data);

            if (response.status === 200) {
                setOtp('');
                inputRefs.current.forEach(ref => {
                    if (ref) {
                        ref.clear();
                    }
                });
                inputRefs.current[0].focus();

                startTimer();
                Toast.show({
                    type: 'success',
                    text1: 'OTP Resent successfully',
                    text2: 'A new OTP has been sent to your phone.',
                });
                console.warn(response)
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
                text1: 'An error occurred while resending OTP. Please try again.',
            });
        }
    };
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
            if (response.ok) {
                const { data: userData, token } = data;
                dispatch(setUser({ user: userData, token }));
                Toast.show({
                    type: 'success',
                    text1: 'Login Successful',
                    text2: 'You have been successfully logged in. Welcome back!',
                });
                await AsyncStorage.setItem('token', token);

                navigation.navigate('LoginDashboard');
            } else if (response.status === 400) {
                setOtp('');
                inputRefs.current.forEach(ref => {
                    if (ref) {
                        ref.clear();
                    }
                });
                inputRefs.current[0].focus();
                Toast.show({
                    type: 'error',
                    text1: 'Login Unsuccessful',
                    text2: data.message || 'There was an issue with your login attempt. Please check your details and try again.',
                });
                navigation.navigate('SignUp', { user_id: data?.data?.id });
            } else {
                // setOtp('')
                Toast.show({
                    type: 'error',
                    text1: data.message || 'An unexpected error occurred while processing your request. Please try again later.',
                });
            }

        } catch (error) {
            console.error('Error occurred', error);
            Toast.show({
                type: 'error',
                text1: 'An error occurred during login. Please try again.',
            });
        }
    };

    const focusNextInput = (index) => {
        if (index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const onChangeText = (text, i) => {
        if (text.length === 6) {
            const otpArray = text.split('');
            otpArray.forEach((char, index) => inputRefs.current[index].setNativeProps({ text: char }));
            setOtp(text);
            inputRefs.current[5].blur();
        } else {
            const otpArray = otp.split('');
            otpArray[i] = text;
            setOtp(otpArray.join(''));
            if (text) {
                focusNextInput(i);
            } else if (i > 0) {
                inputRefs.current[i - 1].focus();
            }
        }
    };
    return (
        <ScrollView style={{ height: '100%', backgroundColor: 'white', }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesome name="chevron-left" size={responsiveFontSize(2)} color="black" />
            </TouchableOpacity>
            <View style={[{ height: responsiveHeight(90), justifyContent: 'space-around' }]}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={[styles.bgImagelogin, { alignItems: 'center' }]} source={require('../../Images/BTIcon.png')} />
                </View>
                <View style={s.container}>
                    <Text style={styles.bigHeading}>WELCOME BACK</Text>
                    <Text style={styles.smallPara}>Please Login</Text>

                    <Text style={styles.label}>
                        <Icon name="lock" size={20} color="#ee1d23" /> {' '} OTP
                    </Text>
                    <View style={styles.otpContainer}>
                        {[...Array(6)].map((_, i) => (
                            <TextInput
                                autoComplete="sms-otp"
                                textContentType="oneTimeCode"
                                key={i}
                                ref={(ref) => (inputRefs.current[i] = ref)}
                                style={styles.otpInput}
                                maxLength={1}
                                keyboardType="numeric"
                                onChangeText={(text) => onChangeText(text, i)}
                                value={otp[i] || ''}
                            />
                        ))}
                    </View>
                    <Text style={[styles.timerText, { color: 'grey', fontSize: responsiveFontSize(1.7), textAlign: 'center', marginBottom: responsiveHeight(2) }]}>
                        {timer > 0 ? `Resend OTP in ${timer}s` : 'You can Resend OTP Now'}
                    </Text>
                    <TouchableOpacity style={{ zIndex: 999, height: responsiveHeight(5) }} onPress={handleResend} disabled={timer > 0}>
                        <Text style={styles.buttonText2}>Resend OTP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    bgImagelogin: {
        flex: 1,
        height: responsiveWidth(25),
        width: responsiveWidth(25),
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
        color: 'black',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: responsiveHeight(3.6)
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
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        letterSpacing: 1.5,
        fontWeight: 'bold'
    },
    buttonText2: {
        color: 'red',
        fontSize: responsiveFontSize(1.8),
        textAlign: 'center'
    },
    backButton: {
        marginLeft: responsiveWidth(1),
        width: responsiveWidth(10),
        height: responsiveHeight(5),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
        position: 'absolute',
        top: 10
    },

});

export default Login;
