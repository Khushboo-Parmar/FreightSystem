
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Alert, Image } from 'react-native';
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DocumentPicker from 'react-native-document-picker';
// import { useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ClaimForm = () => {
//     const phoneNumber = useSelector((state) => state.phone.phoneNumber);
//     const user = useSelector(state => state.user.user);
//     const userId = user.id;
//     const navigation = useNavigation();
//     const [claimDetails, setClaimDetails] = useState('');
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [selectedDistributor, setSelectedDistributor] = useState('');
//     const [invoiceNo, setInvoiceNo] = useState('');
//     const [totalBoxes, setTotalBoxes] = useState('');
//     const [totalAmount, setTotalAmount] = useState('');
//     const [freightAmount, setFreightAmount] = useState('');
//     const [invoiceFile, setInvoiceFile] = useState(null);
//     const [transportFile, setTransportFile] = useState(null);
//     const [distributorList, setDistributorList] = useState([]);

//     const showDatePicker = () => setDatePickerVisibility(true);
//     const hideDatePicker = () => setDatePickerVisibility(false);
//     const handleConfirmDate = (date) => {
//         setSelectedDate(date);
//         hideDatePicker();
//     };

//     const handleFileUpload = async (file) => {
//         console.log('Uploading file:', file);
//         if (!file) {
//             Alert.alert('Error', 'Please select a file first');
//             return null;
//         }

//         const formData = new FormData();
//         formData.append('file', {
//             uri: file.uri,
//             name: file.name,
//             type: file.type,
//         });

//         try {
//             console.log('Sending file to server...');
//             const response = await fetch(`${process.env.BASE_URL}file-Upload`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 body: formData,
//             });

//             const data = await response.json();
//             console.log('File upload response:', data);

//             if (data.status === 200) {
//                 console.log('File uploaded successfully:', data.data.file_id);
//                 return data.data.file_id; 
//             } else {
//                 console.error('File upload error:', data.message);
//                 Alert.alert('Error', data.message || 'File upload failed');
//                 return null;
//             }
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             Alert.alert('Failed to upload the file. Please check your network connection and try again.');
//             return null;
//         }
//     };

//     const handleFileSelection = async (type) => {
//         try {
//             const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.images],
//                 allowMultiSelection: false,
//             });

//             console.log('Selected file:', res[0]);

//             const selectedFile = {
//                 uri: res[0].uri,
//                 name: res[0].name,
//                 type: res[0].type,
//             };

//             if (type === 'invoice') {
//                 setInvoiceFile(selectedFile);
//             } else if (type === 'transport') {
//                 setTransportFile(selectedFile);
//             }
//         } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//                 console.log('User cancelled file picking');
//             } else {
//                 console.error('Error picking file:', err);
//             }
//         }
//     };

//     const handleSubmitClaim = async () => {
//         console.log('Submitting claim...');
//         if (!invoiceFile) {
//             Alert.alert('Error', 'Invoice image is required');
//             console.log('Invoice file is missing');
//             return;
//         }
//         if (!selectedDate) {
//             Alert.alert('Error', 'Date of purchase is required');
//             console.log('Date of purchase is missing');
//             return;
//         }
//         if (!selectedDistributor) {
//             Alert.alert('Error', 'Distributor is required');
//             console.log('Distributor is missing');
//             return;
//         }

//         console.log('Uploading files...');
//         const uploadedInvoiceFileId = await handleFileUpload(invoiceFile);
//         const uploadedTransportFileId = await handleFileUpload(transportFile);
//         if (!uploadedInvoiceFileId || !uploadedTransportFileId) return;

//         const fifteenDaysAgo = new Date();
//         fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

