import React, { useState } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera } from 'react-native-image-picker';
let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;
const CameraTaking = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{ marginTop: 20, marginBottom: 50 }}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
    </View>
  );
};

export default CameraTaking;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, StyleSheet, RefreshControl } from 'react-native';
// import { useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import DocumentPicker from 'react-native-document-picker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Dropdown } from 'react-native-element-dropdown';
// import Toast from 'react-native-toast-message';
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Import image picker functions

// const ClaimForm = () => {
//     // ... existing state and variables

//     const handleFileUpload = async (file) => {
//         // ... existing file upload code
//     };

//     const handleFileSelection = async (type) => {
//         try {
//             const options = {
//                 mediaType: 'photo', // or 'mixed' if you want to allow videos as well
//                 includeBase64: false,
//             };
//             const result = await new Promise((resolve, reject) => {
//                 Alert.alert(
//                     'Select Image',
//                     'Choose an option',
//                     [
//                         { text: 'Camera', onPress: () => launchCamera(options, (response) => resolve(response)) },
//                         { text: 'Gallery', onPress: () => launchImageLibrary(options, (response) => resolve(response)) },
//                         { text: 'Cancel', onPress: () => reject('User cancelled'), style: 'cancel' }
//                     ],
//                     { cancelable: false }
//                 );
//             });

//             if (result.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (result.errorCode) {
//                 console.error('ImagePicker Error: ', result.errorMessage);
//             } else {
//                 const selectedFile = {
//                     uri: result.assets[0].uri,
//                     name: result.assets[0].fileName,
//                     type: result.assets[0].type,
//                 };

//                 if (type === 'invoice') {
//                     setInvoiceFiles(prevFiles => [...prevFiles, selectedFile]);
//                 } else if (type === 'transport') {
//                     setTransportFiles(prevFiles => [...prevFiles, selectedFile]);
//                 }
//             }
//         } catch (err) {
//             console.error('Error picking file:', err);
//         }
//     };

//     // ... existing code for submitting claim and fetching lists

//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>Freight Claim Form</Text>
//             <ScrollView contentContainerStyle={styles.scrollContainer}
//                 refreshControl={
//                     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                 }
//             >
//                 {/* ... existing form elements */}

//                 <TouchableOpacity style={styles.fileButton} onPress={() => handleFileSelection('invoice')}>
//                     <Text style={styles.fileButtonText}>Upload Invoice Images / Capture New</Text>
//                 </TouchableOpacity>

//                 {/* Render selected invoice files */}
//                 {invoiceFiles.map((file, index) => (
//                     <ScrollView horizontal style={styles.filePreviewContainer} key={index}>
//                         <View style={styles.filePreview}>
//                             {file.type === 'application/pdf' ? (
//                                 <View style={styles.pdfContainer}>
//                                     <Icon name="file-pdf-o" size={50} color="red" />
//                                     <Text style={styles.fileText}>PDF: {file.name}</Text>
//                                     <TouchableOpacity style={styles.removeButtonpdf} onPress={() => removeFile('invoice', index)}>
//                                         <Icon name="times-circle" size={15} color="red" />
//                                     </TouchableOpacity>
//                                 </View>
//                             ) : (
//                                 <>
//                                     <Image source={{ uri: file.uri }} style={styles.uploadedImage} />
//                                     <TouchableOpacity style={styles.removeButton} onPress={() => removeFile('invoice', index)}>
//                                         <Icon name="times-circle" size={15} color="red" />
//                                     </TouchableOpacity>
//                                 </>
//                             )}
//                         </View>
//                     </ScrollView>
//                 ))}

//                 <TouchableOpacity style={styles.fileButton} onPress={() => handleFileSelection('transport')}>
//                     <Text style={styles.fileButtonText}>Upload Transport Receipt Images / Capture New</Text>
//                 </TouchableOpacity>

//                 {/* Render selected transport files */}
//                 {transportFiles.map((file, index) => (
//                     <ScrollView horizontal style={styles.filePreviewContainer} key={index}>
//                         <View style={styles.filePreview}>
//                             {file.type === 'application/pdf' ? (
//                                 <View style={styles.pdfContainer}>
//                                     <Icon name="file-pdf-o" size={50} color="red" />
//                                     <Text style={styles.fileText}>PDF: {file.name}</Text>
//                                     <TouchableOpacity style={styles.removeButtonpdf} onPress={() => removeFile('transport', index)}>
//                                         <Icon name="times-circle" size={15} color="red" />
//                                     </TouchableOpacity>
//                                 </View>
//                             ) : (
//                                 <>
//                                     <Image source={{ uri: file.uri }} style={styles.uploadedImage} />
//                                     <TouchableOpacity style={styles.removeButton} onPress={() => removeFile('transport', index)}>
//                                         <Icon name="times-circle" size={15} color="red" />
//                                     </TouchableOpacity>
//                                 </>
//                             )}
//                         </View>
//                     </ScrollView>
//                 ))}

//                 <TouchableOpacity style={styles.submitButton} onPress={handleSubmitClaim}>
//                     <Text style={styles.submitButtonText}>Submit Claim</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// };

// // ... existing styles

// export default ClaimForm;
