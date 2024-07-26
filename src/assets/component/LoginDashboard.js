import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { s } from '../commonCSS/Style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { clearUser } from "../../reduxFeatures/content/userReducer";
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginDashboard = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    console.log(phoneNumber);
    // const { phoneNumber } = route.params;
    const user = useSelector(state => state.user.user);
    console.log('login dashboard user')
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        if (!user) {
            navigation.navigate('Login');
        }
    }, [user, navigation]);


    const handleLogout = async () => {
        try {
            dispatch(clearUser());
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            Toast.show({
                type: 'success',
                text1: 'Logging out',
                text2: 'Thank you!',
            });
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during logout:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to logout. Please try again.',
            });
        }
    };

    return (
        <View style={s.containerWhite}>
            <Image style={styles.bgImage} source={require('../Images/logo.png')} />
            {user && (
                <View style={s.container}>
                    <View style={s.spacebetween}>
                        <Text style={[s.headingFirst, { marginTop: 14 }]}>Hi, {user.name}</Text>
                        <TouchableOpacity onPress={toggleModal}><Image style={s.profilepic} source={require('../Images/profile.png')} /></TouchableOpacity>

                        <Modal
                            transparent={true}
                            animationType="fade"
                            visible={modalVisible}
                            onRequestClose={toggleModal}
                        >
                            <TouchableWithoutFeedback onPress={toggleModal}>
                                <View style={styles.modalOverlay} />
                            </TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                                    <Text style={styles.menuItem}>View Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleLogout}>
                                    <Text style={styles.menuItem}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.welcomeText}>We are pleased to help you</Text>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('ClaimForm') }}>
                                <Ionicons name="add-circle-outline" size={24} color="white" />
                                <Text style={styles.buttonText}>Add Complaint</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('ClaimHistory') }}>
                                <Ionicons name="eye-outline" size={24} color="white" />
                                <Text style={styles.buttonText}>View Complaints</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default LoginDashboard;

const styles = StyleSheet.create({
    bgImage: {
        height: responsiveHeight(28),
        width: responsiveWidth(100),
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        shadowColor: '#ee1d23',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: responsiveFontSize(2),
        color: 'black',
        marginBottom: responsiveHeight(2),
        fontWeight: '400'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#ee1d23',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        marginLeft: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        top: '40%',
        right: '3%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    menuItem: {
        padding: 10,
        fontSize: responsiveFontSize(2.2),
        color: '#2a2c5d',
        marginVertical: 5,
    },
});
