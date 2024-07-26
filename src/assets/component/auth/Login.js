import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Switch } from "react-native";
import { s } from '../../commonCSS/Style';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { setUser } from "../../../reduxFeatures/content/userReducer";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
   import { useSelector } from 'react-redux';
const Login = () => {
 
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    // const { phoneNumber } = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadStoredCredentials = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                const storedPassword = await AsyncStorage.getItem('password');
                if (storedEmail && storedPassword) {
                    setEmail(storedEmail);
                    setPassword(storedPassword);
                    setRememberMe(true);
        
                }
            } catch (error) {
                console.error('Error loading stored credentials', error);
            }
        };
        loadStoredCredentials();
    }, []);

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://192.168.0.192:3000/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(setUser(data.user));
                console.log('Login successful');
                Toast.show({
                    type: 'success',
                    text1: 'Login Successful',
                    text2: 'Welcome back!',
                });
                if (rememberMe) {
                    await AsyncStorage.setItem('email', email);
                    await AsyncStorage.setItem('password', password);
                } else {
                    await AsyncStorage.removeItem('email');
                    await AsyncStorage.removeItem('password');
                }
                navigation.navigate('LoginDashboard', { phoneNumber });
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
    }
    return (
        <View style={s.containerWhite}>
            <Image style={styles.bgImagelogin} source={require('../../Images/logo.png')} />
            <View style={s.container}>
                <Text style={styles.bigHeading}>WELCOME BACK!</Text>
                <Text style={styles.smallPara}>Please Login</Text>
                {/* <Text style={styles.label}>Email:</Text> */}
                <Text style={styles.label}>
                        <Icon name="envelope" size={20} color="#ee1d23" />
                        {' '} Email:
                    </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>
                        <Icon name="lock" size={20} color="#ee1d23" />
                        {' '} Password:
                    </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#aaa"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
                <View style={styles.spaceBetween}>
                    <View style={styles.spaceBetween}>
                        <Text style={styles.smallHeading}>Remember me</Text>
                        <Switch
                            value={rememberMe}
                            onValueChange={toggleRememberMe}
                        />
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.redText}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.otherLoginContainer}>
                    <Text style={styles.smallPara}>Or Login with</Text>
                    <View style={styles.socialLoginContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Icon name="google" size={24} color="red" />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Icon name="facebook" size={24} color="blue" />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bgImagelogin: {
        height: responsiveHeight(25),
        width: responsiveWidth(100),
    },
    bigHeading: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(1),
        color: 'black',
        alignSelf: 'center',
    },
    smallPara: {
        fontSize: responsiveFontSize(1.8),
        color: '#666',
        alignSelf: 'center',
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
        color:"black"
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
    redText: {
        fontSize: responsiveFontSize(1.8),
        color: '#ee1d23',
    },
    button: {
        // backgroundColor: '#007BFF',
        backgroundColor: 'black',
        padding: responsiveHeight(2.2),
        borderRadius: 30,
        alignItems: 'center',
        marginTop: responsiveHeight(2),
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        letterSpacing:1.5
    },
    otherLoginContainer: {
        marginTop: responsiveHeight(2),
        alignItems: 'center',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: responsiveHeight(2),
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: responsiveWidth(2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    socialButtonText: {
        marginLeft: responsiveWidth(1),
        fontSize: responsiveFontSize(2),
        color: '#333',
    },
    blackColor:{
        color:'black'
    },
    greyColor:{
        color:'grey'
    },
});

export default Login;


// Login component (React Native)

// import React, { useState } from "react";
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Switch } from "react-native";
// import { s } from '../../commonCSS/Style';
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
// import { setUser } from "../../../reduxFeatures/content/userReducer";
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [rememberMe, setRememberMe] = useState(false); // State for "Remember me" switch
//     const navigation = useNavigation();
//     const dispatch = useDispatch();

//     const toggleRememberMe = () => {
//         setRememberMe(!rememberMe);
//     };

//     const handleSubmit = async () => {
//         try {
//             const response = await fetch("http://192.168.0.191:3000/api/login", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password })
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 dispatch(setUser(data.user));
//                 console.log('Login successful');

