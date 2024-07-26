import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { clearUser } from '../../reduxFeatures/content/userReducer';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPieChart from './MyPieChart';

const LoginDashboard = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const user = useSelector(state => state.user.user);
    console.warn('user=',user)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [totalClaimCount, setTotalClaimCount] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [totalFreightAmount, setTotalFreightAmount] = useState(null);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        if (!user) {
            navigation.navigate('Login');
        }
    }, [user, navigation]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found");
                }

                const response = await fetch(`${process.env.BASE_URL}count-status`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                console.log()
                if (response.ok) {
                    setTotalClaimCount(result.status_counts.total_status_count);
                    setTotalFreightAmount(result.status_counts.total_freight_amount);
                    setTotalAmount(result.status_counts.total_amount);
                } else {
                    console.error('Failed to fetch dashboard data:', result.message);
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Failed to fetch dashboard data. Please try again.',
                    });
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'An error occurred while fetching dashboard data.',
                });
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = async () => {
        try {
            dispatch(clearUser());
            // await AsyncStorage.removeItem('email');
            // await AsyncStorage.removeItem('password');
            Toast.show({
                type: 'success',
                text1: 'Logging out',
                text2: 'Thank you!',
            });
            navigation.navigate('Loginphone');
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
        <View style={styles.container}>
            <Image style={styles.bgImage} source={require('../Images/logo.png')} />
            {user && (
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.greeting}>Hi, {user.full_name}</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image style={styles.profilepic} source={require('../Images/profile.png')} />
                        </TouchableOpacity>
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
                                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                    <Text style={styles.menuItem}>View Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleLogout}>
                                    <Text style={styles.menuItem}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.scrollViewContent}>
                            <MyPieChart />
                            <View style={styles.card}>
                                <View style={styles.claimdetails}>
                                    <View style={styles.claimdetailsViews}>
                                        <Text style={styles.claimdetailsText}>Total Claim Count</Text>
                                        <Text style={styles.claimdetailsamount}>{totalClaimCount !== null ? totalClaimCount : 'Loading...'}</Text>
                                    </View>
                                    <View style={styles.claimdetailsViews}>
                                        <Text style={styles.claimdetailsText}>Total Freight Amount</Text>
                                        <Text style={styles.claimdetailsamount}>{totalFreightAmount !== null ? totalFreightAmount : 'Loading...'}</Text>
                                    </View>
                                    <View style={styles.claimdetailsViews}>
                                        <Text style={styles.claimdetailsText}>Total Amount</Text>
                                        <Text style={styles.claimdetailsamount}>{totalAmount !== null ? totalAmount : 'Loading...'}</Text>
                                    </View>
                              
                                </View>
                            </View>
                            <View style={styles.card}>
                                <Text style={styles.welcomeText}>We are pleased to help you</Text>
                                <View style={styles.buttonView}>
                                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClaimForm')}>
                                        <Ionicons name="add-circle-outline" size={24} color="white" />
                                        <Text style={styles.buttonText}>Add Claim</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClaimHistory')}>
                                        <Ionicons name="eye-outline" size={22} color="white" />
                                        <Text style={styles.buttonText}>View Claim</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
};
export default LoginDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    bgImage: {
        height: responsiveHeight(28),
        width: responsiveWidth(100),
    },
    content: {
        flex: 1,
        padding: responsiveWidth(5),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color:'black'
    },
    profilepic: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        top: '30%',
        right: '5%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
    },
    menuItem: {
        padding: 10,
        fontSize: responsiveFontSize(2),
        color: '#2a2c5d',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: responsiveHeight(4),
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: responsiveWidth(4),
        marginVertical: responsiveHeight(2),
        shadowColor: '#ee1d23',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    claimdetails: {
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-around',
    },
    claimdetailsViews: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    claimdetailsText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '500',
        color:'black'
    },
    claimdetailsamount: {
        fontSize: responsiveFontSize(1.8),
         color:'black'
    },
    welcomeText: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(2),
        fontWeight: '400',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#ee1d23',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: responsiveHeight(2.5),
        paddingVertical: responsiveHeight(1.2),
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        marginLeft: 5,
    },
});
