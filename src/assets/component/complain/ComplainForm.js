import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { s } from '../../commonCSS/Style';
import Icon from 'react-native-vector-icons/FontAwesome';

const ComplainForm = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    
    const [formData, setFormData] = useState({
        name: user?.name || '',  
        lastName: user?.lastName || '',
        mobileNumber: user?.mobileNumber || '',
        email: user?.email || '',
        productname: '',
        productdetail: '',
        complain: '',
        productWeight: '',
        deliverCharges: '',
        invoice_no: '',
        city: user?.city || '',
        documents: '',
        total_charge: '',
        createdBy: user?.id,
    });

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleSubmit = async () => {
        if (!user) {
            Toast.show({
                type: 'error',
                text1: 'User not logged in',
            });
            return;
        }

        const form = new FormData();
        form.append("name", formData.name);
        form.append("lastName", formData.lastName);
        form.append("mobileNumber", formData.mobileNumber);
        form.append("email", formData.email);
        form.append("productname", formData.productname);
        form.append("productdetail", formData.productdetail);
        form.append("complain", formData.complain);
        form.append("productWeight", formData.productWeight);
        form.append("deliverCharges", formData.deliverCharges);
        form.append("invoice_no", formData.invoice_no);
        form.append("city", formData.city);
        form.append("total_charge", formData.total_charge);
        form.append("createdBy", formData.createdBy);

        selectedFiles.forEach((file, index) => {
            form.append(`documents`, {
                uri: file.uri,
                name: file.name,
                type: file.type,
            });
        });

        try {
            const response = await fetch("http://192.168.0.192:3000/api/complainFormData", {
       
                method: "POST",
                body: form,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: `${data.message} 🚀`,
                });
                navigation.navigate('ComplainHistory');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong 📦',
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Toast.show({
                type: 'error',
                text1: 'An error occurred while submitting the form',
            });
        }
    };

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    const handleInvoice = async () => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true
            });
            setSelectedFiles(doc);
            setFormData({
                ...formData,
                documents: doc.map(file => file.name).join(", ") 
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                console.log("user canceled the upload", err);
            else
                console.log(err)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Fill the Complain Form</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Name"
                    placeholderTextColor="#aaa"
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Last Name"
                    placeholderTextColor="#aaa"
                    value={formData.lastName}
                    onChangeText={(text) => handleInputChange('lastName', text)}
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <Text style={styles.label}>Mobile Number:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Mobile Number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    value={formData.mobileNumber}
                    onChangeText={(text) => handleInputChange('mobileNumber', text)}
                />
                <Text style={styles.label}>City:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your City"
                    placeholderTextColor="#aaa"
                    value={formData.city}
                    onChangeText={(text) => handleInputChange('city', text)}
                />
                <Text style={styles.label}>Product Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Product Name"
                    placeholderTextColor="#aaa"
                    value={formData.productname}
                    onChangeText={(text) => handleInputChange('productname', text)}
                />
                <Text style={styles.label}>Product Detail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Product Detail"
                    placeholderTextColor="#aaa"
                    value={formData.productdetail}
                    onChangeText={(text) => handleInputChange('productdetail', text)}
                />
                <Text style={styles.label}>Product Weight:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Product Weight"
                    placeholderTextColor="#aaa"
                    value={formData.productWeight}
                    onChangeText={(text) => handleInputChange('productWeight', text)}
                />
                <Text style={styles.label}>Delivery Charges:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Delivery Charges"
                    placeholderTextColor="#aaa"
                    value={formData.deliverCharges}
                    onChangeText={(text) => handleInputChange('deliverCharges', text)}
                />
                <Text style={styles.label}>Total Charges:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Total Charges"
                    placeholderTextColor="#aaa"
                    value={formData.total_charge}
                    onChangeText={(text) => handleInputChange('total_charge', text)}
                />
                <Text style={styles.label}>Your Complain/Request:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Complain/Request"
                    placeholderTextColor="#aaa"
                    value={formData.complain}
                    onChangeText={(text) => handleInputChange('complain', text)}
                />
                <Text style={styles.label}>Invoice No:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Invoice No"
                    placeholderTextColor="#aaa"
                    value={formData.invoice_no}
                    onChangeText={(text) => handleInputChange('invoice_no', text)}
                />
                <TouchableOpacity style={styles.invoiceAdd} onPress={handleInvoice}>
                    <Text style={styles.invoiceText}>Add Invoice</Text>
                </TouchableOpacity>
                {selectedFiles.length > 0 && (
                    <View style={styles.filesContainer}>
                        <Text style={styles.labelSelected}>Your selected files:</Text>
                        {selectedFiles.map((file, index) => (
                            <Text key={index} style={styles.fileName}>
                                {file.name}
                            </Text>
                        ))}
                    </View>
                )}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Icon name="paper-plane" size={20} color="white" />
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(2),
        color: '#333',
        alignSelf: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: responsiveHeight(6),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: responsiveHeight(2),
        paddingLeft: responsiveWidth(2),
        borderRadius: 5,
        backgroundColor: '#fff',
        color:'black'
    },
    label: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
        color: '#333',
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(2),
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
    },
    submitButtonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        marginLeft: 5,
    },
    invoiceAdd: {
        marginBottom: responsiveHeight(2),
    },
    invoiceText: {
        color: '#007BFF',
        fontSize: responsiveFontSize(2),
        textDecorationLine: 'underline',
    },
    filesContainer: {
        marginTop: responsiveHeight(2),
    },
    fileName: {
        fontSize: responsiveFontSize(2),
        color: 'gray',
        marginTop: responsiveHeight(1),
        borderWidth: 0.5,
        borderColor: 'red',
        padding: 6,
        width: responsiveWidth(70),
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    labelSelected: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
        color: '#333',
    },
});

export default ComplainForm;
