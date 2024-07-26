// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { s } from '../../commonCSS/Style';

// const Dashboard = () => {
//     const navigation = useNavigation();
//     const [searchQuery, setSearchQuery] = useState('');

//     const handleSearch = () => {

//         navigation.navigate('SearchStatus')
    
//     }

//     return (
//         <View style={styles.container}>
//             <Image style={styles.bgImage} source={require('../Images/bg.png')} />
//             <View style={styles.content}>
//                 <Text style={styles.heading}>Welcome to our Freight System</Text>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Login') }}>
//                         <Text style={styles.buttonText}>Login</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => { navigation.navigate('PhoneNoScreen') }}>
//                         <Text style={styles.buttonText}>Register</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             <View style={styles.searchContainer}>
//                     <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//                         <Text style={styles.searchText}>Search here complain status</Text>
//                     </TouchableOpacity>
//                 </View>
//         </View>
//     )
// }

// export default Dashboard;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     bgImage: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//     },
//     content: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     heading: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'black',
//         marginBottom: responsiveHeight(5),
//         textAlign: 'center',
//     },
//     searchContainer: {
    
//         marginTop: responsiveHeight(3),
//     },
//     input: {
//         backgroundColor: 'white',
//         borderWidth: 1,
//         borderColor: '#aaa',
//         borderRadius: 30,
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         flex: 1,
//         marginRight: 10,
//     },
//     searchButton: {
//         paddingVertical: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: '#000',
//         paddingVertical: responsiveHeight(2),
//         paddingHorizontal: responsiveWidth(10),
//         borderRadius: 30,
//         marginHorizontal: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     searchText: {
//         color: 'black',
//         fontSize: 16,
//         fontWeight: 'bold',
//         borderBottomColor:'blue'
//     },
//     registerButton: {
//         backgroundColor: 'black',
//     },
// });


import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const phoneNumber = useSelector(state => state.phone.phoneNumber);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    navigation.navigate('SearchStatus');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.logo} source={require('../Images/logoWithoutbg.png')} />
        <Text style={styles.heading}>Welcome to our Freight System</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Login'); }}>
            <Icon name="log-in-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate('PhoneNoScreen'); }}>
            <Icon name="person-add-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.searchText}>Search here complain status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(5),
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
  },
  heading: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: responsiveHeight(5),
    textAlign: 'center',
  },
  searchContainer: {
    marginTop: responsiveHeight(3),
  },
  searchButton: {
    backgroundColor: '#ee1d23',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,
    shadowRadius: 2, 
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  registerButton: {
    backgroundColor: '#ee1d23',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: responsiveWidth(2),
  },
  icon: {
    marginRight: responsiveWidth(1),
  },
});



// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

// const Dashboard = () => {
//     const navigation = useNavigation();

//     const handleSearch = () => {
//         navigation.navigate('SearchStatus');
//     };

//     return (
//         <LinearGradient
//             colors={['#434343', 'black']}
//             style={styles.container}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//         >
//             <View style={styles.content}>
//                 <Image style={styles.logo} source={require('../Images/logoWithoutbg.png')} />
//                 <Text style={styles.heading}>Welcome to our Freight System</Text>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Login') }}>
//                         <Text style={styles.buttonText}>Login</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => { navigation.navigate('PhoneNoScreen') }}>
//                         <Text style={styles.buttonText}>Register</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//                     <Text style={styles.searchText}>Search here complain status</Text>
//                 </TouchableOpacity>
//             </View>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     content: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     logo: {
//         width: responsiveWidth(50),
//         height: responsiveHeight(20),
//         resizeMode: 'contain',
//         marginBottom: responsiveHeight(5),
//     },
//     heading: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'white',
//         marginBottom: responsiveHeight(3),
//         textAlign: 'center',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: responsiveHeight(3),
//     },
//     button: {
//         backgroundColor: '#ee1d23',
//         paddingHorizontal: responsiveWidth(10),
//         paddingVertical: responsiveHeight(2),
//         borderRadius: 30,
//         marginHorizontal: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     searchButton: {
//         backgroundColor: 'white',
//         paddingHorizontal: responsiveWidth(10),
//         paddingVertical: responsiveHeight(2),
//         borderRadius: 30,
//         marginTop: responsiveHeight(3),
//     },
//     searchText: {
//         color: 'black',
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });

// export default Dashboard;
