import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Dropdown } from 'react-native-element-dropdown';
import { updateUser } from '../../../reduxFeatures/content/userReducer';

const UpdateProfile = ({ navigation }) => {
    const user = useSelector(state => state.user.user) || {};
    const dispatch = useDispatch();
    const [name, setName] = useState(user.full_name || '');
    const [email, setEmail] = useState(user.email || '');
    const [address, setAddress] = useState(user.address || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [city, setCity] = useState(user.city || '');
    const [cityList, setCityList] = useState([]);
    const [file, setFile] = useState(user.file || null);
    const [file_id, setFileId] = useState('');
    const [fileUri, setFileUri] = useState(user.file);
    const iconMapping = {
        name: 'user',
        email: 'envelope',
        phone: 'phone',
        city: 'map-marker',
        address: 'address-book'
    };

    useEffect(() => {
        const fetchCityList = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}city-name`);
                const data = await response.json();
                const cityNames = data.map(item => ({
                    label: item.city_name,
                    value: item.id,
                }));
                setCityList(cityNames);
            } catch (error) {
                console.error('Error fetching city list:', error.message);
            }
        };

        fetchCityList();
    }, []);

    const handleShopDocumentUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
                allowMultiSelection: false,
            });

            const selectedFile = {
                uri: res[0].uri,
                name: res[0].name,
                type: res[0].type,
            };
            setFile(selectedFile);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picking');
            } else {
                console.log('Error picking document:', err);
            }
        }
    };

    const handleFileUpload = async () => {
        console.log('Updating profile with file:', file);

        if (!file) {

            return '';
        }

        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type,
        });

        try {
            const response = await fetch(`${process.env.BASE_URL}file-Upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();

            if (data.status === 200) {
                return data.data.file_id;
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'File upload failed',
                    text2: data.message,
                });
                return '';
            }
        } catch (error) {
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to upload the file. Please check your network connection and try again',
            });
            return '';
        }
    };


    const handleUpdate = async () => {
        const uploadedFileId = await handleFileUpload();
        // if (!uploadedFileId) return;
        const finalFileId = uploadedFileId || file_id;

        try {
            const token = await AsyncStorage.getItem('token');
            const formData = new FormData();
            formData.append('full_name', name);
            formData.append('email', email);
            formData.append('city', city);
            formData.append('address', address);
            formData.append('phone', phone);
            formData.append('file_id', finalFileId);

            const response = await fetch(`${process.env.BASE_URL}update-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log('data ===', data)
            console.warn('data ===', data)
            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Profile updated successfully',
                });
                dispatch(updateUser({
                    user: {
                        ...user,
                        full_name: name,
                        email: email,
                        city: city,
                        address: address,
                        phone: phone,
                        file_id: finalFileId
                        // file_id: uploadedFileId
                    }
                }));
                navigation.goBack();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update profile',
                    text2: data.message || 'An unknown error occurred',
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
            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', gap: responsiveWidth(25) }}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Profile</Text>

            </View>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: file.uri ? file.uri : user?.file }}
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.uploadButton} onPress={handleShopDocumentUpload}>
                    <FontAwesome name="pencil" size={responsiveFontSize(3)} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <FontAwesome name={iconMapping.name} size={responsiveFontSize(2.5)} style={styles.icon} />
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                        placeholderTextColor='black'
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name={iconMapping.email} size={responsiveFontSize(2.5)} style={styles.icon} />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor='black'
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name={iconMapping.phone} size={responsiveFontSize(2.5)} style={styles.icon} />
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone"
                        placeholderTextColor='black'
                        style={styles.input}
                        editable={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name={iconMapping.address} size={responsiveFontSize(2.5)} style={styles.icon} />
                    <TextInput
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Address"
                        placeholderTextColor='black'
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name={iconMapping.city} size={responsiveFontSize(2.5)} style={styles.icon} />
                    <Dropdown
                        style={[styles.input, styles.dropdownstyle]}
                        data={cityList}
                        labelField="label"
                        valueField="value"
                        placeholder={city || "Select City"}
                        itemTextStyle={styles.itemTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        value={city}
                        onChange={item => setCity(item.value)}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
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
        marginTop:responsiveHeight(2)
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
        paddingLeft: responsiveWidth(1.5),
        width: responsiveWidth(89),
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
    placeholderStyle: {
        color: 'black'
    },
    selectedTextStyle: {
        color: 'black',
    },
    itemTextStyle: {
        color: 'black'
    },
    dropdownstyle: {
        padding: responsiveWidth(3)
    },
    backButton: {
        marginLeft: responsiveWidth(1),
        width: responsiveWidth(10),
        backgroundColor: '#3c3c3c',
        height: responsiveHeight(5),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'center',
        // marginBottom: responsiveHeight(2),
        color: 'black',
    },
});

export default UpdateProfile;