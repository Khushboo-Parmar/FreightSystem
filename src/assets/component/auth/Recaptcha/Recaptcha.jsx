import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const CaptchaV2Lib1 = ({setRobot}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const captchaFormRef = useRef(null);
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setShowCaptcha(true);
      setTimeout(() => {
        if (captchaFormRef.current) {
          captchaFormRef.current.show();
        }
      }, 100);
    } else {
        setRobot(true)
      setShowCaptcha(false);
    }
  };

  const onMessage = event => {
    console.log('event--->>>>', event.nativeEvent.data);

    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        console.log('reCAPTCHA error:', event.nativeEvent.data);
        setShowCaptcha(false);
        return;
      } else {
        setShowCaptcha(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxClick}>
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.label}>I am not a robot</Text>
      </TouchableOpacity>
      {showCaptcha && (
        <ConfirmGoogleCaptcha
          ref={captchaFormRef}
          baseUrl={'https://genics.in/'} 
          languageCode="en"
          onMessage={onMessage}
        //   siteKey={'6LeRPSEqAAAAAP6-F9NniLfXZXdNptfISC6TiRM6'}
          siteKey={'6LfqSyEqAAAAALcIJiqPs7z7ZlhxQLg9giCcURfF'}
          theme="light"
        />
      )}
    </View>
  );
};

export default CaptchaV2Lib1;

const styles = StyleSheet.create({
  container: {
    marginTop:responsiveHeight(3),
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
  },
  checkmark: {
    color: 'white',
    fontSize: 11,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});