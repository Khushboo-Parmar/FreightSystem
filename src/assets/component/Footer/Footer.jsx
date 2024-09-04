import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function Footer({ no }) {
    const navigation = useNavigation();
    const routes = useNavigationState(state => state.routes);
    const currentRoute = routes[routes.length - 1].name;

    const isActive = (route) => currentRoute === route;

    return (
        <View style={[styles.footerContainer, { position: 'relative' }]}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginDashboard')} style={styles.iconContainer}>
                <Icon name="home" size={15} color={isActive('LoginDashboard') ? '#d43132' : 'black'} />
                <Text style={[isActive('LoginDashboard') ? styles.iconText : styles.iconText2]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CustumerSupport')} style={styles.iconContainer}>
                <Icon name="truck" size={15} color={isActive('CustumerSupport') ? '#d43132' : 'black'} />
                <Text style={[isActive('CustumerSupport') ? styles.iconText : styles.iconText2]}>Support</Text>
            </TouchableOpacity>

            {no ? '' :
                <TouchableOpacity onPress={() => navigation.navigate('ClaimForm')} style={[{
                    position: 'absolute',backgroundColor:'red',
                    width: responsiveWidth(12), height: responsiveWidth(12),
                    justifyContent: 'center', alignItems: 'center', borderRadius: 100,
                    top: -30, right: responsiveWidth(45),
                    shadowColor: "red",
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 5,
                }]}>
                    <Icon name="plus" size={12} color="white" />
                </TouchableOpacity>
            }

            <TouchableOpacity onPress={() => navigation.navigate('ClaimHistory')} style={styles.iconContainer}>
                <Icon name="history" size={15} color={isActive('ClaimHistory') ? '#d43132' : 'black'} />
                <Text style={[isActive('ClaimHistory') ? styles.iconText : styles.iconText2]}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconContainer}>
                <Icon name="chart-pie" size={15} color={isActive('Profile') ? '#d43132' : 'black'} />
                <Text style={[isActive('Profile') ? styles.iconText : styles.iconText2]}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: responsiveHeight(2.5),
        borderTopColor: '#d43132',
        shadowColor: "red",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: responsiveHeight(0.7),
    },
    iconText: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '700',
        color:'#d43132'
    },
    iconText2: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '700',
        color:'black'
    },
});
