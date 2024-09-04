import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPieChart from './MyPieChart';
import Footer from './Footer/Footer';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
const LoginDashboard = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [totalClaimCount, setTotalClaimCount] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [totalFreightAmount, setTotalFreightAmount] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    useEffect(() => {
        if (!user) {
            navigation.navigate('Loginphone');
        }
    }, [user, navigation]);

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
            const textResponse = await response.text();
            const result = JSON.parse(textResponse);
            if (response.ok) {
                setTotalClaimCount(result.status_counts.total_status_count);
                setTotalFreightAmount(result.status_counts.total_freight_amount);
                setTotalAmount(result.status_counts.total_amount);
            } else {
                console.error('Failed to fetch dashboard data:', result.message);
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch dashboard data. Please try again.',

                });
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            Toast.show({
                type: 'error',
                text1: 'An error occurred while fetching dashboard data.',
                // text2: 'An error occurred while fetching dashboard data.',
            });
        }
        finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchDashboardData();
        }, [])
    );
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchDashboardData();
    }, []);

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                {user && (
                    <View style={styles.content}>
                        <ScrollView contentContainerStyle={styles.scrollViewContainer}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            <View style={styles.scrollViewContent}>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: 'black' }}>DASHBOARD</Text>
                                </View>
                                <MyPieChart />
                                <View style={{ marginTop: responsiveHeight(3), borderBottomWidth: 0.8, borderColor: 'lightgrey' }}></View>
                                <View style={styles.card}>
                                    <View style={{ marginVertical: responsiveHeight(3), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: 'bold', color: 'black' }}>ALL CLAIMS</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('ClaimHistory')} >
                                            <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '500', color: '#d43132' }}>View All</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.claimdetails}>


                                        <View style={{
                                            alignItems: 'center', backgroundColor: 'white',
                                            paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(3), borderRadius: 10, gap: responsiveHeight(1)
                                        }}>
                                            <Icon name="chart-pie" size={23} color="#a3081f" />
                                            <View style={{ alignItems: 'center', gap: responsiveHeight(0.7) }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold' }} >{totalClaimCount !== null ? `+ ${totalClaimCount}` : 'Loading...'}</Text>
                                                <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), fontWeight: 'bold' }}>
                                                    Claim Count
                                                </Text>
                                            </View>
                                        </View>


                                        <View style={{
                                            alignItems: 'center', backgroundColor: 'white',

                                            paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(3), borderRadius: 10, gap: responsiveHeight(1)
                                        }}>
                                            <Icon name="donate" size={23} color="#de9400" />
                                            <View style={{ alignItems: 'center', gap: responsiveHeight(0.7) }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold' }} >{totalFreightAmount !== null ? totalFreightAmount : 'Loading...'}</Text>
                                                <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), fontWeight: 'bold' }}>
                                                    Freight Amount
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            alignItems: 'center', backgroundColor: 'white',
                                            paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(3), borderRadius: 10, gap: responsiveHeight(1)
                                        }}>
                                            <Icon name="rupee-sign" size={23} color="#0081de" />
                                            <View style={{ alignItems: 'center', gap: responsiveHeight(0.7) }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold' }} >{totalAmount !== null ? totalAmount : 'Loading...'}</Text>
                                                <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5), fontWeight: 'bold' }}>
                                                    Total Amount
                                                </Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
            <Footer />
        </>
    );
};
export default LoginDashboard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bgImage: {
        height: responsiveHeight(8),
        width: responsiveWidth(10),
        resizeMode: 'stretch'
    },
    // content: {
    //     flex: 1,
    //     padding: responsiveWidth(5),
    // },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ee1d23',
        padding: responsiveHeight(2)
    },
    greeting: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.5,
    },
    profilepic: {
        width: responsiveWidth(5),
        height: responsiveHeight(5),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        top: '9%',
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
        paddingHorizontal: responsiveWidth(5),
        justifyContent: 'space-between',
        gap: responsiveHeight(2)
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: responsiveWidth(4),
        // shadowColor: '#ee1d23',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 4,
        // elevation: 5,
    },
    claimdetails: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        gap: responsiveWidth(9),
        justifyContent: 'space-around',
    },
    claimdetailsViews: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    claimdetailsText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '500',
        color: 'black'
    },
    claimdetailsamount: {
        fontSize: responsiveFontSize(1.8),
        color: 'black'
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
    header2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: responsiveWidth(2)
    }
});