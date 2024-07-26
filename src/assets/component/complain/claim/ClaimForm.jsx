import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ClaimForm = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const user = useSelector(state => state.user.user);
    // console.log('user id=', user);
    const navigation = useNavigation();

    const [claimDetails, setClaimDetails] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDistributor, setSelectedDistributor] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [freightAmount, setFreightAmount] = useState('');
    const [invoiceImage, setInvoiceImage] = useState([]);
    const [transportR, setTransportR] = useState([]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const handleInvoiceImage = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                allowMultiSelection: true,
            });

            const selectedImages = res.map(file => ({ uri: file.uri, name: file.name }));
            setInvoiceImage([...invoiceImage, ...selectedImages]);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled image picking');
            } else {
                console.log('Error picking image:', err);
            }
        }
    };

    const handleTransportR = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                allowMultiSelection: true,
            });

            const selectedImages = res.map(file => ({ uri: file.uri, name: file.name }));
            setTransportR([...transportR, ...selectedImages]);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled image picking');
            } else {
                console.log('Error picking image:', err);
            }
        }
    };

    const removeInvoiceImage = (index) => {
        const updatedImages = [...invoiceImage];
        updatedImages.splice(index, 1);
        setInvoiceImage(updatedImages);
    };

    const removeTransportR = (index) => {
        const updatedImages = [...transportR];
        updatedImages.splice(index, 1);
        setTransportR(updatedImages);
    };

    const handleSubmitClaim = async () => {
        const formData = new FormData();
        console.log("selectedDate = ", selectedDate);
        formData.append('purchasedate', selectedDate.toISOString());
        formData.append('distributorName', selectedDistributor);
        formData.append('invoiceNo', invoiceNo);
        formData.append('totalAmount', totalAmount);
        formData.append('freightAmount', freightAmount);
        formData.append('claimDetails', claimDetails);
    
        invoiceImage.forEach((image) => {
            formData.append('invoiceImage', {
                uri: image.uri,
                type: 'image/jpeg',
                name: image.name,
            });
        });
    
        transportR.forEach((image) => {
            formData.append('transportR', {
                uri: image.uri,
                type: 'image/jpeg',
                name: image.name,
            });
        });
    
        try {
            const response = await fetch(`http://192.168.0.192:3000/api/claim/${phoneNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
    console.log('response =', response);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
    
            const data = await response.json();
            console.log('Success:', data);
            navigation.navigate('CLaimHistory');
        } catch (error) {
            console.error('Error:', error);
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
                    <TextInput
                        style={styles.input}
                        placeholder="Distributor Name"
                        placeholderTextColor="grey"
                        value={selectedDistributor}
                        onChangeText={setSelectedDistributor}
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

                <TouchableOpacity style={styles.uploadButton} onPress={handleInvoiceImage}>
                    <Text style={styles.uploadButtonText}>Upload Invoice</Text>
                </TouchableOpacity>
                {invoiceImage.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageContainer}>
                        {invoiceImage.map((image, index) => (
                            <View key={`invoice-${index}`} style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: image.uri }}
                                    style={styles.uploadedImage}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity style={styles.removeButton} onPress={() => removeInvoiceImage(index)}>
                                    <Icon name="times-circle" size={15} color="red" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}

                <TouchableOpacity style={styles.uploadButton} onPress={handleTransportR}>
                    <Text style={styles.uploadButtonText}>Upload Transport Receipt Image</Text>
                </TouchableOpacity>
                {transportR.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageContainer}>
                        {transportR.map((image, index) => (
                            <View key={`receipt-${index}`} style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: image.uri }}
                                    style={styles.uploadedImage}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity style={styles.removeButton} onPress={() => removeTransportR(index)}>
                                    <Icon name="times-circle" size={15} color="red" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}

                <View style={[styles.inputContainer, styles.textAreaContainer]}>
                    <Icon name="info-circle" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Claim Details"
                        placeholderTextColor="grey"
                        multiline
                        numberOfLines={4}
                        value={claimDetails}
                        onChangeText={setClaimDetails}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitClaim}>
                <Text style={styles.submitButtonText}>Submit Claim</Text>
            </TouchableOpacity>
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
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    icon: {
        marginRight: 10,
        color: '#ee1d23',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    dateText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    textAreaContainer: {
        height: 120,
        marginTop: 20,
    },
    textArea: {
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    uploadButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ee1d23',
    },
    uploadButtonText: {
        color: '#ee1d23',
        fontSize: 16,
        textAlign: 'center',
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
    submitButton: {
        backgroundColor: '#ee1d23',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
    },
    submitButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    imageWrapper: {
        width: 100,
        height: 80,
        marginRight: 10,
        position: 'relative',
    },
});

export default ClaimForm;
