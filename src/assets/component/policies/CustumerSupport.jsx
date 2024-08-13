
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, SafeAreaView } from 'react-native';
// import Video from 'react-native-video';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import Header from '../Header';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// const CustumerSupport = () => {
//   const navigation = useNavigation();

//   const handleContact = () => {
//     const url = Platform.OS === 'ios' ? 'mailto:support@bytegear.com' : 'mailto:support@bytegear.com';
//     Linking.openURL(url).catch(err => console.error('An error occurred', err));
//   };

//   const handleContactUs = () => {
//     const url = Platform.OS === 'ios' ? 'tel:+1234567890' : 'tel:+1234567890';
//     Linking.openURL(url).catch(err => console.error('An error occurred', err));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       <View style={styles.videoContainer}>
//         <Video
//         source={{ uri: "https://media.geeksforgeeks.org/wp-content/uploads/20210314115545/sample-video.mp4" }} 
//           // source={{ uri: "https://erp.genics.co.in/assets/uploads/videos/66b609d60c01f_1723206102.mp4" }}
//           style={styles.video}
//           controls
//         />
//       </View>
//       <View style={styles.contactContainer}>
//         <Text style={styles.infoText}>Welcome to our support page! Here is a video that explains how to use our app effectively.
//           If you have any questions or need further assistance, please don't hesitate to reach out to us.For more help, contact us:</Text>
//         <View style={styles.contactContainer1}>
//           <TouchableOpacity onPress={handleContact} style={styles.contactButton}>
//             <Ionicons name="mail" size={20} color="white" />
//             <Text style={styles.contactText}>Email Us</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleContactUs} style={styles.contactButton}>
//             <Ionicons name="call" size={18} color="white" />
//             <Text style={styles.contactText}>Call Us</Text>
//           </TouchableOpacity>
//         </View>

//       </View>

//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',

//   },
//   videoContainer: {
//     height: responsiveHeight(40),
//     width: responsiveWidth(100),
//     alignSelf: 'center',
//     marginBottom: responsiveHeight(2),
//     marginTop: responsiveHeight(2),
//     padding: responsiveWidth(2),
//     borderRadius: 10,
//     overflow: 'hidden',
//     shadowColor: 'red',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   video: {
//     flex: 1,
//     borderRadius: 10,
//   },
//   contactContainer: {
//     // alignItems: 'center',
//     padding: responsiveWidth(5),
//     justifyContent: 'center'
//   },
//   infoText: {
//     marginBottom: responsiveHeight(2),
//     color: 'black',
//     fontSize: responsiveFontSize(1.8),
//     fontWeight: '500',
//   },
//   contactButton: {
//     backgroundColor: '#ee1d23',
//     borderRadius: 10,
//     paddingVertical: responsiveHeight(2),
//     paddingHorizontal: responsiveWidth(4),
//     marginBottom: responsiveHeight(3),
//     alignSelf: 'center',
//     flexDirection: 'row',
//     gap: 3
//   },
//   contactText: {
//     color: 'white',
//     fontSize: responsiveFontSize(1.8),
//     textAlign: 'center',
//   },
//   contactContainer1: {
//     flexDirection: 'row',
//     justifyContent:'space-evenly',
//     alignItems: 'center',

//   },
//   backButton: {
//     position: 'absolute',
//     bottom: responsiveHeight(5),
//     left: responsiveWidth(4),
//     width: responsiveWidth(10),
//     backgroundColor: '#3c3c3c',
//     height: responsiveHeight(5),
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//   },
// });

// export default CustumerSupport;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, SafeAreaView } from 'react-native';
import Video from 'react-native-video';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CustumerSupport = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const navigation = useNavigation();

  const handleFullscreen = (status) => {
    setFullscreen(status);
  };

  const handleContact = () => {
    const url = Platform.OS === 'ios' ? 'mailto:support@bytegear.com' : 'mailto:support@bytegear.com';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const handleContactUs = () => {
    const url = Platform.OS === 'ios' ? 'tel:+1234567890' : 'tel:+1234567890';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={[styles.container, fullscreen && styles.fullscreen]}>
      <Header />
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: "https://media.geeksforgeeks.org/wp-content/uploads/20210314115545/sample-video.mp4" }}
          style={styles.video}
          controls
          onFullscreenPlayerWillPresent={() => handleFullscreen(true)}
          onFullscreenPlayerDidDismiss={() => handleFullscreen(false)}
        />
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.infoText}>
          Welcome to our support page! Here is a video that explains how to use our app effectively.
          If you have any questions or need further assistance, please don't hesitate to reach out to us.
          For more help, contact us:
        </Text>
        <View style={styles.contactContainer1}>
          <TouchableOpacity onPress={handleContact} style={styles.contactButton}>
            <Ionicons name="mail" size={20} color="white" />
            <Text style={styles.contactText}>Email Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleContactUs} style={styles.contactButton}>
            <Ionicons name="call" size={18} color="white" />
            <Text style={styles.contactText}>Call Us</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullscreen: {
    padding: 0,
  },
  videoContainer: {
    height: responsiveHeight(40),
    width: responsiveWidth(100),
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(2),
    padding: responsiveWidth(2),
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  video: {
    flex: 1,
    borderRadius: 10,
  },
  contactContainer: {
    padding: responsiveWidth(5),
    justifyContent: 'center',
  },
  infoText: {
    marginBottom: responsiveHeight(2),
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: '#ee1d23',
    borderRadius: 10,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    left: responsiveWidth(4),
    width: responsiveWidth(10),
    backgroundColor: '#3c3c3c',
    height: responsiveHeight(5),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default CustumerSupport;
