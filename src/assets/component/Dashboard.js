import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.logo} source={require('../Images/BTIcon.png')} />

        <View style={styles.imageContainer}>
          <Image
            source={require('../Images/Deliver_boy.png')}
            style={styles.deliverBoyImage}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Welcome to the{' '}
            <Text style={styles.highlightedText}>Bytegear Retailer</Text> Business App
          </Text>
          <Text style={styles.descriptionText}>
          Empowering Retailers with Seamless Solutions{'\n'} for Efficient Business Management.
          </Text>
        </View>
      </View>

      <View style={styles.loginContainer}>
        <TouchableOpacity
          onPress={() => navigation.replace('Loginphone')}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('PhoneNoScreen')}>
            Register here
          </Text>
        </Text>
        <Text style={styles.registerText}>
          {/* Help?{'  '} */}
          <Text
            style={{color: '#ee1d23',}}
            onPress={() => navigation.navigate('Help')}>
              Customer Support
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingVertical:responsiveHeight(4)
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(5),
  },
  logo: {
    width: responsiveWidth(30),
    height: responsiveWidth(20),
    resizeMode: 'contain',
    marginBottom: responsiveHeight(5),
  },
  imageContainer: {
    backgroundColor: 'black',
    paddingVertical: responsiveHeight(4),
    borderRadius: 300,
    marginBottom: responsiveHeight(2.8),
  },
  deliverBoyImage: {
    width: responsiveWidth(50),
    height: responsiveHeight(30),
  },
  textContainer: {
    alignItems: 'center',
    gap: responsiveHeight(2),
  },
  welcomeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: responsiveFontSize(3),
  },
  highlightedText: {
    color: '#ee1d23',
    fontSize: responsiveFontSize(2.9),
  },
  descriptionText: {
    textAlign: 'center',
    color: 'black',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '300',
  },
  loginContainer: {
    width: '100%',
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(5),
    gap:responsiveHeight(2)
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#ee1d23',
    paddingVertical: responsiveHeight(2),
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  loginButtonText: {
    fontSize: responsiveFontSize(2.2),
    color: '#ee1d23',
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    color: 'black',
  },
  registerLink: {
    color: '#ee1d23',
    fontWeight: 'bold',
  },
});
