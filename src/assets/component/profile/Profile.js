
// import React from "react";
// import { View, StyleSheet, Image, Text, TextInput } from "react-native";
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
// import { useSelector } from "react-redux";
// import Footer from "../Footer/Footer";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Header from "../Header";
// import { useNavigation } from "@react-navigation/native";


// const Profile = () => {

//     const navigation = useNavigation();


//     const user = useSelector(state => state.user.user);
//     return (
//         <>

//             <View style={styles.container}>
//                 {user && (
//                     <>
//                         <View style={styles.header}>
//                             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                                 <FontAwesome name="chevron-left" size={responsiveFontSize(2)} color="white" />
//                             </TouchableOpacity>
//                             <Image
//                                 style={styles.profileImage}
//                                 source={{ uri: user?.file }}
//                             />
//                             <Text style={[styles.userName, { textTransform: "capitalize" }]}>{user?.full_name}</Text>
//                             <Text style={styles.lastVisit}>{user?.email}</Text>
//                         </View>
//                         <View style={styles.infoContainer}>
//                             <Text style={styles.label}>EMAIL</Text>
//                             <TextInput style={styles.input} editable={false} value={`${user?.email}`} />
//                             <Text style={styles.label}>PHONE</Text>
//                             <TextInput style={styles.input} editable={false} value={`+91 ${user?.phone}`} />

//                             <Text style={styles.label}>CITY, STATE</Text>
//                             <TextInput style={[styles.input, { textTransform: "capitalize" }]} editable={false} value={`${user?.city},${user?.state}`} />

//                             <Text style={styles.label}>GSTNO</Text>
//                             <TextInput style={styles.input} editable={false} value={`${user?.gstNo}`} />
//                         </View>
//                     </>
//                 )}
//             </View>
//             <Footer no={true} />
//             {/* <Footer/> */}
//         </>

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         height: '100%',
//     },
//     header: {
//         backgroundColor: 'black',
//         paddingTop: responsiveHeight(10),
//         paddingBottom: responsiveHeight(5),
//         // height:responsiveHeight(35),
//         // width:responsiveWidth(100),
//         alignItems: 'center',
//         // justifyContent:'center',
//         position:'relative'
//     },
//     profileImage: {
//         width: responsiveWidth(24),
//         height: responsiveWidth(24),
//         borderRadius: responsiveWidth(12),
//         borderColor: '#fff',
//         borderWidth: 2,
//     },
//     userName: {
//         color: '#fff',
//         fontSize: responsiveFontSize(2.5),
//         marginTop: responsiveHeight(2),
//     },
//     lastVisit: {
//         color: '#fff',
//         fontSize: responsiveFontSize(1.5),
//         marginTop: responsiveHeight(0.5),

//     },
//     infoContainer: {
//         padding: responsiveWidth(7),
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         marginTop: -responsiveHeight(3),
//         // paddingHorizontal: responsiveWidth(3),
//     },
//     label: {
//         color: '#888',
//         fontSize: responsiveFontSize(1.5),
//         marginBottom: responsiveHeight(1),
//         marginTop: responsiveHeight(2),
//     },
//     input: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//         fontSize: responsiveFontSize(2),
//         paddingBottom: responsiveHeight(0.5),
//         color: '#333',

//     },
//     backButton: {
//         width: responsiveWidth(10),
//         height: responsiveHeight(5),
//         borderRadius: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',  
//         top: responsiveHeight(1), 
//         left: responsiveWidth(3),
//         backgroundColor:'red'
//     },

// });

// export default Profile;
import React from "react";
import { View, StyleSheet, Image, Text, TextInput } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);

    return (
        <>
            <View style={styles.container}>
            <View style={{backgroundColor:'black'}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor:'black',paddingHorizontal:responsiveHeight(2),paddingVertical:responsiveHeight(3)}}>
                                <FontAwesome name="chevron-left" size={responsiveFontSize(2.5)} color="white" />
                            </TouchableOpacity>
            </View>
                {user && (
                    <>

                        <View style={styles.header}>
                        
                            <Image
                                style={styles.profileImage}
                                source={{ uri: user?.file }}
                            />
                            <Text style={[styles.userName, { textTransform: "capitalize" }]}>{user?.full_name}</Text>
                            <Text style={styles.lastVisit}>{user?.email}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>EMAIL</Text>
                            <TextInput style={styles.input} editable={false} value={`${user?.email}`} />
                            <Text style={styles.label}>PHONE</Text>
                            <TextInput style={styles.input} editable={false} value={`+91 ${user?.phone}`} />

                            <Text style={styles.label}>CITY, STATE</Text>
                            <TextInput style={[styles.input, { textTransform: "capitalize" }]} editable={false} value={`${user?.city}, ${user?.state}`} />

                            <Text style={styles.label}>GSTNO</Text>
                            <TextInput style={styles.input} editable={false} value={`${user?.gstNo}`} />
                        </View>
                    </>
                )}
            </View>
            <Footer no={true} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: 'black',
        // paddingTop: responsiveHeight(10),
        paddingBottom: responsiveHeight(5),
        alignItems: 'center',
        zIndex: 0,
        position: 'relative'
    },
    profileImage: {
        width: responsiveWidth(24),
        height: responsiveWidth(24),
        borderRadius: responsiveWidth(12),
        borderColor: '#fff',
        borderWidth: 2,
    },
    userName: {
        color: '#fff',
        fontSize: responsiveFontSize(2.5),
        marginTop: responsiveHeight(2),
    },
    lastVisit: {
        color: '#fff',
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(0.5),
    },
    infoContainer: {
        padding: responsiveWidth(7),
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -responsiveHeight(3),
    },
    label: {
        color: '#888',
        fontSize: responsiveFontSize(1.5),
        marginBottom: responsiveHeight(1),
        marginTop: responsiveHeight(2),
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        fontSize: responsiveFontSize(2),
        paddingBottom: responsiveHeight(0.5),
        color: '#333',
    },
    backButton: {
        position: 'absolute',
        top: responsiveHeight(0),
        left: responsiveWidth(0),
        width: responsiveWidth(10),
        height: responsiveHeight(5),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        zIndex: 2,  // Higher zIndex to ensure visibility over other components
    },
});

export default Profile;


