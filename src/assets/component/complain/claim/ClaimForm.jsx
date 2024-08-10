import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, StyleSheet, RefreshControl, ToastAndroid, Modal, Button} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from '../../Header';

const ClaimForm = (props) => {

    const [randomCode, setRandomecode] = useState(Array.from({ length: 5 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36))).join(''));

    console.warn(randomCode)

    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const user = useSelector((state) => state.user.user);
    const userId = user.id;
    const navigation = useNavigation();

    // const [isModalVisible, setModalVisible] = useState(false);
    // const [selectedFileType, setSelectedFileType] = useState('');


    const route = useRoute();
    const [totalBoxes, setTotalBoxes] = useState(props?.route.params?.totalBoxes);
    const [totalAmount, setTotalAmount] = useState(props?.route.params);
    const [selectedProduct, setSelectedProduct] = useState(props?.route.params?.selectedProduct);
    const [claimDetails, setClaimDetails] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDistributor, setSelectedDistributor] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');

    const [freightAmount, setFreightAmount] = useState('');
    const [invoiceFiles, setInvoiceFiles] = useState([]);
    const [transportFiles, setTransportFiles] = useState([]);
    const [distributorList, setDistributorList] = useState([]);

    const [productList, setProductList] = useState([]);
    const [productPrice, setProductPrice] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };
    const today = new Date();
    const handleFileUpload = async (file) => {
        if (!file) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select a file first.',
            });
            return null;
        }

        const formData = new FormData();
        formData.append('files[]', {
            uri: file.uri,
            name: file.name,
            type: file.type,
        });

        try {
            const response = await fetch(`${process.env.BASE_URL}multi-file`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();

            if (data.status === 200) {
                console.log('File uploaded successfully:', data.file_ids);
                return data.file_ids;
            } else {
                console.error('File upload error:', data.message);
                Toast.show({
                    type: 'error',
                    text1: 'File upload failed',
                    text2: data.message,
                });
                return null;
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to upload the file. Please check your network connection and try again.',
            });
            return null;
        }
    };

// modal start


// const toggleModal = () => {
//     setModalVisible(!isModalVisible);
// };

// const handleFileSelection = (type) => {
//     setSelectedFileType(type);
//     toggleModal();
// };

// const selectImage = async (source) => {
//     const options = {
//         mediaType: 'photo',
//         includeBase64: false,
//     };

//     const response = source === 'camera' ? await launchCamera(options) : await launchImageLibrary(options);

//     if (response.didCancel) {
//         console.log('User cancelled image picker');
//     } else if (response.errorCode) {
//         console.error('ImagePicker Error: ', response.errorMessage);
//     } else {
//         const selectedFile = {
//             uri: response.assets[0].uri,
//             name: response.assets[0].fileName,
//             type: response.assets[0].type,
//         };
//         if (selectedFileType === 'invoice') {
//             setInvoiceFiles(prevFiles => [...prevFiles, selectedFile]);
//         } else if (selectedFileType === 'transport') {
//             setTransportFiles(prevFiles => [...prevFiles, selectedFile]);
//         }
//     }