//         if (selectedDate < fifteenDaysAgo) {
//             Alert.alert('Error', 'Sorry, you cannot submit the claim form for purchases made more than 15 days ago.');
//             console.log('Date of purchase is more than 15 days ago');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('purchase_date', selectedDate ? selectedDate.toISOString().split('T')[0] : '');
//         formData.append('distributor_id', selectedDistributor);
//         formData.append('invoice_no', invoiceNo);
//         formData.append('total_boxes', totalBoxes);
//         formData.append('total_amount', totalAmount);
//         formData.append('freight_amount', freightAmount);
//         formData.append('claim_details', claimDetails);
//         formData.append('generated_by', userId);
//         formData.append('invoice_image', uploadedInvoiceFileId);
//         formData.append('transport_receipt', uploadedTransportFileId); 

//         console.log('Form data:', formData);

//         try {
//             const token = await AsyncStorage.getItem('token');
//             if (!token) {
//                 throw new Error("Token not found");
//             }
//             console.log('Token:', token);

//             const response = await fetch(`${process.env.BASE_URL}user-claim`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: formData,
//             });

//             const data = await response.json();
//             console.log('Claim submission response:', data);

//             if (data.status === 200) {
//                 console.log('Claim submitted successfully:', data);
//                 navigation.navigate('ClaimHistory');
//             } else {
//                 Alert.alert('Error', data.message || 'Claim submission failed');
//             }
//         } catch (error) {
//             console.error('Error submitting claim:', error.message);
//             Alert.alert('Failed to submit the claim. Please check your network connection and try again.');
//         }
//     };

//     useEffect(() => {
//         const fetchDistributorList = async () => {
//             try {
//                 console.log('Fetching distributor list...');
//                 const response = await fetch(`${process.env.BASE_URL}distributor-name`);
//                 const data = await response.json();
//                 console.log('Distributor list:', data);
//                 const distributors = data.map(item => ({ label: item.name, value: item.id }));
//                 setDistributorList(distributors);
//             } catch (error) {
//                 console.error('Error fetching distributor list:', error.message);
//             }
//         };

//         fetchDistributorList();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>Freight Claim Form</Text>

//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
//                     <Icon name="calendar" size={20} color="#ee1d23" style={styles.icon} />
//                     <Text style={styles.dateText}>
//                         {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date of Purchase'}
//                     </Text>
//                 </TouchableOpacity>
//                 <DateTimePickerModal
//                     isVisible={isDatePickerVisible}
//                     mode="date"
//                     onConfirm={handleConfirmDate}
//                     onCancel={hideDatePicker}
//                 />

