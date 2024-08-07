
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found");
      }
      console.log('Token:', token);
      const response = await fetch(`${process.env.BASE_URL}claimuser-logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Optionally, remove token from AsyncStorage
        await AsyncStorage.removeItem('token');
        navigation.navigate('LoginPhone');
      } else {
        Alert.alert('Logout Failed', 'Please try again later.');
      }
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred. Please try again later.');
    }
  };

  let DrawerList = [
    { icon: 'file-document-outline', label: 'Disclaimer Policy', navigateTo: 'DisclaimerPolicy' },
    { icon: 'home-outline', label: 'General Terms', navigateTo: 'GeneralTerms' },
    { icon: 'shield-outline', label: 'Privacy Policy', navigateTo: 'PrivacyPolicy' },
    { icon: 'shield-outline', label: 'Profile', navigateTo: 'Profile' },
    { icon: 'shield-outline', label: 'Logout', onPress: handleLogout },
  ];

  const DrawerLayout = ({ icon, label, onPress }) => {
    return (
      <DrawerItem
        icon={({ color, size }) => <Icon name={icon} color={color} size={size} />}
        label={label}
        onPress={onPress} // Use onPress prop for custom actions
      />
    );
  };

  const DrawerItems = () => {
    return DrawerList.map((el, i) => (
      <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        onPress={el.onPress ? el.onPress : () => navigation.navigate(el.navigateTo)}
      />
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../Images/logoWithoutbg.png')}  // Adjust the path to your logo image
            style={styles.logo}
          />
        </View>
        <DrawerItems />
        {/* Optionally, add more custom components here */}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    // marginVertical: responsiveHeight(2),
  },
  logo: {
    width: responsiveWidth(40),
    height: responsiveHeight(25),
    resizeMode: 'contain',
  },
});

export default CustomDrawerContent;