//                 if (rememberMe) {
//                     // Store credentials via API
//                     const storeCredentialsResponse = await fetch("http://192.168.0.191:3000/api/credentials", {
//                         method: "POST",
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({ email, password })
//                     });

//                     if (storeCredentialsResponse.ok) {
//                         console.log('Stored credentials successfully');
//                     } else {
//                         console.error('Failed to store credentials');
//                     }
//                 }

//                 navigation.navigate('LoginDashboard');
//             } else {
//                 console.error('Login failed', data.message);
//             }
//         } catch (error) {
//             console.error('Error occurred', error);
//         }
//     };

//     return (
//         <View style={s.containerWhite}>
//             <Image style={styles.bgImagelogin} source={require('../../Images/bg.png')} />
//             <View style={s.container}>
//                 <Text style={styles.bigHeading}>WELCOME BACK!</Text>
//                 <Text style={styles.smallPara}>Please Login</Text>
//                 <Text style={styles.label}>Email:</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Enter your email"
//                     onChangeText={setEmail}
//                     value={email}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                 />
//                 <Text style={styles.label}>Password:</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Enter your password"
//                     onChangeText={setPassword}
//                     value={password}
//                     secureTextEntry
//                 />
//                 <View style={styles.spaceBetween}>
//                     <View style={styles.spaceBetween}>
//                         <Text style={styles.smallHeading}>Remember me</Text>
//                         <Switch
//                             value={rememberMe}
//                             onValueChange={toggleRememberMe}
//                         />
//                     </View>


//                     <TouchableOpacity>
//                         <Text style={styles.redText}>Forget Password?</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                     <Text style={styles.buttonText}>Login</Text>
//                 </TouchableOpacity>
//                 <View style={styles.otherLoginContainer}>
//                     <Text style={styles.smallPara}>Or Login with</Text>
//                     <View style={styles.socialLoginContainer}>
//                         <TouchableOpacity style={styles.socialButton}>
//                             <Icon name="google" size={24} color="red" />
//                             <Text style={styles.socialButtonText}>Google</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.socialButton}>
//                             <Icon name="facebook" size={24} color="blue" />
//                             <Text style={styles.socialButtonText}>Facebook</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     bgImagelogin: {
//         height: responsiveHeight(28),
//         width: responsiveWidth(100),
//     },
//     bigHeading: {
//         fontSize: responsiveFontSize(4),
//         fontWeight: 'bold',
//         marginBottom: responsiveHeight(2),
//         color: '#333',
//         alignSelf: 'center',
//     },
//     smallPara: {
//         fontSize: responsiveFontSize(2),
//         color: '#666',
//         alignSelf: 'center',
//     },
//     label: {
//         fontSize: responsiveFontSize(2),
//         marginBottom: responsiveHeight(1),
//         color: '#333',
//     },
//     input: {
//         height: responsiveHeight(6),
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: responsiveHeight(2),
//         paddingLeft: responsiveWidth(2),
//         borderRadius: 10,
//         backgroundColor: '#fff',
//     },
//     spaceBetween: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: responsiveHeight(2),
//     },
//     smallHeading: {
//         fontSize: responsiveFontSize(2),
//         color: '#333',
//     },
//     redText: {
//         fontSize: responsiveFontSize(2),
//         color: 'red',
//     },
//     button: {
//         // backgroundColor: '#007BFF',
//         backgroundColor: 'black',
//         padding: 10,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: responsiveHeight(2),
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: responsiveFontSize(2),
//     },
//     otherLoginContainer: {
//         marginTop: responsiveHeight(2),
//         alignItems: 'center',
//     },
//     socialLoginContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         marginTop: responsiveHeight(2),
//     },
//     socialButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#f9f9f9',
//         padding: 10,
//         borderRadius: 5,
//         marginHorizontal: responsiveWidth(2),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     socialButtonText: {
//         marginLeft: responsiveWidth(1),
//         fontSize: responsiveFontSize(2),
//         color: '#333',
//     },
// });

// export default Login;
