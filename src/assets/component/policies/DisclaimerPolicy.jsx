import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../Header';
import Footer from '../Footer/Footer';

const DisclaimerPolicy = () => {
  const navigation = useNavigation();

  return (
<>
<Header />
      <ScrollView style={styles.content}
       contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Disclaimer Policy</Text>
        <Text style={styles.text}>
          BYTEGEAR And Their Respective Publishers, Authors, Agents And Employees Have Done Their Best To Ensure The Accuracy And Currency Of All The Information On This Website Contributed By Them; However, They Accept No Responsibility For Any Loss, Injury, Or Damages Sustained By Anyone As A Result Of Information Or Advice Contained On The Site Nor For The Results Of Any Travel Arrangement Originating From This Site. The Use Of Information On Or Derived From This Site And Any Arrangement For Travel With Person's Contacted Through The Site Is Made At The User's Own Risk. We Encourage You To Verify Any Critical Information With The Relevant Authorities Before You Travel. This Includes Information On Visa Requirements, Health And Safety, Customs, And Transportation. BYTEGEAR. And Their Respective Publishers, Authors, Agents And Employees Make No Representations About The Suitability Of The Information Contained In The Documents And Related Graphics Published On This Website For Any Purpose. All Such Documents And Related Graphics Are Provided "As Is" Without Warranty Of Any Kind, Statutory Or Otherwise. BYTEGEAR. And Their Respective Publishers, Authors, Agents And Employees Disclaim All Warranties And Conditions With Regard To This Internet Site And The Information Contained Therein, Including, Without Limitation, All Implied Warranties And Conditions Of Merchantability, Fitness For A Particular Purpose, Title, And Non-Infringement. In No Event Shall BYTEGEAR. And Their Respective Publishers, Authors, Agents And Employees, Be Liable For Any Special, Indirect, Or Consequential Damages Or Any Damages Whatsoever Whether In An Action Of Contract, Negligence, Or Other Tortuous Action, Arising Out Of Or In Connection With The Use Or Performance Of This Internet Site Or Of The Information And Documents Contained Therein, Provision Of Or Failure To Provide Services, Or Any Other Information Directly Or Indirectly Available From This Website. The Documents And Related Graphics Published On This Website Could Include Technical Inaccuracies Or Typographical Errors. Changes Are Periodically Added To The Information Herein. BYTEGEAR. May Make Improvements And/Or Changes In The Product(S) Described Herein At Any Time. The Linked Sites Are Not Under The Control Of BYTEGEAR. And Their Respective Employees Are Not Responsible For The Contents Of Any Linked Site Or Any Link Contained In A Linked Site. BYTEGEAR. Is Providing These External Links To You Only As A Convenience, And The Inclusion Of Any Link Does Not Imply Endorsement By BYTEGEAR. Of The Site. All Views Expressed By Individuals On This Site Are Their Personal Opinions And Are Not Necessarily Those Of Or Endorsed By BYTEGEAR.
        </Text>
      </ScrollView>
      <View style={{paddingTop:responsiveHeight(6.5), backgroundColor:'white'}}></View>
  <Footer />
</>
  );
};

const styles = StyleSheet.create({

  container: {
    // flex: 1,
  },
  contentContainer: {
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(1),

  },
  content: {
    backgroundColor:'white',
    height:'100%',


  },
  heading: {
    color: 'black',
    lineHeight: responsiveHeight(2.4),
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.2),
    fontWeight: '800'
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
    // marginBottom: responsiveHeight(2),
    color: 'black',
  },
});

export default DisclaimerPolicy;
