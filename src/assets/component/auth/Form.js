import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { registerUser } from "../../../reduxFeatures/content/contentSlice";
import { s } from '../../commonCSS/Style';

const Form = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        city: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = () => {
        console.log(formData);

        dispatch(registerUser(formData))
            .unwrap()
            .then((data) => {
                Toast.show({
                    type: 'success',
                    text1: `${data.message} 🚀`,
                });
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.error("Error:", error);
                Toast.show({
                    type: 'error',
                    text1: 'All fields are required 📦',
                });
            });
    };

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Register Here</Text>
            <View>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Name"
                    placeholderTextColor="#aaa"
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your last name"
                    placeholderTextColor="#aaa"
                    value={formData.lastName}
                    onChangeText={(text) => handleInputChange('lastName', text)}
                />
                <Text style={styles.label}>Mobile Number:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your mobile number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    value={formData.mobileNumber}
                    onChangeText={(text) => handleInputChange('mobileNumber', text)}
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Password"
                    placeholderTextColor="#aaa"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry
                />
                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Re-Enter your Password"
                    placeholderTextColor="#aaa"
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    secureTextEntry
                />
                <Text style={styles.label}>City:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your city"
                    placeholderTextColor="#aaa"
                    value={formData.city}
                    onChangeText={(text) => handleInputChange('city', text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: responsiveFontSize(3),
        marginBottom: responsiveHeight(2),
        color:'black'
    },
    input: {
        height: responsiveHeight(6),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: responsiveHeight(2),
        paddingLeft: responsiveWidth(2),
        borderRadius: 5,
        color:"black"
    },
    label: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
        color: 'black',
        marginTop: 5,
    },
    button: {
        marginTop: responsiveHeight(2),
        backgroundColor: 'black',
        alignItems: 'center',
        padding: responsiveHeight(1.5),
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
    },
});

export default Form;