//     toggleModal();
// };
// modal end




    const handleFileSelection = async (type) => {
        try {
            const options = {
                mediaType: 'photo',
                includeBase64: false,
            };
            const result = await new Promise((resolve, reject) => {
                Alert.alert(
                    'Select Image',
                    'Choose an option',
                    [
                        { text: 'Camera', onPress: () => launchCamera(options, (response) => resolve(response)) },
                        { text: 'Gallery', onPress: () => launchImageLibrary(options, (response) => resolve(response)) },
                        { text: 'Cancel', onPress: () => reject('User cancelled'), style: 'cancel' }
                    ],
                    { cancelable: false }
                );
            });

            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.errorCode) {
                console.error('ImagePicker Error: ', result.errorMessage);
            } else {
                const selectedFile = {
                    uri: result.assets[0].uri,
                    name: result.assets[0].fileName,
                    type: result.assets[0].type,
                };
                if (type === 'invoice') {
                    setInvoiceFiles(prevFiles => [...prevFiles, selectedFile]);
                } else if (type === 'transport') {
                    setTransportFiles(prevFiles => [...prevFiles, selectedFile]);
                }
            }
        } catch (err) {
            console.error('Error picking file:', err);
        }
    };
    const handleSubmitClaim = async () => {

        const uploadedInvoiceFileIds = await Promise.all(invoiceFiles.map(handleFileUpload));
        const uploadedTransportFileIds = await Promise.all(transportFiles.map(handleFileUpload));

        if (!selectedDate) {
            ToastAndroid.show('Date of purchase is required.', ToastAndroid.SHORT);
            return;
        }

        if (!selectedDistributor) {
            ToastAndroid.show('Distributor is required.', ToastAndroid.SHORT);
            console.log('Distributor is missing');
            return;
        }
        if (!invoiceNo) {
            ToastAndroid.show('invoiceNo is required.', ToastAndroid.SHORT);
            console.log('invoiceNo is missing');
            return;
        }
        if (!props?.route?.params?.totalAmount) {
            ToastAndroid.show('Total amount is required.', ToastAndroid.SHORT);
            return;
        }
        if (!freightAmount) {
            ToastAndroid.show('Freight amount is required.', ToastAndroid.SHORT);
            return;
        }
        if (invoiceFiles.length === 0) {
            ToastAndroid.show('Invoice images are required.', ToastAndroid.SHORT);
            return;
        }
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

        if (selectedDate < fifteenDaysAgo) {
            ToastAndroid.show('Sorry, you cannot submit the claim form for purchases made more than 15 days ago.', ToastAndroid.SHORT);
            return;
        }

        if (uploadedInvoiceFileIds.includes(null) || uploadedTransportFileIds.includes(null)) {
            return;
        }

        const formData = new FormData();
        formData.append('purchase_date', selectedDate ? selectedDate.toISOString().split('T')[0] : '');
        formData.append('distributor_id', selectedDistributor);
        formData.append('invoice_no', invoiceNo);
        formData.append('freight_amount', freightAmount);
        formData.append('claim_details', claimDetails);
        formData.append('generated_by', userId);
        formData.append('product_id', selectedProduct);
        formData.append('code', randomCode); 

        console.log('selectedProduct', selectedProduct)

        uploadedInvoiceFileIds.forEach((fileId, index) => {
            console.warn(fileId)
            formData.append(`invoice_image`, fileId);
        });
        uploadedTransportFileIds.forEach((fileId, index) => {
            formData.append(`transport_receipt`, fileId);
        });

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found");
            }
            console.log('Token:', token);

            const response = await fetch(`${process.env.BASE_URL}add-claim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
console.log("data", data)
            if (data.status === 200) {

                setClaimDetails('');
                setSelectedDate(null);
                setSelectedDistributor('');
                setInvoiceNo('');
                setTotalBoxes('');
                setTotalAmount('');
                setFreightAmount('');
                setInvoiceFiles([]);
                setTransportFiles([]);
                setSelectedProduct('')
                console.log('Claim submitted successfully:', data);
                navigation.navigate('ClaimHistory');
            } else {

                Toast.show({
                    type: 'error',
                    text1: 'Claim submission failed',
                    text2: data.message,
                });
            }
        } catch (error) {
            console.error('Error submitting claim:', error.message);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to submit the claim. Please check your network connection and try again.',
            });

        }
    };
    useEffect(() => {
        const fetchDistributorList = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}distributor-name`);
                const data = await response.json();

                const distributors = data.map(item => ({ label: item.name, value: item.id }));
                setDistributorList(distributors);
            } catch (error) {
                console.error('Error fetching distributor list:', error.message);
            }
        };

        fetchDistributorList();
    }, []);


    const removeFile = (type, index) => {
        if (type === 'invoice') {
            setInvoiceFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        } else if (type === 'transport') {
            setTransportFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        }
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container1}>
                <Text style={styles.heading}>Freight Claim Form</Text>
                <ScrollView contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
                        <Icon name="calendar" size={20} color="#ee1d23" style={styles.icon} />
                        <Text style={styles.dateText}>
                            {selectedDate ? selectedDate.toLocaleDateString() : 'SELECT DATE OF PURCHASE'}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                        maximumDate={today}
                    />

                    <View style={styles.inputContainer}>
                        <Icon name="building" size={20} color="#ee1d23" style={styles.icon} />
                        <Dropdown
                            style={styles.input}
                            data={distributorList}
                            labelField="label"
                            valueField="value"
                            placeholder="DISTRIBUTOR NAME"
                            itemTextStyle={styles.itemTextStyle}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            value={selectedDistributor}
                            onChange={item => {
                                setSelectedDistributor(item.value);
                            }}
                        />
                    </View>

                    <TouchableOpacity style={styles.productButtonstyle} onPress={() => navigation.navigate('AddProduct' ,{code:randomCode})}>
                        <Text style={styles.productBtntext}><Icon name="plus" size={15} color="white" />  ADD PRODUCT DETAIL</Text>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Icon name="file-text" size={20} color="#ee1d23" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="INVOICE No."
                            placeholderTextColor="grey"
                            value={invoiceNo}
                            onChangeText={setInvoiceNo}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="truck" size={20} color="#ee1d23" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="FREIGHT AMOUNT"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            value={freightAmount}
                            onChangeText={setFreightAmount}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="info" size={20} color="#ee1d23" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="REMARK"
                            placeholderTextColor="grey"
                            multiline
                            numberOfLines={4}
                            value={claimDetails}
                            onChangeText={setClaimDetails}
                        />
                    </View>

                    <TouchableOpacity style={styles.fileButton} onPress={() => handleFileSelection('invoice')}>
                        <Text style={styles.fileButtonText}>Upload Invoice Images / Capture New</Text>
                    </TouchableOpacity>

                    {invoiceFiles.map((file, index) => (
                        <ScrollView horizontal key={index} style={styles.filePreviewContainer}>
                            <View style={styles.filePreview}>
                                <Image
                                    source={{ uri: file.uri }}
                                    style={styles.uploadedImage}
                                />
                                <TouchableOpacity style={styles.removeButton} onPress={() => removeFile('invoice', index)}>
                                    <Icon name="times-circle" size={15} color="red" />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    ))}

                    <TouchableOpacity style={styles.fileButton} onPress={() => handleFileSelection('transport')}>
                        <Text style={styles.fileButtonText}>Upload Transport Receipt Images / Capture New</Text>
                    </TouchableOpacity>

                    {transportFiles.map((file, index) => (
                        <ScrollView horizontal key={index} style={styles.filePreviewContainer}>
                            <View style={styles.filePreview}>
                                <Image
                                    source={{ uri: file.uri }}
                                    style={styles.uploadedImage}
                                />
                                <TouchableOpacity style={styles.removeButton} onPress={() => removeFile('transport', index)}>
                                    <Icon name="times-circle" size={15} color="red" />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    ))}

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitClaim}>
                        <Text style={styles.submitButtonText}>Submit Claim</Text>
                    </TouchableOpacity>
                </ScrollView>
{/* modal start */}
{/* <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={toggleModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Select Image Source</Text>
                            <Button title="Camera" onPress={() => selectImage('camera')} />
                            <Button title="Gallery" onPress={() => selectImage('gallery')} />
                            <Button title="Cancel" onPress={toggleModal} />
                        </View>
                    </View>
                </Modal> */}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    heading: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: responsiveHeight(2)
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    icon: {
        marginRight: 10,
        color: '#ee1d23',
    },
    input: {
        flex: 1,
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(1.8),
        color: '#333',
        textTransform: 'uppercase'
    },
    dateText: {
        fontSize: responsiveFontSize(1.8),
        color: '#333',
        marginLeft: 10,
    },
    fileButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ee1d23',
    },
    fileButtonText: {
        color: '#ee1d23',
        fontSize: responsiveFontSize(1.8),
        textAlign: 'center',
    },
    filePreview: {
        marginTop: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#ee1d23',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: responsiveHeight(4),
        marginTop: responsiveHeight(4)
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
    },
    placeholderStyle: {
        color: '#333',
        fontSize: responsiveFontSize(1.8),
    },
    itemTextStyle: {
        color: '#333',
        // fontSize: responsiveFontSize(1.8),
    },
    uploadedImage: {
        width: responsiveWidth(20),
        height: responsiveHeight(10),
        position: 'relative',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        width: 100,
        height: 80,
        marginRight: 10,
        position: 'relative',
    },
    selectedTextStyle: {
        color: 'black',
    },
    filePreviewContainer: {
        flexDirection: 'row',
    },
    fileText: {
        marginLeft: responsiveWidth(2),
        fontSize: responsiveFontSize(1.8),
        color: 'black',
    },
    pdfContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: responsiveWidth(2),
    },
    removeButtonpdf: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ee1d23',
    },
    productButtonstyle: {
        backgroundColor: '#ee1d23',
        padding: responsiveWidth(3),
        alignSelf: 'flex-end',
        borderRadius: 10,
    },
    productBtntext: {
        color: 'white',
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: responsiveFontSize(2),
        marginBottom: 15,
    },

});
export default ClaimForm;