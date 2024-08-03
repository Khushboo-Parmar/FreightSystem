import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
const SearchStatus = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState(null);  

    const handleSearch = async () => {
        if (!searchQuery) {
            // alert("Please enter a search ID");
            Toast.show({
                type: 'error',
                text1: 'Please enter a search ID',
            });
            return;
        }

        try {
            const response = await fetch(`${process.env.BASE_URL}search-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    search: searchQuery
                })
            });
            const data = await response.json();

            if (response.ok) {
                setStatus(data.claimStatus); 
            } else {
                alert(data.message || "Failed to fetch status");
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch status',
                    text2: data.message,
                });
            }
        } catch (error) {
            console.error("Error fetching status:", error);
            alert("An error occurred while fetching the status");
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../Images/logoWithoutbg.png')} />
            <View style={styles.content}>
                <Text style={styles.heading}>Enter your ComplainId</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        placeholderTextColor="#aaa"
                        onChangeText={(text) => setSearchQuery(text)}
                        value={searchQuery}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
                {status !== null && (
                    <View style={styles.card}>
                        <Text style={styles.cardHeading}>Complaint Status</Text>
                        <Text style={styles.cardText}>
                        {status === "0" ? "Pending" : status === "1" ? "Completed" : "Unknown Status"}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default SearchStatus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: 'black',
        marginBottom: responsiveHeight(5),
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: responsiveWidth(80),
        color: 'red'
    },
    searchButton: {
        backgroundColor: 'black',
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(20),
        borderRadius: 30,
        marginTop: responsiveHeight(2)
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginTop: responsiveHeight(3),
        width: responsiveWidth(80),
        shadowColor: "red",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardHeading: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'black'
    },
    cardText: {
        fontSize: responsiveFontSize(1.8),
        textAlign: 'center',
        color: 'red'
    },
    logo: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: responsiveHeight(3),
    },
});
