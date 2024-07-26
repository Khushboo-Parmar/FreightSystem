import React, { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Progressbar from "./Progressbar";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { s } from '../../commonCSS/Style';

const statusValues = ['pending', 'request_sent', 'in_progress', 'completed'];

const ComplainDetailsStatus = ({ route }) => {
  const { complaint } = route.params;
  const user = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(complaint?.status || 'pending');

  const updateStatus = async (newStatus) => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.192:3000/api/updateComplainStatus', {
      // const response = await fetch('https://192.168.29.223:3000/api/updateComplainStatus', {
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
          <Text style={styles.heading}>Complaint Details:</Text>
          <Text style={styles.detail}>Product name: {complaint?.productname}</Text>
          <Text style={styles.detail}>Invoice no: {complaint?.invoice_no}</Text>
          <Text style={styles.detail}>Refund money amount: {complaint?.deliverCharges}</Text>
          <Text style={styles.detail}>Complaint detail: {complaint?.complain}</Text>
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

    
  },
  detailsContainer: {
    // width: '80%',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 20,
    padding:15
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color:'#aaa'
  },
});

export default ComplainDetailsStatus;
