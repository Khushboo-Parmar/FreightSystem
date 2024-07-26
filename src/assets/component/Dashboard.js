import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const phoneNumber = useSelector(state => state.phone.phoneNumber);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    navigation.navigate('SearchStatus');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.logo} source={require('../Images/logoWithoutbg.png')} />
        <Text style={styles.heading}>Welcome to our Freight System</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Loginphone'); }}>
            <Icon name="log-in-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate('PhoneNoScreen'); }}>
            <Icon name="person-add-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.searchText}>Search here claim status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(5),
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
  },
  heading: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: responsiveHeight(5),
    textAlign: 'center',
  },
  searchContainer: {
    marginTop: responsiveHeight(3),
  },
  searchButton: {
    backgroundColor: '#ee1d23',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  registerButton: {
    backgroundColor: '#ee1d23',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: responsiveWidth(2),
  },
  icon: {
    marginRight: responsiveWidth(1),
  },
});