import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, LogBox } from 'react-native';
import Recaptcha from 'react-native-recaptcha-that-works';
import { responsiveHeight } from 'react-native-responsive-dimensions';

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.']);

const CaptchaV2Lib1 = ({ setRobot }) => {
  const recaptcha = useRef(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    if (!isChecked) {
      if (recaptcha.current) {
        recaptcha.current.open();
      } else {
        console.error('recaptcha reference is null');
      }
    }
    setIsChecked(!isChecked);
  };

  const onVerify = token => {
    // console.log('Verified successfully!', token);
    setRobot(true);
  };

  const onExpire = () => {
    console.log('Captcha expired');
  };

  const onError = err => {
    console.error('Captcha error:', err);
    Alert.alert('Captcha Error', 'An error occurred while verifying the captcha.');
  };

  const onMessage = event => {
    if (event && event.nativeEvent && event.nativeEvent.data) {
      const message = event.nativeEvent.data;
      if (['cancel', 'error', 'expired'].includes(message)) {
        console.log('reCAPTCHA error:', message);
        Alert.alert('Captcha Error', `reCAPTCHA ${message}`);
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
      <Recaptcha
        ref={recaptcha}
        siteKey="6LeRPSEqAAAAAP6-F9NniLfXZXdNptfISC6TiRM6"
        baseUrl="https://genics.in/"
        onVerify={onVerify}
        onExpire={onExpire}
        onError={onError}
        onMessage={onMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(3),
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

export default CaptchaV2Lib1;
