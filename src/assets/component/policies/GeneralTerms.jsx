import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../Header';
import Footer from '../Footer/Footer';

const GeneralTerms = () => {
  const navigation = useNavigation();

  return (
   <>
      <Header />


      <ScrollView style={styles.content}>
        <Text style={styles.heading}>General Terms</Text>
        <Text style={styles.text}>
          All Information Displayed, Transmitted Or Carried On BYTEGEAR. Is Protected By Copyright And Other Intellectual Property Laws. This Site Is Updated And Maintained Independently By BYTEGEAR. The Content Is Owned By BYTEGEAR. You May Not Modify, Publish, Transmit, Transfer, Sell, Reproduce, Create Derivative Work From, Distribute, Repost, Perform, Display Or In Any Way Commercially Exploit Any Of The Content. BYTEGEAR. Disclaims All Warranties Or Conditions, Whether Expressed Or Implied, (Including Without Limitation Implied, Warranties Or Conditions Of Information And Context). We Consider Ourselves And Intend To Be Subject To The Jurisdiction Only Of The Courts Of INDORE, India. BYTEGEAR. Reserves The Right, In Its Sole Discretion, To Suspend Or Cancel The Service At Any Time If A Computer Virus, Bug, Or Other Technical Problem Corrupts The Security, Or Proper Administration Of The Service. BYTEGEAR. Values The Privacy Of Information Pertaining To Its Associates. We Do Not Use Or Disclose Information About Your Individual Visits To Our Website Or Any Information That You May Give Us, Such As Your Name, Address, Email Address Or Telephone Number, To Any Outside Sources. BYTEGEAR. Reserves The Right To Refuse Service To Anyone At Any Time. BYTEGEAR. Will Not Use Information About You Without Your Permission And Will Provide The Means For You To Manage And Control The Information That You Have Provided. We Will Enable You To Communicate Your Privacy Concerns To Us And That We Will Respond To Them Appropriately. BYTEGEAR. Does Not Disclose Any Personal Information To Advertisers And For Other Marketing And Promotional Purposes That Could Be Used To Personally Identify You, Such As Your Password, Credit Card Number And Bank Account Number. BYTEGEAR. Will Not Accept Any Cash Payments Above 50,000/-.
        </Text>
      </ScrollView>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
      </TouchableOpacity> */}
            <View style={{paddingTop:responsiveHeight(6.5), backgroundColor:'white'}}></View>
    <Footer />
   </>
  );
};

const styles = StyleSheet.create({

  container: {
    // flex: 1,
  },
  content: {
    padding: responsiveWidth(5),
    backgroundColor:'white',
    height:'100%'
  },
  heading: {
    color: 'black',
    lineHeight: responsiveHeight(2.4),
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.2),
    fontWeight: '800',
  },
  text: {
    lineHeight: responsiveHeight(2.4),
     marginTop: responsiveHeight(2), 
     fontSize: responsiveFontSize(1.4), 
     fontWeight: '400', 
     color: 'grey' ,
     textAlign:"justify"
  },
  backButton: {
    marginLeft: responsiveWidth(4),
    width: responsiveWidth(10),
    backgroundColor: '#3c3c3c',
    height: responsiveHeight(5),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:responsiveHeight(3),
    marginTop:responsiveHeight(3)
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default GeneralTerms;
