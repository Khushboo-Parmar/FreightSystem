import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ScrollView, Alert, RefreshControl, ToastAndroid } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CaptchaV2Lib1 from './Recaptcha/Recaptcha';
import Modal from 'react-native-modal';
const SignUpForm = () => {
    const route = useRoute();
    const { userId } = route.params;
    const { user_id } = route.params || {}; 
    const phoneNumber = useSelector(state => state.phone.phoneNumber);
    const [partnerName, setPartnerName] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [file, setFile] = useState(null);
    const [file_id, setFileId] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [stateList, setStateList] = useState([]);
    const [robot, setRobot] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const [isValidGstNo, setIsValidGstNo] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); 
    const navigation = useNavigation();

    const handleFileUpload = async () => {

        const formData = new FormData();
        formData.append('file', {
            uri: file?.uri,
            name: file?.name,
            type: file?.type,
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

            return null;
        }
    };

    const handleSignUp = async () => {
        if (!robot) {
            ToastAndroid.show('Please complete the CAPTCHA verification to proceed.', ToastAndroid.SHORT);
            return null;
        }
        const uploadedFileId = await handleFileUpload();
        const formData = new FormData();
        formData.append('full_name', partnerName);
        formData.append('gst_no', gstNo);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('user_id', userId || user_id);
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

                ToastAndroid.show('Sign up successful', ToastAndroid.SHORT);
                navigation.navigate('Loginphone');
            } else {
                // Toast.show({
                //     type: 'error',
                //     text1: 'Sign up failed',
                //     text2: data?.message,
                // });
                ToastAndroid.show(`${data?.message[0]}`, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error:', error);
            ToastAndroid.show(`Failed to submit the form. Please check your network connection and try again.`, ToastAndroid.SHORT);
        }
    };
    const handleFileSelection = () => {
        setModalVisible(true);
    };
    const selectFile = (source) => {
        setModalVisible(false);

        const options = {
            mediaType: 'photo',
            includeBase64: false,
            quality: 1,
        };

        const callback = (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setFile({
                    uri: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                });
                console.log('selected file', response.assets[0]);
            }
        };

        if (source === 'camera') {
            launchCamera(options, callback);
        } else if (source === 'gallery') {
            launchImageLibrary(options, callback);
        }
    };
    useEffect(() => {
        const fetchStateList = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}state-list`);
                const data = await response.json();
                const StateNames = data.map(item => ({
                    label: item.state,
                    value: item.id,
                }));

                setStateList(StateNames);
            } catch (error) {
                console.error('Error fetching city list:', error.message);
            }
        };

        fetchStateList();
    }, []);
    const removeFile = () => {
        setFile(null);
    };

    const validateGstNo = (gst) => {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
        return gstRegex.test(gst);
    };


    const handleGstNoChange = (value) => {
        setGstNo(value);
        setIsValidGstNo(validateGstNo(value));
    };
    const onRefresh = async () => {
        setIsRefreshing(true);
        // await fetchStateList();
        setIsRefreshing(false);
    };
    return (
        <View style={styles.container}>
            <Image style={styles.bgLogo} source={require('../../Images/BTIcon.png')} />

            <Text style={styles.signupHeading}>Sign Up</Text>
            <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }>
                <View >
                    <View style={styles.inputContainer}>
                        <Icon name="user" size={19} color="#ee1d23" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="PARTNER NAME"
                            placeholderTextColor="grey"
                            value={partnerName}
                            onChangeText={setPartnerName}

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="envelope" size={19} color="#ee1d23" style={styles.icon} />
                        <TextInput
                            style={styles.inputemail}
                            placeholder="MAIL ID"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon5 name="file-alt" size={19} color="#ee1d23" style={styles.icon} />
                        <TextInput
                            style={[styles.input, !isValidGstNo && styles.errorBorder]}
                            placeholder="GST NO."
                            value={gstNo}
                            onChangeText={handleGstNoChange}
                            placeholderTextColor="grey"
                        />
                        {/* <TextInput
                        style={styles.input}
                        placeholder="GST NO."
                        value={gstNo}
                        onChangeText={setGstNo}
                        placeholderTextColor="grey"
                    />  */}
                    </View>

                    {!isValidGstNo && <Text style={styles.errorText}>(Invalid GST Number)</Text>}

                    <View style={styles.inputContainer}>
                        <Icon name="address-card-o" size={19} color="#ee1d23" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="ADDRESS"
                            value={address}
                            onChangeText={setAddress}
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={[styles.inputContainer]}>
                        <Icon name="map-marker" size={19} color="#ee1d23" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="CITY"
                            value={city}
                            onChangeText={setCity}
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={[styles.inputContainer]}>
                        <Icon name="globe" size={19} color="#ee1d23" style={styles.icon} />

                        <Dropdown
                            style={styles.input}
                            data={stateList}
                            labelField="label"
                            valueField="value"
                            placeholder="STATE"
                            itemTextStyle={{ color: 'black' }}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            value={state}
                            onChange={item => {
                                setState(item.value);
                            }}
                            search
                            searchPlaceholder="Search..."
                            inputSearchStyle={styles.inputSearchStyle}
                        />
                    </View>
                    <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.title}>Select Image</Text>
                                <TouchableOpacity style={styles.button} onPress={() => selectFile('camera')}>
                                    <Text style={styles.buttonText}>Take Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => selectFile('gallery')}>
                                    <Text style={styles.buttonText}>Choose from Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <TouchableOpacity style={styles.uploadButton} onPress={handleFileSelection}>
                    <Text style={styles.uploadButtonText}>Upload Shop Image</Text>
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
                                <TouchableOpacity style={styles.removeButtonpdf} onPress={removeFile}>
                                    <Icon name="times-circle" size={15} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
                <CaptchaV2Lib1 setRobot={setRobot} />
            </ScrollView>

            <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: responsiveHeight(2),
        // paddingHorizontal: responsiveWidth(10)
    },
    signupHeading: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(3),
        marginTop: responsiveHeight(3),
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        width: responsiveWidth(80),
        // gap:2,
    },
    input: {
        flex: 1,
        height: responsiveHeight(6),
        paddingHorizontal: responsiveWidth(2.5),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: responsiveFontSize(1.8),
        color: 'black',
        textTransform: 'uppercase',
        marginLeft: responsiveWidth(0.5)
    },
    inputemail: {
        flex: 1,
        height: responsiveHeight(6),
        paddingHorizontal: responsiveWidth(2.5),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: responsiveFontSize(1.8),
        color: 'black',
    },
    icon: {
        // marginRight: responsiveWidth(1),
        width: responsiveWidth(6),
    },
    uploadButton: {
        backgroundColor: '#fff',
        paddingVertical: responsiveHeight(1.8),
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
        position: 'relative',
    },
    pdfContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: responsiveWidth(2),
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
        borderRadius: 10,
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
    },
    signupButtonText: {
        color: '#fff',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
    },
    itemTextStyle: {
        color: 'black'
    },
    removeButton: {
        position: 'absolute',
        top: responsiveHeight(0.5),
        left: responsiveWidth(14),
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonpdf: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderStyle: {
        color: 'grey'
    },
    selectedTextStyle: {
        color: 'black',
    },
    bgLogo: {
        height: responsiveWidth(20),
        width: responsiveWidth(20),
        resizeMode: 'cover'
    },
    itemTextStyle: {
        fontSize: responsiveFontSize(2),
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(5),
        borderRadius: 20,
        width: responsiveWidth(80),
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: responsiveFontSize(2),
        marginBottom: 15,
    },
    title: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(2),
        color: 'black',
        fontWeight: "700",
    },
    button: {
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveWidth(5),
        backgroundColor: '#ee1d23',
        borderRadius: 20,
        marginVertical: responsiveHeight(1),
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: "600"
    },
    errorBorder: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: responsiveFontSize(1.8),
        alignSelf:'flex-end',
    },
    inputSearchStyle: {
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(1.8),
        color:'black',
      },
});
export default SignUpForm;