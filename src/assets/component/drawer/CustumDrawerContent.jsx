import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser, setUser } from '../../../reduxFeatures/content/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
   const handleLogout = async () => {
        try {
            dispatch(clearUser());
            Toast.show({
                type: 'success',
                text1: 'Logging out',
                text2: 'Thank you!',
            });
            navigation.navigate('Dashboard');
        } catch (error) {
            console.error('Error during logout:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to logout. Please try again.',
            });
        }
    };
  let DrawerList = [
    { icon: 'file-document', label: 'Disclaimer Policy', navigateTo: 'DisclaimerPolicy' },
    { icon: 'home', label: 'General Terms', navigateTo: 'GeneralTerms' },
    { icon: 'lock', label: 'Privacy Policy', navigateTo: 'PrivacyPolicy' },
    { icon: 'assistant', label: 'Custumer Support', navigateTo: 'CustumerSupport' },
    { icon: 'account', label: 'Profile', navigateTo: 'Profile' },
    { icon: 'logout', label: 'Logout', onPress: handleLogout },
  ];
  

  const DrawerLayout = ({ icon, label, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.drawerItemContainer}
        onPress={onPress}
      >
        <View style={styles.drawerItemContent}>
          <Icon name={icon} size={24} color="#000" />
          <Text style={styles.drawerItemLabel}>{label}</Text>
        </View>
      </TouchableOpacity>
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
    <View style={{ flex: 1 ,paddingHorizontal:responsiveWidth(2)}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../Images/BTIcon.png')}
            style={styles.logo}
          />
        </View>
        <DrawerItems />
      </DrawerContentScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: responsiveWidth(20),
    height: responsiveHeight(20),
    resizeMode: 'contain',
  },
  drawerItemContainer: {
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    overflow: 'hidden',
    margin:responsiveWidth(3)
  },

  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
  },
  drawerItemLabel: {
    fontSize: responsiveFontSize(1.8),
    marginLeft: responsiveWidth(2),
    color: '#333',
  },
});


export default CustomDrawerContent;
