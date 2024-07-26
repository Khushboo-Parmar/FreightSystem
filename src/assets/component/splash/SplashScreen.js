import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { s } from '../../commonCSS/Style';

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Dashboard');
      // navigation.replace('PhoneNoScreen');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Images/ssss.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Welcome to Our App</Text>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#666',
  },
});
