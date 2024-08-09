import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const FileSelectionModal = ({ isVisible, onClose, onSelect }) => {
    const handleSelectImage = async (source) => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };
        const result = await (source === 'camera' ? launchCamera(options) : launchImageLibrary(options));
        
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
            onSelect(selectedFile);
            onClose();
        }
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Select Image</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleSelectImage('camera')}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleSelectImage('library')}>
                    <Text style={styles.buttonText}>Choose from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modal: {
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
title: {
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(2),
    color:'black',
    fontWeight:"700"

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
    fontWeight:"600"
},
});

export default FileSelectionModal;
