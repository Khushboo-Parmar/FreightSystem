import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, ScrollView, TextInput } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();
    const handleEdit = async () => {
        navigation.navigate('UpdateProfile');
    }
console.log('p user', user)
    return (
        <View style={styles.container}>
                  
            {user && (
                <>
                    <View style={styles.curve}>
                        <Image
                        style={styles.profilepic}
                        source={{ uri: user?.file }} 
                    />
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
</TouchableOpacity>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="user-o" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.full_name}</Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="envelope-o" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.email}</Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="address-book" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.address}</Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="map-marker" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.city}</Text>
                            </View>
                        </View>

                    
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btn} onPress={handleEdit}>
                            <Text style={styles.btnText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>

                </>
            )}
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    curve: {
        position: 'relative',
        width: responsiveWidth(100),
        height: responsiveHeight(25),
        backgroundColor: '#ee1d23',
        borderBottomLeftRadius: responsiveWidth(45),
        borderBottomRightRadius: responsiveWidth(45),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    profilepic: {
        position: 'absolute',
        height: responsiveHeight(15),
        width: responsiveWidth(28),
        borderRadius: responsiveWidth(14),
        borderWidth: 2,
        borderColor: 'red',
        top: responsiveHeight(15),
        left: (responsiveWidth(100) - responsiveWidth(28)) / 2,
    },
    infoContainer: {
        marginTop: responsiveHeight(10),
        paddingHorizontal: responsiveWidth(5),
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: responsiveHeight(2),
        marginBottom: responsiveHeight(1.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoIcon: {
        marginRight: responsiveWidth(5),
    },
    infoDetail: {
        flex: 1,
    },
    infoDetailText: {
        fontSize: responsiveFontSize(2.5),
        color: '#333',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: responsiveHeight(5),
    },
    btn: {
        backgroundColor: "#ee1d23",
        borderRadius: 20,
        width: responsiveWidth(50),
        padding: responsiveHeight(2),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        alignSelf: 'center'
    },
    btnText: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        textAlign: 'center',
    },
    inputContainer: {
        gap: 8,
        marginVertical: 10,
    },
    label: {
        fontFamily: 'Poppins-SemiBold',
        color: 'black',
    },
    required: {
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        paddingHorizontal: 10,
        color: 'black',
    },
    backButton: {
        marginLeft: responsiveWidth(1),
        width: responsiveWidth(10),
        // backgroundColor: '#3c3c3c',
        height: responsiveHeight(5),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        Top:responsiveHeight(2),
        left:responsiveWidth(1),
    },
    title: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'center',
        // marginBottom: responsiveHeight(2),
        color: 'black',
    },
    
});
