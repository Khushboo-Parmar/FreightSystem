import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Help = () => {
  const navigation = useNavigation();

  const handleContactEmail = () => {
    const url = 'mailto:info@bytegear.in';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const handleContactPhone = () => {
    const url = 'tel:+91 9343646241';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="chevron-left" size={responsiveFontSize(2)} color="black" />
      </TouchableOpacity>
      {/* <Image style={styles.bgLogo} source={require('../assets/Images/BTIcon.png')} /> */}

      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/Images/contact.png')}
          source={require('../assets/Images/c2.png')}
          // source={require('../assets/Images/c.jpg')}
          style={styles.deliverBoyImage}
        />
      </View>
      <Text style={styles.headerText}>We are here to serve you</Text>
      <Text style={styles.infoText}>
        Are you confused or have any questions? We are here to help you.
      </Text>

        <View style={styles.contactContainer}>
        <View style={[styles.contactButton, {marginTop:responsiveHeight(2)}]}>

            <Ionicons name="mail" size={20} color="red" />
            <Text style={styles.contactText}>Email Us: </Text>
            <TouchableOpacity onPress={handleContactEmail} >
              <Text style={styles.contactText}>info@bytegear.in</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.contactButton}>
            <Ionicons name="call" size={20} color="red" />
            <Text style={styles.contactText}>Call Us: </Text>
            <TouchableOpacity onPress={handleContactPhone}>
              <Text style={styles.contactText}>+91 9343646241</Text>
            </TouchableOpacity>
          </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgLogo: {
    height: responsiveWidth(30),
    width: responsiveWidth(30),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
  },
  headerText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: responsiveHeight(2),
    color: 'black'
  },
  infoText: {
    marginVertical: responsiveHeight(2),
    color: 'grey',
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    paddingHorizontal: responsiveWidth(10),
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveHeight(5),
  },
  contactContainer: {
    width: '100%',
    alignItems: 'center',
  },
  contactButton: {
    borderRadius: 10,
    marginBottom: responsiveHeight(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    marginLeft: 5,
  },
  imageContainer: {
    // backgroundColor: 'black',
    paddingVertical: responsiveHeight(4),
    borderRadius: 300,
    // marginBottom: responsiveHeight(2),
  },
  deliverBoyImage: {
    width: responsiveWidth(80),
    height: responsiveHeight(30),
  },
  backButton: {
    marginLeft: responsiveWidth(1),
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
    position: 'absolute',
    top: 12,
    left: 2
  },
});


export default Help;
