import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
export default function SplashScreen({ navigation }) {
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (user) {
        navigation.replace('LoginDashboard');
      } else {
        navigation.replace('Dashboard');
      }
    };
    checkLoginStatus();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Images/BTIcon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* <Text style={styles.heading}>Welcome to Our App</Text>
      <Text style={styles.text}>Loading...</Text> */}
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
    width: 120,
    height: 120,
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