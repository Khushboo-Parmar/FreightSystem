import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";

const ClaimHistory = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const userId = user?.userId;
    console.log('userId in claim history', userId)
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            setLoading(true);
            try {
                console.log(`Fetching complaints for userId: ${userId}`);
                const response = await fetch(`http://192.168.0.192:3000/api/getClaimHistory/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`Failed to fetch complaints: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Fetched data:', data);

                if (data && data.complaints) {
                    setComplaints(data.complaints);
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (error) {
                console.error("Error fetching complaints:", error);
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

    return (
        <View style={styles.container}>
            <View>
                <Text>Claim History</Text>
            </View>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                complaints.length > 0 ? (
                    <ScrollView>
                        {complaints.map(complaint => (
                            <TouchableOpacity
                                key={complaint.id}
                                style={styles.box}
                                onPress={() => navigation.navigate('ComplainDetailsStatus', { complaint })}
                            >
                                <View>
                                    <Image
                                        style={styles.productImage}
                                        source={require('../../../Images/pic1.jpeg')}
                                    />
                                    <Text style={styles.text}>Purchase Date: {complaint.purchasedate}</Text>
                                    <Text style={styles.text}>Distributor Name: {complaint.distributorName}</Text>
                                    <Text style={styles.text}>Invoice No: {complaint.invoiceNo}</Text>
                                    <Text style={styles.text}>Total Amount: {complaint.totalAmount}</Text>
                                    <Text style={styles.text}>Freight Amount: {complaint.freightAmount}</Text>
                                    <Text style={styles.text}>Search ID: {complaint.searchId}</Text>
                                    <Text style={styles.text}>Status: {complaint.status}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : (
                    <Text>No complaints found.</Text>
                )
            )}
            <TouchableOpacity onPress={() => { navigation.navigate('ClaimForm') }} style={[styles.button, { marginBottom: 10 }]}>
                <Text style={styles.buttonText}>Add More Complaints</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ClaimHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: responsiveHeight(4),
    },
    box: {
        borderWidth: 0.5,
        borderColor: 'black',
        width: responsiveWidth(80),
        height: responsiveHeight(35),
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 10,
    },
    productImage: {
        height: responsiveHeight(10),
        width: responsiveWidth(15),
        borderRadius: 50,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#aaa',
    },
    button: {
        backgroundColor: '#ee1d23',
        width: '80%',
        borderRadius: 10,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(8),
        marginVertical: responsiveHeight(3),
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(1.8),
        textAlign: 'center',
    },
});





// import React, { useState, useEffect } from "react";
// import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import { useSelector } from 'react-redux';
// import { useNavigation } from "@react-navigation/native";

// const ClaimHistory = () => {
//     const navigation = useNavigation();
//     const user = useSelector(state => state.user.user);
//     const userId = user?.userId;
//     console.log('userId', userId)
//     const [complaints, setComplaints] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchComplaints = async (userId) => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`http://192.168.0.192:3000/api/getClaimHistory/${userId}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch complaints: ${response.statusText}`);
//                 }

//                 console.log('response in claim history', response)

//                 const data = await response.json();

//                 if (data && data.complaints) {

//                     setComplaints(data.complaints);
                    
//                     console.log('data', data)
                
//                 } else {
//                     throw new Error("Invalid response structure");
//                 }
//             } catch (error) {
//                 console.error("Error fetching complaints:", error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (userId) {
//             fetchComplaints();
//         } else {
//             setError("User ID not found");
//         }
//     }, [userId]);

  
//     return (
//         <View style={styles.container}>
//             <View>
//                 <Text>Claim History</Text>
//             </View>
//             {loading ? (
//                 <Text>Loading...</Text>
//             ) : error ? (
//                 <Text>{error}</Text>
//             ) : (
//                 complaints.length > 0 ? (
//                     <ScrollView>
//                         {complaints.map(complaint => (
//                             <TouchableOpacity
//                                 key={complaint.id}
//                                 style={styles.box}
//                                 onPress={() => navigation.navigate('ComplainDetailsStatus', { complaint })}
//                             >
//                                 <View>
//                                     <Image
//                                         style={styles.productImage}
//                                         source={require('../../../Images/pic1.jpeg')}
//                                     />
//                                     <Text style={styles.text}>Purchase Date: {complaint.purchasedate}</Text>
//                                     <Text style={styles.text}>Distributor Name: {complaint.distributorName}</Text>
//                                     <Text style={styles.text}>Invoice No: {complaint.invoiceNo}</Text>
//                                     <Text style={styles.text}>Total Amount: {complaint.totalAmount}</Text>
//                                     <Text style={styles.text}>Freight Amount: {complaint.freightAmount}</Text>
//                                     <Text style={styles.text}>Search ID: {complaint.searchId}</Text>
//                                     <Text style={styles.text}>Status: {complaint.status}</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 ) : (
//                     <Text>No complaints found.</Text>
//                 )
//             )}
//             <TouchableOpacity onPress={() => { navigation.navigate('ClaimForm') }} style={[styles.button, { marginBottom: 10 }]}>
//                 <Text style={styles.buttonText}>Add More Complaints</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default ClaimHistory;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         padding: responsiveHeight(4),
//     },
//     box: {
//         borderWidth: 0.5,
//         borderColor: 'black',
//         width: responsiveWidth(80),
//         height: responsiveHeight(35),
//         borderRadius: 20,
//         paddingVertical: 5,
//         paddingHorizontal: 10,
//         margin: 10,
//     },
//     productImage: {
//         height: responsiveHeight(10),
//         width: responsiveWidth(15),
//         borderRadius: 50,
//     },
//     text: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#aaa',
//     },
//     button: {
//         backgroundColor: '#ee1d23',
//         width: '80%',
//         borderRadius: 10,
//         paddingVertical: responsiveHeight(2),
//         paddingHorizontal: responsiveWidth(8),
//         marginVertical: responsiveHeight(3),
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: responsiveFontSize(1.8),
//         textAlign: 'center',
//     },
// });
