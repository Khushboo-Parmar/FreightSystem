// import React, { useState } from "react";
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
// import Progressbar from "./Progressbar";
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

// const statusValues = ['pending', 'request_sent', 'in_progress', 'completed'];

// const ComplainDetailsStatus = ({ route }) => {
//     const { complaint } = route.params;
//     const user = useSelector(state => state.user.user);
//     const [loading, setLoading] = useState(false);
//     const [status, setStatus] = useState(complaint?.status || 'pending');

//     const updateStatus = async (newStatus) => {
//         setLoading(true);
//         try {
//             const response = await fetch('http://192.168.0.192:3000/api/updateComplainStatus', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ complaintId: complaint.id, newStatus }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update status');
//             }

//             setStatus(newStatus);
//         } catch (error) {
//             console.error('Error updating status:', error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {loading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <View style={styles.detailsContainer}>
//                     <Text style={styles.heading}>Complaint Details status:</Text>
//                     <Text style={styles.detail}>Purchase Date: {complaint?.purchasedate}</Text>
//                     <Text style={styles.detail}>Distributor Name: {complaint?.distributorName}</Text>
//                     <Text style={styles.detail}>Invoice No.: {complaint?.invoiceNo}</Text>
//                     <Text style={styles.detail}>Total Amount: {complaint?.totalAmount}</Text>
//                     <Text style={styles.detail}>Freight Amount: {complaint?.freightAmount}</Text>
//                     <Text style={styles.detail}>Status: {status}</Text>
//                     <Progressbar status={status} onUpdateStatus={updateStatus} />
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         padding: responsiveHeight(4),
//     },
//     detailsContainer: {
//         width: responsiveWidth(90),
//         borderWidth: 0.5,
//         // borderColor: 'black',
//         borderRadius: 20,
//         padding: responsiveHeight(2),
//         shadowColor: 'red',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//         backgroundColor: 'white',
//     },
//     heading: {
//         fontSize: responsiveFontSize(2),
//         fontWeight: '600',
//         letterSpacing:0.5,
//         marginBottom: responsiveHeight(1),
//         color: 'black',
//     },
//     detail: {
//         fontSize: responsiveFontSize(1.8),
//         marginBottom: responsiveHeight(0.5),
//         color: 'black',
//         fontWeight: '400',
//     },
// });

// export default ComplainDetailsStatus;
import React, { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Progressbar from "./Progressbar";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const statusValues = ['pending', 'request_sent', 'in_progress', 'completed'];

const ComplainDetailsStatus = ({ route }) => {
    const { complaint } = route.params;
    const user = useSelector(state => state.user.user);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(complaint?.status || 'pending');

    const updateStatus = async (newStatus) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.BASE_URL}updateComplainStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ complaintId: complaint.id, newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setStatus(newStatus);
        } catch (error) {
            console.error('Error updating status:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.detailsContainer}>
                    <Text style={styles.heading}>Complaint Details status:</Text>
                    <Text style={styles.detail}>Purchase Date: {complaint?.purchasedate}</Text>
                    <Text style={styles.detail}>Distributor Name: {complaint?.distributorName}</Text>
                    <Text style={styles.detail}>Invoice No.: {complaint?.invoiceNo}</Text>
                    <Text style={styles.detail}>Total Amount: {complaint?.totalAmount}</Text>
                    <Text style={styles.detail}>Freight Amount: {complaint?.freightAmount}</Text>
                    <Text style={styles.detail}>Status: {status}</Text>
                    <Progressbar status={status} onUpdateStatus={updateStatus} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: responsiveHeight(4),
    },
    detailsContainer: {
        width: responsiveWidth(90),
        borderWidth: 0.5,
        borderRadius: 20,
        padding: responsiveHeight(2),
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        letterSpacing: 0.5,
        marginBottom: responsiveHeight(1),
        color: 'black',
    },
    detail: {
        fontSize: responsiveFontSize(1.8),
        marginBottom: responsiveHeight(0.5),
        color: 'black',
        fontWeight: '400',
    },
});

export default ComplainDetailsStatus;
