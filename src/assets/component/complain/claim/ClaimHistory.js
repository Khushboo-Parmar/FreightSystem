import React, { useState, useEffect, useCallback, useRef } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterSelect from "./FilterSelect";
import Footer from "../../Footer/Footer";
import Header from "../../Header";

const ClaimHistory = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const userId = user?.id;

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [dates, setDates] = useState({ start: '', end: '' });
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const hasNavigated = useRef(false);
    useEffect(() => {
        const handleBeforeRemove = (e) => {
            if (!hasNavigated.current) {
                if (e.data.action.type === 'POP' || e.data.action.type === 'GO_BACK') {
                    e.preventDefault();
                    setShouldNavigate(true);
                }
            }
        };
        const unsubscribe = navigation.addListener('beforeRemove', handleBeforeRemove);
        return () => {
            unsubscribe();
        };
    }, [navigation]);

    useEffect(() => {
        if (shouldNavigate) {
            hasNavigated.current = true;
            navigation.navigate('LoginDashboard');
        }
    }, [shouldNavigate, navigation]);

    const fetchComplaints = useCallback(async (filterValue, selectedDates) => {
        setLoading(true);
        setRefreshing(true);

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found");
            }
            const start = new Date(dates?.dates?.start).toLocaleDateString();
            const end = new Date(dates?.dates?.end).toLocaleDateString();

            const response = await fetch(`${process.env.BASE_URL}claim-history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({

                    value: filterValue,
                    start_date: dates ? dates?.dates?.start : "",
                    end_date: dates ? dates?.dates?.end : ""
                })
            });
    

            const data = await response.json();
            setComplaints(Object.values(data));
        } catch (error) {
            console.error('Error fetching complaints:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [filterValue, dates]);

    const handleFilterChange = (value, selectedDates) => {
        console.warn(selectedDates)
        setDates(selectedDates);
        setFilterValue(value);
        if (value === '7' && selectedDates) {
            console.warn(selectedDates)
            setDates(selectedDates);
            fetchComplaints(value, selectedDates);
        } else {
            fetchComplaints(value);
        }
    };

    useEffect(() => {
        if (dates?.dates?.start && dates?.dates?.end) {
            fetchComplaints(filterValue, dates);
        }
    }, [dates]);


    useFocusEffect(
        useCallback(() => {
            if (userId) {
                fetchComplaints(filterValue, dates);
            } else {
                setError("User ID not found");
            }
        }, [userId, filterValue, dates])
    );

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'red' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: 'black', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}
        />
    );
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchComplaints();
        fetchComplaints(filterValue, dates);
    }, [fetchComplaints, filterValue, dates]);
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const renderComplaints = (status) => {
        const filteredComplaints = complaints.filter(complaint => complaint.status === status);

        return (
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
          
                //     />
                // }
            >
                {filteredComplaints.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Image
                            style={styles.noDataImage}
                            source={require('../../../Images/placeImg.jpg')}
                        />
                        <Text style={styles.noDataText}>No complaints found.</Text>
                    </View>
                ) : (
                    filteredComplaints.map(complaint => (
                        <TouchableOpacity key={complaint.search_id} style={styles.card}>
                            <Image
                                style={styles.productImage}
                                source={{ uri: complaint.invoice_image_url }}
                            />
                            <View style={styles.cardContent}>
                                <View style={styles.textContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(2) }}>
                                        <Text style={[styles.text, { fontWeight: 'bold', fontSize: responsiveFontSize(2) }]}>{complaint.distributor_name}</Text>
                                        <Text style={styles.text}>{formatDate(complaint.purchase_date)}</Text>
                                    </View>
                                    <View style={{ gap: responsiveHeight(0.8) }}>
                                        <Text style={styles.text}>Product Name: {complaint.product_names}</Text>
                                        <Text style={styles.text}>Invoice No: {complaint.invoice_no}</Text>
                                        <Text style={styles.text}>Total Amount: {complaint.total_amount}</Text>
                                        <Text style={styles.text}>Freight Amount: {complaint.freight_amount}</Text>
                                        <Text style={styles.text}>Search ID: {complaint.search_id}</Text>
                                        <Text style={styles.text}>Status: {getStatusText(complaint.status)}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        );
    };

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

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'pending', title: 'Pending' },
        { key: 'completed', title: 'Completed' },
    ]);

    const renderScene = SceneMap({
        pending: () => (
            <>
                <FilterSelect onFilterChange={handleFilterChange} />
                {renderComplaints('0')}
            </>
        ),
        completed: () => (
            <>
                <FilterSelect onFilterChange={handleFilterChange} />
                {renderComplaints('1')}
            </>
        ),
    });

    return (
        <>
            <Header />
            <View style={{ alignItems: "center", backgroundColor: 'white', paddingBottom: responsiveHeight(2.5) }}>
                <Text style={styles.title}>Claim History</Text>
            </View>
      
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}

                    />
                }
            >
   
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={renderTabBar}
                    initialLayout={{ width: responsiveWidth(100) }}
                />
        
            </ScrollView>
          
            <Footer no={true} />
        </>
    );
};


export default ClaimHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        height: responsiveHeight(70)
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
        paddingTop: responsiveHeight(4)
    },
    card: {
        width: responsiveWidth(90),
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: responsiveHeight(2),
        marginTop: responsiveHeight(0.5),
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: responsiveWidth(4),
    },
    productImage: {
        width: '100%',
        height: responsiveWidth(35),
        // resizeMode: 'contain',
        resizeMode: 'cover',
    },
    textContainer: {
        // marginLeft: responsiveWidth(2),
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.8),
        // marginBottom: responsiveHeight(0.5),
        color: 'black',
        fontWeight: '400',
        textTransform: 'capitalize'
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
        flex: 1,
        padding: responsiveWidth(4),
        alignItems: 'center'
    },
    noDataImage: {
        width: responsiveWidth(60),
        height: responsiveWidth(60),
        resizeMode: 'contain',
        marginVertical: responsiveHeight(5)
    },
    contentContainer: {
    }

});