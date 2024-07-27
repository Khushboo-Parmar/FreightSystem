import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ScrollView, Alert } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
const SignUpForm = () => {
    const route = useRoute();
    const { userId } = route.params;
    const phoneNumber = useSelector(state => state.phone.phoneNumber);

    const [partnerName, setPartnerName] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [file, setFile] = useState(null);
    const [file_id, setFileId] = useState('');
    const [cityList, setCityList] = useState([]);
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleFileUpload = async () => {
        if (!file) {
            Toast.show({
                type: 'Error',
                text1: 'Please select a file first',
            });
            return null;
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
                setFileId(data.data.file_id);
                return data.data.file_id;
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'File upload failed',
                    text2: data.message,
                });
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to upload the file. Please check your network connection and try again',
            });
            return null;
        }
    };

    const handleSignUp = async () => {
        const uploadedFileId = await handleFileUpload();
        if (!uploadedFileId) return;

        const formData = new FormData();
        formData.append('full_name', partnerName);
        formData.append('gst_no', gstNo);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('user_id', userId);
        formData.append('file_id', uploadedFileId);
        formData.append('email', email);

        try {
            const response = await fetch(`${process.env.BASE_URL}sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            const data = await response.json();
            if (data.status === 200) {
                console.log('Success:', data);
                Toast.show({
                    type: 'success',
                    text1: 'Sign up successful',
                });
                navigation.navigate('Loginphone');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Sign up failed',
                    text2: data.message,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to submit the form. Please check your network connection and try again.',
            });
        }
    };

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

    const removeFile = () => {
        setFile(null);
    };
    return (
        <View style={styles.container}>
            <Image style={styles.bgLogo} source={require('../../Images/logo.png')} />
            <Text style={styles.signupHeading}>Sign Up</Text>

            <ScrollView>
                <View style={styles.inputContainer}>
                    <Icon name="user" size={18} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="PARTNER NAME"
                        placeholderTextColor="grey"
                        value={partnerName}
                        onChangeText={setPartnerName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="MAIL ID"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="sticky-note" size={18} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="GST NO."
                        value={gstNo}
                        onChangeText={setGstNo}
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="address-card-o" size={18} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="ADDRESS"
                        value={address}
                        onChangeText={setAddress}
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={[styles.inputContainer, { marginLeft: responsiveWidth(2) }]}>
                    <Icon name="map-marker" size={18} color="#ee1d23" style={styles.icon} />

                    <Dropdown
                        style={styles.input}
                        data={cityList}
                        labelField="label"
                        valueField="value"
                        placeholder="CITY"
                        itemTextStyle={styles.itemTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        value={city}
                        onChange={item => {
                            setCity(item.value);
                        }}
                    />
                </View>

                <TouchableOpacity style={styles.uploadButton} onPress={handleShopDocumentUpload}>
                    <Text style={styles.uploadButtonText}>Upload Shop Images/PDFs</Text>
                </TouchableOpacity>
                {file && (
                    <View style={styles.imageContainer}>
                        {file.type.includes('image') ? (
                            <>
                            <Image
                                source={{ uri: file.uri }}
                                style={styles.uploadedImage}
                                resizeMode="cover"
                            />
                            <TouchableOpacity style={styles.removeButton} onPress={removeFile}>
                                    <Icon name="times-circle" size={15} color="red" />
                                </TouchableOpacity>
                                </>
                        ) : (
                            <View style={styles.pdfContainer}>
                                <Icon name="file-pdf-o" size={50} color="red" />
                                <Text style={styles.pdfText}>{file.name}</Text>
                                <TouchableOpacity style={styles.removeButton} onPress={removeFile}>
                                    <Icon name="times-circle" size={15} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: responsiveHeight(2),
    },
    signupHeading: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(3),
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        width: responsiveWidth(80),
        paddingHorizontal: responsiveWidth(3),
    },
    input: {
        flex: 1,
        height: responsiveHeight(6),
        paddingHorizontal: responsiveWidth(2.5),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: responsiveFontSize(1.8),
        color: 'black',
    },
    icon: {
        marginRight: responsiveWidth(2.5),
    },
    uploadButton: {
        backgroundColor: '#fff',
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(2.5),
        borderRadius: 5,
        marginTop: responsiveHeight(2),
        borderWidth: 1,
        borderColor: '#ee1d23',
    },
    uploadButtonText: {
        color: '#ee1d23',
        fontSize: responsiveFontSize(1.8),
        textAlign: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(2.5),
    },
    uploadedImage: {
        width: responsiveWidth(20),
        height: responsiveHeight(10),
        marginRight: responsiveWidth(2),
        borderWidth: 1,
        borderColor: '#ccc',
        position:'relative',
    },
    pdfContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pdfText: {
        marginLeft: responsiveWidth(2),
        fontSize: responsiveFontSize(1.8),
        color: 'black',
    },
    signupButton: {
        backgroundColor: '#ee1d23',
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(10),
        borderRadius: 5,
        marginTop: responsiveHeight(3),
    },
    signupButtonText: {
        color: '#fff',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
    },
    itemTextStyle:{
        color:'black'
    },
    removeButton: {
        position: 'absolute',
        top:responsiveHeight(0.5),
        left: responsiveWidth(14),
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderStyle:{
        color:'grey'
    },
    selectedTextStyle: {
        color: 'black',
    },
});

export default SignUpForm;
