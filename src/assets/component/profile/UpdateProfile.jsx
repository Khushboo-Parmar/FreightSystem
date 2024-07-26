import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
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
    const [fileUri, setFileUri] = useState(user.profile_picture); // Assuming profile_picture is a field in user object

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
                console.log('Error picking document:', err);
            }
        }
    };
    const handleSubmit = async () => {
        let profilePictureId = user.profile_picture_id;
    
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
                    Alert.alert('Error', uploadData.message || 'File upload failed');
                    return;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                Alert.alert('Failed to upload the file. Please check your network connection and try again.');
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
                dispatch({ type: 'updateUser', payload: { ...form, profile_picture_id: profilePictureId } });
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
    

    return (
        <View style={styles.container}>
            <View >
            <Image source={{ uri: fileUri }} style={styles.profileImage} />
            
            <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
                <FontAwesome name="pencil" size={25} color="black" />
            </TouchableOpacity>
            </View>

            {Object.keys(form).map((key) => (

                <View key={key} style={styles.inputContainer}>
                    <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
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
                <Text style={styles.btnText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    profileImage: {
        width: responsiveWidth(30),
        height: responsiveHeight(15),
        borderRadius: 50,
        borderColor:'black',
        alignSelf: 'center',
        marginBottom: 20,
        position:'relative',
        borderWidth:1,
        resizeMode:'contain'
    },
    uploadButton: {
        alignItems: 'center',
        position:'absolute',
        bottom:responsiveHeight(2),
        left:responsiveWidth(50),
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#ee1d23',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UpdateProfile;