//                 <View style={styles.inputContainer}>
//                     <Icon name="building" size={20} color="#ee1d23" style={styles.icon} />
//                     <Dropdown
//                         style={styles.input}
//                         data={distributorList}
//                         labelField="label"
//                         valueField="value"
//                         placeholder="Distributor Name"
//                         itemTextStyle={styles.itemTextStyle}
//                         placeholderStyle={styles.placeholderStyle}
//                         selectedTextStyle={styles.selectedTextStyle} 
//                         value={selectedDistributor}
//                         onChange={item => {
//                             setSelectedDistributor(item.value);
//                         }}
//                     />
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Icon name="file-text" size={20} color="#ee1d23" style={styles.icon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Invoice No."
//                         placeholderTextColor="grey"
//                         value={invoiceNo}
//                         onChangeText={setInvoiceNo}
//                     />
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Icon name="dollar" size={20} color="#ee1d23" style={styles.icon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Total number of boxes"
//                         placeholderTextColor="grey"
//                         keyboardType="numeric"
//                         value={totalBoxes}
//                         onChangeText={setTotalBoxes}
//                     />
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Icon name="money" size={20} color="#ee1d23" style={styles.icon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Total Amount"
//                         placeholderTextColor="grey"
//                         keyboardType="numeric"
//                         value={totalAmount}
//                         onChangeText={setTotalAmount}
//                     />
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Icon name="truck" size={20} color="#ee1d23" style={styles.icon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Freight Amount"
//                         placeholderTextColor="grey"
//                         keyboardType="numeric"
//                         value={freightAmount}
//                         onChangeText={setFreightAmount}
//                     />
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Icon name="info" size={20} color="#ee1d23" style={styles.icon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Claim Details"
//                         placeholderTextColor="grey"
//                         multiline
//                         numberOfLines={4}
//                         value={claimDetails}
//                         onChangeText={setClaimDetails}
//                     />
//                 </View>

//                 <TouchableOpacity style={styles.fileButton} onPress={() => handleFileSelection('invoice')}>
//                     <Text style={styles.fileButtonText}>Upload Invoice Image</Text>
//                 </TouchableOpacity>
//                 {invoiceFile && (

//                     <View style={styles.filePreview}>
//                     {invoiceFile.uri ? (
//                         <Image
//                             source={{ uri: invoiceFile.uri }}
//                             style={styles.uploadedImage}
//                         />
//                     ) : (
//                         <Text>No image selected</Text>
//                     )}
//                                 <TouchableOpacity style={styles.removeButton} onPress={() => removeTransportR(index)}>
//                                     <Icon name="times-circle" size={15} color="red" />
//                                 </TouchableOpacity>
//                 </View>

//                 )}

//                 <TouchableOpacity style={styles.fileButton} onPress={() => handleFileSelection('transport')}>
//                     <Text style={styles.fileButtonText}>Upload Transport Receipt Image</Text>
//                 </TouchableOpacity>
//                 {transportFile && (
//                     <View style={styles.filePreview}>
//                         {/* <Text>{transportFile.name}</Text> */}
//                         {transportFile.uri ? (
//                         <Image
//                             source={{ uri: transportFile.uri }}
//                             style={styles.uploadedImage}
//                         />
//                     ) : (
//                         <Text>No image selected</Text>
//                     )}
//                      <TouchableOpacity style={styles.removeButton} onPress={() => removeTransportR(index)}>
//                                     <Icon name="times-circle" size={15} color="red" />
//                                 </TouchableOpacity>
//                     </View>
//                 )}

//                 <TouchableOpacity style={styles.submitButton} onPress={handleSubmitClaim}>
//                     <Text style={styles.submitButtonText}>Submit Claim</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingHorizontal: 30,
//         paddingTop: 20,
//     },
//     heading: {
//         fontSize: responsiveFontSize(2.5),
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#333',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         paddingVertical: 20,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 15,
//         // borderWidth: 1,
//         borderBottomWidth:1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//     },
//     icon: {
//         marginRight: 10,
//         color: '#ee1d23',
//     },
//     input: {
//         flex: 1,
//         height: responsiveHeight(6),
//         fontSize: responsiveFontSize(2),
//         color: '#333',

//     },
//     dateText: {
//         fontSize: responsiveFontSize(2),
//         color: '#333',
//         marginLeft: 10,
//     },
//     fileButton: {
//         backgroundColor: '#fff',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         marginTop: 10,
//         borderWidth: 1,
//         borderColor: '#ee1d23',
//     },
//     fileButtonText: {
//         color: '#ee1d23',
//         fontSize: 16,
//         textAlign: 'center',
//     },
//     filePreview: {
//         marginTop: 10,
//         width: responsiveWidth(20),
//         height: responsiveHeight(10),
//         marginRight: 10,
//         position: 'relative',
//     },
//     submitButton: {
//         backgroundColor: '#ee1d23',
//         paddingVertical: 15,
//         paddingHorizontal: 30,
//         borderRadius: 10,
//         marginBottom: responsiveHeight(4),
//         marginTop:responsiveHeight(4)
//     },
//     submitButtonText: {
//         color: '#fff',
//         textAlign: 'center',
//         fontSize: responsiveFontSize(2),
//     },
//     placeholderStyle: {
//         color: '#333',
//     },
//     itemTextStyle: {
//         color: '#333',
//     },
//     uploadedImage: {
//         width: '100%',
//         height: '100%',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//     },
//     removeButton: {
//         position: 'absolute',
//         top: 5,
//         right: 5,
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         borderRadius: 10,
//         width: 20,
//         height: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     imageWrapper: {
//         width: 100,
//         height: 80,
//         marginRight: 10,
//         position: 'relative',
//     },
//     selectedTextStyle: {
//         color: 'black', // Color for selected item
//     },
// });

// export default ClaimForm;

import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
const ClaimForm = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const user = useSelector((state) => state.user.user);
    const userId = user.id;
    const navigation = useNavigation();
    const [claimDetails, setClaimDetails] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDistributor, setSelectedDistributor] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [totalBoxes, setTotalBoxes] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [freightAmount, setFreightAmount] = useState('');
    const [invoiceFiles, setInvoiceFiles] = useState([]);
    const [transportFiles, setTransportFiles] = useState([]);
    const [distributorList, setDistributorList] = useState([]);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const handleFileUpload = async (file) => {
        if (!file) {
            Alert.alert('Error', 'Please select a file first');
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
            console.warn('formdata=', formData)
            const data = await response.json();
            if (data.status === 200) {
                console.log('File uploaded successfully:', data.file_id);
                return data.file_id;
            } else {
                console.error('File upload error:', data.message);
                Alert.alert('Error', data.message || 'File upload failed');
                return null;
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            Alert.alert('Failed to upload the file. Please check your network connection and try again.');
            return null;
        }
    };


    const handleFileSelection = async (type) => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
                allowMultiSelection: true,
            });

            console.log('Selected files:', res);

            const selectedFiles = res.map(file => ({
                uri: file.uri,
                name: file.name,
                type: file.type,
            }));

            if (type === 'invoice') {
                setInvoiceFiles(prevFiles => [...prevFiles, ...selectedFiles]);
            } else if (type === 'transport') {
                setTransportFiles(prevFiles => [...prevFiles, ...selectedFiles]);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled file picking');
            } else {
                console.error('Error picking file:', err);
            }
        }
    };

    ;

    const handleSubmitClaim = async () => {
        console.log('Submitting claim...');
        if (invoiceFiles.length === 0) {
            Alert.alert('Error', 'Invoice images are required');
            console.log('Invoice files are missing');
            return;
        }
        if (!selectedDate) {
            Alert.alert('Error', 'Date of purchase is required');
            console.log('Date of purchase is missing');
            return;
        }
        if (!selectedDistributor) {
            Alert.alert('Error', 'Distributor is required');
            console.log('Distributor is missing');
            return;
        }

        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

        if (selectedDate < fifteenDaysAgo) {
            Alert.alert('Error', 'Sorry, you cannot submit the claim form for purchases made more than 15 days ago.');
            console.log('Date of purchase is more than 15 days ago');
            return;
        }

        console.log('Uploading files...');
        const uploadedInvoiceFileIds = await Promise.all(invoiceFiles.map(handleFileUpload));
        const uploadedTransportFileIds = await Promise.all(transportFiles.map(handleFileUpload));

        if (uploadedInvoiceFileIds.includes(null) || uploadedTransportFileIds.includes(null)) {
            return;
        }

        const formData = new FormData();
        formData.append('purchase_date', selectedDate ? selectedDate.toISOString().split('T')[0] : '');
        formData.append('distributor_id', selectedDistributor);
        formData.append('invoice_no', invoiceNo);
        formData.append('total_boxes', totalBoxes);
        formData.append('total_amount', totalAmount);
        formData.append('freight_amount', freightAmount);
        formData.append('claim_details', claimDetails);
        formData.append('generated_by', userId);
        uploadedInvoiceFileIds.forEach((fileId, index) => {
            formData.append(`invoice_image`, fileId);
        });
        uploadedTransportFileIds.forEach((fileId, index) => {
            formData.append(`transport_receipt`, fileId);
        });

        console.log('Form data:', formData);

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found");
            }
            console.log('Token:', token);

            const response = await fetch(`${process.env.BASE_URL}user-claim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log('Claim submission response:', data);

            if (data.status === 200) {
                console.log('Claim submitted successfully:', data);
                navigation.navigate('ClaimHistory');
            } else {
                Alert.alert('Error', data.message || 'Claim submission failed');
            }
        } catch (error) {
            console.error('Error submitting claim:', error.message);
            Alert.alert('Failed to submit the claim. Please check your network connection and try again.');
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

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Freight Claim Form</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
                    <Icon name="calendar" size={20} color="#ee1d23" style={styles.icon} />
                    <Text style={styles.dateText}>
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date of Purchase'}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                />

                <View style={styles.inputContainer}>
                    <Icon name="building" size={20} color="#ee1d23" style={styles.icon} />
                    <Dropdown
                        style={styles.input}
                        data={distributorList}
                        labelField="label"
                        valueField="value"
                        placeholder="Distributor Name"
                        itemTextStyle={styles.itemTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        value={selectedDistributor}
                        onChange={item => {
                            setSelectedDistributor(item.value);
                        }}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="file-text" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Invoice No."
                        placeholderTextColor="grey"
                        value={invoiceNo}
                        onChangeText={setInvoiceNo}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="dollar" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Total number of boxes"
                        placeholderTextColor="grey"
                        keyboardType="numeric"
                        value={totalBoxes}
                        onChangeText={setTotalBoxes}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="money" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Total Amount"
                        placeholderTextColor="grey"
                        keyboardType="numeric"
                        value={totalAmount}
                        onChangeText={setTotalAmount}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="truck" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Freight Amount"
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
                        placeholder="Claim Details"
                        placeholderTextColor="grey"
                        multiline
                        numberOfLines={4}
                        value={claimDetails}
                        onChangeText={setClaimDetails}
                    />
                </View>

                <TouchableOpacity style={styles.fileButton} onPress={() => handleFileSelection('invoice')}>
                    <Text style={styles.fileButtonText}>Upload Invoice Images</Text>
                </TouchableOpacity>

                {invoiceFiles.map((file, index) => (
                    <View key={index} style={styles.filePreview}>
                        {file.type === 'application/pdf' ? (
                            <Text style={styles.fileText}>PDF: {file.name}</Text>
                        ) : (
                            <Image
                                source={{ uri: file.uri }}
                                style={styles.uploadedImage}
                            />
                        )}
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeFile('invoice', index)}>
                            <Icon name="times-circle" size={15} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity style={styles.fileButton} onPress={() => handleFileSelection('transport')}>
                    <Text style={styles.fileButtonText}>Upload Transport Receipt Images</Text>
                </TouchableOpacity>

                {transportFiles.map((file, index) => (
                    <View key={index} style={styles.filePreview}>
                        {file.type === 'application/pdf' ? (
                            <Text style={styles.fileText}>PDF: {file.name}</Text>
                        ) : (
                            <Image
                                source={{ uri: file.uri }}
                                style={styles.uploadedImage}
                            />
                        )}
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeFile('transport', index)}>
                            <Icon name="times-circle" size={15} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitClaim}>
                    <Text style={styles.submitButtonText}>Submit Claim</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    heading: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        // borderWidth: 1,
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
        fontSize: responsiveFontSize(2),
        color: '#333',

    },
    dateText: {
        fontSize: responsiveFontSize(2),
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
        fontSize: 16,
        textAlign: 'center',
    },
    filePreview: {
        marginTop: 10,
        width: responsiveWidth(20),
        height: responsiveHeight(10),
        marginRight: 10,
        position: 'relative',
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
    },
    itemTextStyle: {
        color: '#333',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
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
        color: 'black', // Color for selected item
    },
});

export default ClaimForm;
