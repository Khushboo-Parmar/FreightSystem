
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from "react-redux";
const SignUpForm = () => {
    const phoneNumber = useSelector(state => state.phone.phoneNumber);
    // const { phoneNumber } = route.params;
    console.log("route.params phone number", phoneNumber)
    const [partnerName, setPartnerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [shopImages, setShopImages] = useState([]);
    const navigation = useNavigation();

    const handleSignUp = () => {
        console.log('Submitting form:', { partnerName, email, gstNo, address, city, district, shopImages });

        const formData = new FormData();

        formData.append('name', partnerName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('gstNo', gstNo);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('district', district);

        shopImages.forEach((image, index) => {
            formData.append('shopImages', {
                uri: image.uri,
                name: image.name,
                type: 'image/jpeg'
            });
        });

        fetch(`http://192.168.0.192:3000/api/signup/${phoneNumber}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to submit the form. Please check your network connection and try again.');
            });
    };

    const handleShopImageUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                allowMultiSelection: true
            });

            const selectedImages = res.map(file => ({ uri: file.uri, name: file.name }));
            setShopImages([...shopImages, ...selectedImages]);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled image picking');
            } else {
                console.log('Error picking image:', err);
            }
        }
    };

    const removeShopImage = (index) => {
        const updatedImages = [...shopImages];
        updatedImages.splice(index, 1);
        setShopImages(updatedImages);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.bgLogo} source={require('../../Images/logo.png')} />
            <Text style={styles.signupHeading}>Sign Up</Text>

            <ScrollView>
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Partner Name"
                        placeholderTextColor="grey"
                        value={partnerName}
                        onChangeText={setPartnerName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Mail ID"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="sticky-note" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="GST No."
                        value={gstNo}
                        onChangeText={setGstNo}
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="address-card-o" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="map-marker" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                        placeholderTextColor="grey"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="map-marker" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="District"
                        value={district}
                        onChangeText={setDistrict}
                        placeholderTextColor="grey"
                    />
                </View>

                {/* Image Upload */}
                <TouchableOpacity style={styles.uploadButton} onPress={handleShopImageUpload}>
                    <Text style={styles.uploadButtonText}>Upload Shop Images</Text>
                </TouchableOpacity>
                {shopImages.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageContainer}>
                        {shopImages.map((image, index) => (
                            <View key={`shop-image-${index}`} style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: image.uri }}
                                    style={styles.uploadedImage}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity style={styles.removeButton} onPress={() => removeShopImage(index)}>
                                    <Icon name="times-circle" size={15} color="red" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    signupHeading: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(3),
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        width: responsiveWidth(80),
        paddingHorizontal: responsiveWidth(3),
    },
    input: {
        flex: 1,
        height: responsiveHeight(6),
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: responsiveFontSize(2),
        color: 'black',
    },
    icon: {
        marginRight: 10,
    },
    uploadButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ee1d23',
    },
    uploadButtonText: {
        color: '#ee1d23',
        fontSize: 16,
        textAlign: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    imageWrapper: {
        width: 100,
        height: 80,
        marginRight: 10,
        position: 'relative',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupButton: {
        backgroundColor: '#ee1d23',
        width: '100%',
        borderRadius: 10,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(8),
        marginVertical: responsiveHeight(3),
    },
    signupButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    bgLogo: {
        width: "100%",
        height: responsiveHeight(25),
        resizeMode: 'cover',
        marginBottom: responsiveHeight(2),
    }
});

export default SignUpForm;


// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// // import { signUp } from './actions';
// import DocumentPicker from 'react-native-document-picker';
// import { useNavigation } from '@react-navigation/native';

// const SignUpForm = ({ route }) => {
//     const { phoneNumber } = route.params;
//     const dispatch = useDispatch();
//     const navigation = useNavigation();
//     // const { loading, error, success } = useSelector((state) => state.user);

//     const [partnerName, setPartnerName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [gstNo, setGstNo] = useState('');
//     const [address, setAddress] = useState('');
//     const [city, setCity] = useState('');
//     const [district, setDistrict] = useState('');
//     const [shopImages, setShopImages] = useState([]);

//     const handleSignUp = () => {
//         console.log('Submitting form:', { partnerName, email, gstNo, address, city, district, shopImages });

//         const formData = new FormData();
//         formData.append('name', partnerName);
//         formData.append('email', email);
//         formData.append('password', password);
//         formData.append('gstNo', gstNo);
//         formData.append('address', address);
//         formData.append('city', city);
//         formData.append('district', district);

//         shopImages.forEach((image, index) => {
//             formData.append('shopImages', {
//                 uri: image.uri,
//                 name: image.name,
//                 type: 'image/jpeg'
//             });
//         });

//         dispatch(signUp({ phoneNumber, formData }))
//             .unwrap()
//             .then(() => {
//                 navigation.navigate('Login', { phoneNumber });
//             })
//             .catch((err) => {
//                 console.error('Error:', err);
//                 alert('Failed to submit the form. Please check your network connection and try again.');
//             });
//     };

//     const handleShopImageUpload = async () => {
//         try {
//             const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.images],
//                 allowMultiSelection: true
//             });

//             const selectedImages = res.map(file => ({ uri: file.uri, name: file.name }));
//             setShopImages([...shopImages, ...selectedImages]);

//         } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//                 console.log('User cancelled image picking');
//             } else {
//                 console.log('Error picking image:', err);
//             }
//         }
//     };

//     const removeShopImage = (index) => {
//         const updatedImages = [...shopImages];
//         updatedImages.splice(index, 1);
//         setShopImages(updatedImages);
//     };

//     return (
//         <View style={styles.container}>
//             <Image style={styles.bgLogo} source={require('../../Images/logo.png')} />
//             <Text style={styles.signupHeading}>Sign Up</Text>

//             <ScrollView>
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Partner Name"
//                         placeholderTextColor="grey"
//                         value={partnerName}
//                         onChangeText={setPartnerName}
//                     />
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Mail ID"
//                         keyboardType="email-address"
//                         value={email}
//                         onChangeText={setEmail}
//                         placeholderTextColor="grey"
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Password"
//                         secureTextEntry={true}
//                         value={password}
//                         onChangeText={setPassword}
//                         placeholderTextColor="grey"
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="GST No."
//                         value={gstNo}
//                         onChangeText={setGstNo}
//                         placeholderTextColor="grey"
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Address"
//                         value={address}
//                         onChangeText={setAddress}
//                         placeholderTextColor="grey"
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="City"
//                         value={city}
//                         onChangeText={setCity}
//                         placeholderTextColor="grey"
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="District"
//                         value={district}
//                         onChangeText={setDistrict}
//                         placeholderTextColor="grey"
//                     />
//                 </View>

//                 {/* Image Upload */}
//                 <TouchableOpacity style={styles.uploadButton} onPress={handleShopImageUpload}>
//                     <Text style={styles.uploadButtonText}>Upload Shop Images</Text>
//                 </TouchableOpacity>
//                 {shopImages.length > 0 && (
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageContainer}>
//                         {shopImages.map((image, index) => (
//                             <View key={`shop-image-${index}`} style={styles.imageWrapper}>
//                                 <Image
//                                     source={{ uri: image.uri }}
//                                     style={styles.uploadedImage}
//                                     resizeMode="cover"
//                                 />
//                                 <TouchableOpacity style={styles.removeButton} onPress={() => removeShopImage(index)}>
//                                     <Icon name="times-circle" size={15} color="red" />
//                                 </TouchableOpacity>
//                             </View>
//                         ))}
//                     </ScrollView>
//                 )}

//                 {/* Sign Up Button */}
//                 <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
//                     <Text style={styles.signupButtonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
//                 </TouchableOpacity>
//                 {error && <Text style={styles.errorText}>{error}</Text>}
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: 'white',
//     },
//     signupHeading: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: 'black',
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//         width: '80%',
//         paddingHorizontal: 10,
//     },
//     input: {
//         flex: 1,
//         height: 40,
//         paddingHorizontal: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         fontSize: 16,
//         color: 'black',
//     },
//     uploadButton: {
//         backgroundColor: '#fff',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         marginTop: 10,
//         borderWidth: 1,
//         borderColor: '#ee1d23',
//     },
//     uploadButtonText: {
//         color: '#ee1d23',
//         fontSize: 16,
//         textAlign: 'center',
//     },
//     imageContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     imageWrapper: {
//         width: 100,
//         height: 80,
//         marginRight: 10,
//         position: 'relative',
//     },
//     uploadedImage: {
//         width: '100%',
//         height: '100%',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//     },
//     removeButton: {
//         position: 'absolute',
//         top: 5,
//         right: 5,
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         borderRadius: 10,
//         width: 20,
//         height: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     signupButton: {
//         backgroundColor: '#ee1d23',
//         width: '100%',
//         borderRadius: 10,
//         paddingVertical: 15,
//         paddingHorizontal: 10,
//         marginVertical: 20,
//     },
//     signupButtonText: {
//         color: 'white',
//         fontSize: 18,
//         textAlign: 'center',
//     },
//     errorText: {
//         color: 'red',
//         textAlign: 'center',
//         marginTop: 10,
//     },
//     bgLogo: {
//         width: "100%",
//         height: 200,
//         resizeMode: 'cover',
//         marginBottom: 20,
//     }
// });

// export default SignUpForm;
