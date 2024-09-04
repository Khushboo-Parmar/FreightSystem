import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();
    return (
        <View>
            {user && (
                <View style={styles.content}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.header2} onPress={()=>{navigation.navigate('Profile')}}>
                           <Image source={{uri:user?.file}} style={{width:responsiveWidth(8),height:responsiveHeight(4),borderRadius:5,borderWidth:1}} />
                           <View>
                           <Text style={{ fontWeight: 'bold', color: 'black', fontSize: responsiveFontSize(2) }}>Hello, <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(1.8), textTransform:'capitalize' }}>
                            {user?.full_name}
                            {/* {user?.full_name.charAt(0).toUpperCase() + user?.full_name.slice(1)} */}
                            </Text></Text>
                           <Text style={{ fontWeight: '300', fontSize: responsiveFontSize(1.5), color: 'black' }}>{user?.email}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.openDrawer()}} style={[styles.header2,{backgroundColor:'black', borderWidth:1,paddingHorizontal:responsiveWidth(2.5),paddingVertical:responsiveWidth(2),borderRadius:10}]}>
                       
                            <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
                            <Icon name="align-right" size={18} color="white" />
                            </TouchableOpacity>
                        </TouchableOpacity>
       
                    </View>
     
                </View>
            )}
        </View>
    );
};
export default Header;

const styles = StyleSheet.create({

    bgImage: {
        height: responsiveHeight(8),
        width: responsiveWidth(10),
        resizeMode: 'stretch'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        // padding: responsiveHeight(2)
        paddingHorizontal: responsiveHeight(2),
        paddingVertical:responsiveHeight(2)
    },
    greeting: {
        fontSize: responsiveFontSize(1.8),
        // fontWeight: 'bold',
        color: 'black',
        letterSpacing:0.5,
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
