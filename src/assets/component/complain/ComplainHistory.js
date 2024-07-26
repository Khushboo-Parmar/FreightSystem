import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useSelector } from 'react-redux';
import { s } from '../../commonCSS/Style';
import { useNavigation } from "@react-navigation/native";
const ComplainHistory = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const userId = user.id;
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://192.168.0.192:3000/api/complaints?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }
        const data = await response.json();
        setComplaints(data.complaints);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Complain history</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        complaints.length > 0 && (
          <ScrollView>
            {complaints.map(complaint => (
              <TouchableOpacity key={complaint.id} style={styles.box} onPress={() => navigation.navigate('ComplainDetailsStatus', { complaint })}>
                <View>
                  <Image style={styles.productImage} source={require('../../Images/pic1.jpeg')} />
                  <Text style={styles.text}>Product name: {complaint.productname}</Text>
                  <Text style={styles.text}>Invoice no: {complaint.invoice_no}</Text>
                  <Text style={styles.text}>Refund money amount: {complaint.deliverCharges}</Text>
                  <Text style={styles.text}>complain detail: {complaint.complain}</Text>
                  <Text style={styles.text}>Status: {complaint.status}</Text>
                  <Text style={styles.text}>Complain ID: {complaint.searchId}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )
        
      )}
      <TouchableOpacity onPress={() => { navigation.navigate('ComplainForm') }} style={[s.button, { marginBottom: 10 }]}><Text style={s.buttonText}>Add More complaints</Text></TouchableOpacity>
    </View>
  );
};


export default ComplainHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding:5,
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
    color:'#aaa'
  },
  button: {
    marginTop: responsiveHeight(2),
    backgroundColor: 'red',
    alignItems: 'center',
    padding: responsiveHeight(1.5),
    borderRadius: 10,
},
});
