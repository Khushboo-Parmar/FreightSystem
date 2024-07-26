import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClaimHistory = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const userId = user.id;
    console.warn('user id', userId);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem('token');
                console.warn(token);
                if (!token) {
                    throw new Error("Token not found");
                }

                const response = await fetch(`${process.env.BASE_URL}claim-history`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch complaints: ${response.statusText}`);
                }

                const data = await response.json();
                console.warn('data', data)
                if (response.ok) {
                    setComplaints(data);
                    console.log('data complaints',complaints)
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchComplaints();
        } else {
            setError("User ID not found");
        }
    }, [userId]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'red' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: 'black', fontSize: responsiveFontSize(1.2), fontWeight: '500' }}
        />
    );

    const renderComplaints = (status) => (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {complaints.filter(complaint => complaint.status === status).map(complaint => (
                <TouchableOpacity
                    key={complaint.search_id}
                    style={styles.card}
                    onPress={() => navigation.navigate('ComplainDetailsStatus', { complaint })}
                >
                    <View style={styles.cardContent}>
                          <Image
                        style={styles.productImage}
                        source={{ uri: complaint.invoice_image_url }} 
                    />
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Purchase Date: {complaint.purchase_date}</Text>
                            <Text style={styles.text}>Distributor Name: {complaint.distributor_name}</Text>
                            <Text style={styles.text}>Invoice No: {complaint.invoice_no}</Text>
                            <Text style={styles.text}>Total Amount: {complaint.total_amount}</Text>
                            <Text style={styles.text}>Freight Amount: {complaint.freight_amount}</Text>
                            <Text style={styles.text}>Search ID: {complaint.search_id}</Text>
                            <Text style={styles.text}>Status: {getStatusText(complaint.status)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const FirstRoute = () => renderComplaints('0'); 
    const FourthRoute = () => renderComplaints('1'); 

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'pending', title: 'Pending' },
        { key: 'completed', title: 'Completed' },
    ]);

    const renderScene = SceneMap({
        pending: FirstRoute,
        completed: FourthRoute,
    });

    const getStatusText = (status) => {
        switch(status) {
            case '0':
                return 'Pending';
            case '1':
                return 'Completed';
            default:
                return 'Unknown';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Claim History</Text>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ee1d23" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={renderTabBar}
                    initialLayout={{ width: responsiveWidth(100) }}
                />
            )}
            <TouchableOpacity onPress={() => navigation.navigate('ClaimForm')} style={styles.addButton}>
                <Text style={styles.buttonText}>Add More Complaints</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ClaimHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: responsiveHeight(2),
    },
    title: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: responsiveHeight(2),
        color: 'black',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: responsiveHeight(1),
        color: '#333',
    },
    errorText: {
        marginTop: responsiveHeight(2),
        color: 'red',
        textAlign: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: responsiveHeight(2),
    },
    card: {
        width: responsiveWidth(90),
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: responsiveHeight(1),
        marginTop: responsiveHeight(4),
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: responsiveWidth(4),
    },
    productImage: {
        width: responsiveWidth(20),
        height: responsiveWidth(30),
        borderRadius: 10,
        resizeMode :'contain',
    },
    textContainer: {
        marginLeft: responsiveWidth(4),
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.6),
        marginBottom: responsiveHeight(0.5),
        color: 'black',
        fontWeight: '400',
    },
    noDataText: {
        marginTop: responsiveHeight(2),
        fontSize: responsiveFontSize(1.8),
        color: '#666',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#ee1d23',
        borderRadius: 10,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(8),
        marginBottom: responsiveHeight(3),
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(1.8),
        textAlign: 'center',
    },
});
