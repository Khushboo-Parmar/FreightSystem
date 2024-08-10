import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import placeholderImg from '../../../Images/placeImg.jpg';
import FilterSelect from "./FilterSelect";

const placeholderImage = placeholderImg;
const ClaimHistory = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    console.log('user claim histry', user)
    const userId = user.id;
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    
    // useEffect(() => {
        const fetchComplaints = async () => {
            setLoading(true);
            setRefreshing(true);
            try {
                const token = await AsyncStorage.getItem('token');

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
                if (response.ok) {
                    setComplaints(data);
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        };

    //     if (userId) {
    //         fetchComplaints();
    //     } else {
    //         setError("User ID not found");
    //     }
    // }, [userId]);
    useEffect(() => {
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
    
    const onRefresh = useCallback(() => {
        fetchComplaints();
    
    }, []);

    const renderComplaints = (status) => {
        const filteredComplaints = complaints.filter(complaint => complaint.status === status);
        return (
            <ScrollView contentContainerStyle={styles.scrollContainer}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            >
                {filteredComplaints.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Image
                            style={styles.noDataImage}
                            // source={{ uri: placeholderImage }}
                            source={require('../../../Images/placeImg.jpg')}
                        />
                        <Text style={styles.noDataText}>No complaints found.</Text>
                    </View>
                ) : (
                    filteredComplaints.map(complaint => (
                        <TouchableOpacity
                            key={complaint.search_id}
                            style={styles.card}
                        >
                            <View style={styles.cardContent}>
                                <Image
                                    style={styles.productImage}
                                    source={{ uri: complaint.invoice_image_url }}
                                // source={{ uri: complaint.invoice_image_url || placeholderImage }}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>Purchase Date: {complaint.purchase_date}</Text>
                                    <Text style={styles.text}>Distributor Name: {complaint.distributor_name}</Text>
                                    <Text style={styles.text}>Product Name: {complaint.product_name}</Text>
                                    <Text style={styles.text}>Invoice No: {complaint.invoice_no}</Text>
                                    <Text style={styles.text}>Total Amount: {complaint.total_amount}</Text>
                                    <Text style={styles.text}>Freight Amount: {complaint.freight_amount}</Text>
                                    <Text style={styles.text}>Search ID: {complaint.search_id}</Text>
                                    {/* <Text style={styles.text}>why cancel: {complaint.cancled}</Text> */}
                                    <Text style={styles.text}>Status: {getStatusText(complaint.status)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        );
    };

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
        switch (status) {
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
            <View style={{ display: 'flex', flexDirection: "row", alignItems:"center", justifyContent:'flex-start', gap:responsiveWidth(25) }}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Claim History</Text>
            </View>
           {index === 1 && <FilterSelect />}
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
    backButton: {
        marginLeft: responsiveWidth(2),
        width: responsiveWidth(10),
        backgroundColor: '#3c3c3c',
        height: responsiveHeight(5),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'center',
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
        resizeMode: 'contain',
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
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: responsiveWidth(4),
    },
    noDataImage: {
        width: responsiveWidth(60),
        height: responsiveWidth(60),
        resizeMode: 'contain',
    },
    noDataText: {
        fontSize: responsiveFontSize(1.8),
        color: '#666',
        marginTop: responsiveHeight(2),
    }
});
