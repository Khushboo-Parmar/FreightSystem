import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Header = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();
    return (
        <View>
            {user && (
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.header2}>
                           <Ionicons name="person-circle-outline" size={25} color="white" />
                           <Text style={styles.greeting}>Hello, {user.full_name}</Text>
                        </View>
                        <View style={styles.header2}>
                       
                            <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
                                <Ionicons name="menu-outline" size={25} color="white" />
                            </TouchableOpacity>
                        </View>
       
                    </View>
     
                </View>
            )}
        </View>
    );
};
export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bgImage: {
        height: responsiveHeight(8),
        width: responsiveWidth(10),
        resizeMode: 'stretch'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ee1d23',
        padding: responsiveHeight(2)
    },
    greeting: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        color: 'black'
    },
    profilepic: {
        width: responsiveWidth(5),
        height: responsiveHeight(5),
    },

    header2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: responsiveWidth(2)
    }
});
