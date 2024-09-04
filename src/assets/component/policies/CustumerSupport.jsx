import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, SafeAreaView, ScrollView, Modal } from 'react-native';
import Video from 'react-native-video';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../Footer/Footer';

const CustumerSupport = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleContact = () => {
    const url = 'mailto:info@bytegear.in';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const handleContactUs = () => {
    const url = 'tel:+91 9343646241';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const openFullscreenModal = () => {
    setModalVisible(true);
  };

  const closeFullscreenModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Header />
      <ScrollView style={{ height: '100%', backgroundColor: 'white' }}
      contentContainerStyle={styles.contentContainer}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: "https://erp.genics.co.in/assets/uploads/videos/66c6cb351e02d_1724304181.mp4" }}
            style={styles.video}
            onFullscreenPlayerWillPresent={() => setFullscreen(true)}
            onFullscreenPlayerDidDismiss={() => setFullscreen(false)}
          />
          <TouchableOpacity onPress={openFullscreenModal} style={styles.fullscreenButton}>
            <MaterialIcons name="fullscreen" size={15} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.infoText}>
            Welcome to our support page! Here is a video that explains how to use our app effectively.
            If you have any questions or need further assistance, please don't hesitate to reach out to us.
            For more help, contact us:
          </Text>
          <View style={styles.contactContainer1}>
            <TouchableOpacity onPress={handleContact} style={styles.contactButton}>
              <Ionicons name="mail" size={15} color="white" />
              <Text style={styles.contactText}>Email Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleContactUs} style={styles.contactButton}>
              <Ionicons name="call" size={15} color="white" />
              <Text style={styles.contactText}>Call Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
      <Modal visible={modalVisible} transparent={true} onRequestClose={closeFullscreenModal}>
        <View style={styles.modalContainer}>
          <Video
            source={{ uri: "https://erp.genics.co.in/assets/uploads/videos/66c6cb351e02d_1724304181.mp4" }}
            style={styles.fullscreenVideo}
            fullscreen={true}
          />
          <TouchableOpacity onPress={closeFullscreenModal} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height: responsiveHeight(40),
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginBottom: responsiveHeight(1.2),
    marginTop: responsiveHeight(2),
    padding: responsiveWidth(2),
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
    borderRadius: 10,
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#00000080',
    padding: 10,
    borderRadius: 10,
  },
  fullscreenButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
  },
  contactContainer: {
    padding: responsiveWidth(5),
    justifyContent: 'center',
  },
  infoText: {
    marginBottom: responsiveHeight(2.1),
    color: 'grey',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400',
    textAlign: 'center',
  },
  contactButton: {
    backgroundColor: '#ee1d23',
    borderRadius: 10,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(12),
    marginBottom: responsiveHeight(3),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  contactText: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
  },
  contactContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenVideo: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    color:'red',
    backgroundColor:"black",
    // borderRadius:10,
  },
  contentContainer:{
    justifyContent:'center',
    alignItems:'center'
  }
});

export default CustumerSupport;

