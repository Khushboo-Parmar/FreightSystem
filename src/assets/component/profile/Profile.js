
import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, ScrollView, TextInput, Alert } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'

const Profile = () => {
    const user = useSelector(state => state.user.user);
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        phoneNumber: phoneNumber,
        city: user.city,
        district: user.district,
    });
console.log("id", user.id);
const id=  user.id
    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://192.168.0.192:3000/api/updateProfile/${id}`, {
            // const response = await fetch(`https://freight-6.onrender.com/api/updateProfile/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.status === 200) {
                dispatch({ type: 'UPDATE_USER', payload: form });
                setModalVisible(false);
                // Alert.alert("Success", "Profile updated successfully");
                Toast.show({
                    type: 'success',
                    text1: 'Profile updated successfully',
                });
            } else {
                // Alert.alert("Error", data.message || "Failed to update profile");
                Toast.show({
                    type: 'error',
                    text1: 'Profile updated successfully',
                    text2: data.message,
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            // Alert.alert("Error", "Failed to update profile");
            Toast.show({
                type: 'error',
                text1: 'error',
                text2: 'Failed to update profile. Please try again.',
            });
        }
    };

    const UpdatetoggleModal = () => {
        setModalVisible(!modalVisible);
    };


    return (
        <View style={styles.container}>
            {user && (
                <>
                    <View style={styles.curve}>
                        {/* <Image style={styles.profilepic} source={require('../../Images/profile.png')} /> */}
                        <Image
                            style={styles.profilepic}
                            source={{ uri: `data:image/jpeg;base64,${user.shopImages}` }} 
                        />
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="user-o" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.name}</Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="envelope-o" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.email}</Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="tablet" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.phoneNumber}</Text>
                            </View>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="building" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.city}</Text>
                            </View>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.infoIcon}>
                                <FontAwesome name="building" size={25} color="black" />
                            </View>
                            <View style={styles.infoDetail}>
                                <Text style={styles.infoDetailText}>{user.district}</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btn} onPress={UpdatetoggleModal}>
                            <Text style={styles.btnText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        transparent={true}
                        animationType="fade"
                        visible={modalVisible}
                        onRequestClose={UpdatetoggleModal}>

                        <ScrollView style={styles.modalContent}>
                            <Text>Edit here...</Text>
                            <Text onPress={UpdatetoggleModal} style={styles.closeModal}>X</Text>

                            <View style={styles.formContainer}>
                                {Object.keys(form).map((key) => (
                                    <View key={key} style={styles.inputContainer}>
                                        <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}<Text style={styles.required}>*</Text></Text>
                                        <TextInput
                                            value={form[key]}
                                            onChangeText={(value) => handleChange(key, value)}
                                            placeholder={`Enter ${key}`}
                                            placeholderTextColor='grey'
                                            style={styles.input}
                                        />
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                    <Text style={styles.btnText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Modal>
                </>
            )}
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    curve: {
        position: 'relative',
        width: responsiveWidth(100),
        height: responsiveHeight(25),
        // backgroundColor: '#2b2b5d',
        backgroundColor: '#ee1d23',
        borderBottomLeftRadius: responsiveWidth(45),
        borderBottomRightRadius: responsiveWidth(45),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    profilepic: {
        position: 'absolute',
        height: responsiveHeight(15),
        width: responsiveWidth(28),
        borderRadius: responsiveWidth(14),
        borderWidth: 2,
        borderColor: '#fff',
        top: responsiveHeight(15),
        left: (responsiveWidth(100) - responsiveWidth(28)) / 2,
    },
    infoContainer: {
        marginTop: responsiveHeight(10),
        paddingHorizontal: responsiveWidth(5),
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: responsiveHeight(2),
        marginBottom: responsiveHeight(1.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoIcon: {
        marginRight: responsiveWidth(5),
    },
    infoDetail: {
        flex: 1,
    },
    infoDetailText: {
        fontSize: responsiveFontSize(2.5),
        color: '#333',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: responsiveHeight(5),
    },
    btn: {
        backgroundColor: "#ee1d23",
        // backgroundColor: "#2b2b5d",
        borderRadius: 20,
        width: responsiveWidth(50),
        padding: responsiveHeight(2),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        alignSelf:'center'
    },
    btnText: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        textAlign: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '90%',
        maxHeight: '70%',
        marginHorizontal: '5%',
        marginTop: responsiveHeight(30),
        padding: 20,
        // borderWidth: 1,
        // borderRadius: 8,
        // borderColor: 'black',
        marginHorizontal:responsiveWidth(5)
    },
    closeModal: {
        color: 'black',
        textAlign: 'right',
        margin:responsiveHeight(1),
        fontSize: responsiveFontSize(2),
    },
    formContainer: {
        padding:responsiveHeight(3),
    },
    inputContainer: {
        gap: 8,
        marginVertical: 10,
    },
    label: {
        fontFamily: 'Poppins-SemiBold',
        color: 'black',
    },
    required: {
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        paddingHorizontal: 10,
        color: 'black',
    },
});
