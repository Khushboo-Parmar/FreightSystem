import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../Header';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

<Header />
      <ScrollView style={styles.content}>
        <View>
          <Text style={{ lineHeight: responsiveHeight(2.4), marginTop: responsiveHeight(2), fontSize: responsiveFontSize(2.2), fontWeight: '800', color: 'black'}}>PRIVACY POLICY</Text>
        </View>
        <Text style={{ lineHeight: responsiveHeight(2.4), marginTop: responsiveHeight(2), fontSize: responsiveFontSize(1.4), fontWeight: '400', color: 'grey' }}>
          PRIVACY POLICY
          We Are Committed To Protecting Your Privacy. We Will Only Use The Information That We Collect About You Lawfully.
          We Collect Information About You For 2 Reasons: Firstly, To Process Your Order And Second, To Provide You With The Best Possible Service.
          We Will Give You The Chance To Refuse Any Marketing Email From Us.
          The Type Of Information We Will Collect About You Includes:
          Your Name , Address
          Phone Number & Email Address.
          The Information We Hold Will Be Accurate And Up To Date. You Can Check The Information That We Hold About You By Emailing Us. If You Find Any Inaccuracies We Will Delete Or Correct It Promptly.
          The Personal Information Which We Hold Will Be Held Securely In Accordance With Our Internal Security Policy And The Law.
          We May Use Technology To Track The Patterns Of Behaviour Of Visitors To Our Site. This Can Include Using A "Cookie" Which Would Be Stored On Your Browser. You Can Usually Modify Your Browser To Prevent This Happening. The Information Collected In This Way Can Be Used To Identify You Unless You Modify Your Browser Settings.
          If You Have Any Questions/Comments About Privacy, You Should Contact Us.
        </Text>

      </ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  content: {
    padding:responsiveWidth(5) 
  },

  heading: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    color: 'red'
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    lineHeight: 22,
    color: 'black',
    textAlign: 'justify'
  },
  backButton: {
    marginLeft: responsiveWidth(4),
    width: responsiveWidth(10),
    backgroundColor: '#3c3c3c',
    height: responsiveHeight(5),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:responsiveHeight(3)
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default PrivacyPolicy;
