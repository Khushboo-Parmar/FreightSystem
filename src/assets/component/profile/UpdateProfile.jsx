import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const UpdateProfile = ({ navigation }) => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        address: user.address,
    });
    const [file, setFile] = useState(null);
    const [fileUri, setFileUri] = useState(user.file);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleFileUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                allowMultiSelection: false,
            });

            const selectedFile = {
                uri: res[0].uri,
                name: res[0].name,
                type: res[0].type,
            };
            setFile(selectedFile);
            setFileUri(res[0].uri);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picking');
            } else {
                console.error('Error picking document:', err);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'An error occurred while picking the document. Please try again..',
                });
            }
        }
    };

    const handleSubmit = async () => {
        let profilePictureId = user.file;

        if (file) {
            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                name: file.name,
                type: file.type,
            });

            try {
                const uploadResponse = await fetch(`${process.env.BASE_URL}file-Upload`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                const uploadData = await uploadResponse.json();

                if (uploadResponse.status === 200) {
                    profilePictureId = uploadData.data.file_id;
                } else {
                    Toast.show({
                        type: 'Error',
                        text1: 'File upload failed',
                        text2: uploadData.message,
                    });
                    return;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to upload the file. Please check your network connection and try again.',
                });
             
                return;
            }
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${process.env.BASE_URL}update-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    full_name: form.name,
                    email: form.email,
                    city: form.city,
                    address: form.address,
                    phone: form.phone,
                    file_id: profilePictureId
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                dispatch({ type: 'updateUser', payload: { ...form, profilePictureId} });
                Toast.show({
                    type: 'success',
                    text1: 'Profile updated successfully',
                });
                navigation.goBack();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update profile',
                    text2: data.message,
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to update profile. Please try again.',
            });
        }
    };

    const iconMapping = {
        name: 'user',
        email: 'envelope',
        phone: 'phone',
        city: 'map-marker',
        address: 'address-book'
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Image source={{ uri: fileUri }} style={styles.profileImage} />
                <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
                    <FontAwesome name="pencil" size={responsiveFontSize(3)} color="white" />
                </TouchableOpacity>
            </View>

            {Object.keys(form).map((key) => (
                <View key={key} style={styles.inputContainer}>
                    <FontAwesome name={iconMapping[key]} size={responsiveFontSize(2.5)} style={styles.icon} />
                    <TextInput
                        value={form[key]}
                        onChangeText={(value) => handleChange(key, value)}
                        placeholder={`Enter ${key}`}
                        placeholderTextColor='black'
                        style={styles.input}
                    />
                </View>
            ))}
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveWidth(5),
        backgroundColor: 'white',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
        position: 'relative',
    },
    profileImage: {
        width: responsiveWidth(30),
        height: responsiveHeight(15),
        borderRadius: responsiveWidth(15),
        borderColor: 'red',
        borderWidth: 1,
        resizeMode: 'cover',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    uploadButton: {
        position: 'absolute',
        bottom: responsiveHeight(1),
        right: responsiveWidth(25),
        backgroundColor: '#ee1d23',
        padding: responsiveWidth(2),
        borderRadius: responsiveWidth(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: responsiveWidth(2),
        padding: responsiveWidth(3),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,

    },
    icon: {
        marginRight: responsiveWidth(2),
        color: 'black',
    },
    input: {
        flex: 1,
        fontSize: responsiveFontSize(2),
        color: "black"
    },
    btn: {
        backgroundColor: '#ee1d23',
        padding: responsiveHeight(2),
        borderRadius: responsiveWidth(2),
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    btnText: {
        color: 'white',
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
    },
});

export default UpdateProfile;
