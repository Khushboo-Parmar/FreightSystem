// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, StyleSheet, RefreshControl } from 'react-native';
// import { useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Dropdown } from 'react-native-element-dropdown';
// import Toast from 'react-native-toast-message';
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import SelectBox from 'react-native-multi-selectbox'
// import { xorBy } from 'lodash'

// const AddProduct = () => {

//     const phoneNumber = useSelector((state) => state.phone.phoneNumber);
//     const user = useSelector((state) => state.user.user);
//     const userId = user.id;
//     const navigation = useNavigation();
//     const [totalBoxes, setTotalBoxes] = useState('');
//     const [totalAmount, setTotalAmount] = useState('');
//     const [selectedProduct, setSelectedProduct] = useState('');
//     const [productList, setProductList] = useState([]);
//     const [productPrice, setProductPrice] = useState(0);
//     const [refreshing, setRefreshing] = useState(false);

    
//   const [selectedTeams, setSelectedTeams] = useState([])
//     const formData = new FormData();

//     const fetchProductList = useCallback(async () => {
//         try {
//             const response = await fetch(`${process.env.BASE_URL}productItem-list`);
//             const data = await response.json();
//             const products = data.map(item => ({
//                 label: item.product_name,
//                 value: item.id,
//                 price: item.price
//             }));

//             setProductList(products);
//             console.warn('productlist',productList)
//         } catch (error) {
//             console.error('Error fetching product list:', error.message);
//         }
//         finally {
//             setRefreshing(false);
//         }
//     }, []);


//     useEffect(() => {
//         fetchProductList();
//     }, [fetchProductList]);

//     useEffect(() => {
//         const fetchProductPrice = async () => {
//             try {
//                 const product = productList.find(p => p.value === selectedProduct);
//                 if (product) {
//                     setProductPrice(product.price);
//                 } else {
//                     setProductPrice(0);
//                 }
//             } catch (error) {
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Error',
//                     text2: 'Failed to fetch product price.',
//                 });
//             }
//         };

//         fetchProductPrice();
//     }, [selectedProduct, productList]);





//     const handleNext = () => {
//         if (parseFloat(totalAmount) > 10000) {
//             navigation.navigate('ClaimForm', {
//                 totalBoxes,
//                 totalAmount,
//                 selectedProduct
//             });
//         } else {
//             console.log('Amount too low, showing toast');
//             Toast.show({
//                 type: 'error',
//                 text1: 'Invalid Amount',
//                 text2: 'Your invoice amount must be greater than 10,000 to proceed with the claim.',
//             });
//         }
//     };

//     const onRefresh = useCallback(() => {
//         setRefreshing(true);
//         fetchProductList();
//     }, [fetchProductList]);
//     function onMultiChange() {
//         return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
//       }


//       const K_OPTIONS = [
//         {
//           item: 'Juventus',
//           id: 'JUVE',
//         },
//         {
//           item: 'Real Madrid',
//           id: 'RM',
//         },
//         {
//           item: 'Barcelona',
//           id: 'BR',
//         },]

//     return (
//         <View style={styles.container}>
//             <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', gap: responsiveWidth(22) }}>

//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Product Details</Text>

//             </View>


//             <ScrollView contentContainerStyle={styles.scrollContainer}
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                     />
//                 }
//             >
//                 <View style={styles.noteContainer}>
//                     <Text style={styles.noteText}>To claim, the invoice amount must be greater than 10,000.</Text>
//                 </View>

//                 <View>
//                 <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text>
//                 <SelectBox
//                     label="Select multiple"
//                     options={K_OPTIONS}
//                     selectedValues={selectedTeams}
//                     onMultiSelect={onMultiChange()}
//                     onTapClose={onMultiChange()}
//                     isMulti
//                 />
//         </View> 
           
// {/* 


//                 <View style={styles.inputContainer}>
//                     <Icon name="cubes" size={20} color="#ee1d23" style={styles.icon} />
//                     <Dropdown
//                         style={styles.input}
//                         data={productList}
//                         labelField="label"
//                         valueField="value"
//                         placeholder="Select a product"
//                         itemTextStyle={styles.itemTextStyle}
//                         placeholderStyle={styles.placeholderStyle}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         value={selectedProduct}
//                         onChange={item => {
//                             setSelectedProduct(item.value);
//                         }}
//                     />
//                 </View> */}

//                 <View style={styles.inputContainer}>
//                     <Icon name="dollar" size={20} color="#ee1d23" style={styles.icon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Total number of boxes"
//                         placeholderTextColor="grey"
//                         keyboardType="numeric"
//                         value={totalBoxes}
//                         onChangeText={setTotalBoxes}
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Icon name="money" size={20} color="#ee1d23" style={styles.icon} />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Invoice Amount"
//                         placeholderTextColor="grey"
//                         keyboardType="numeric"
//                         value={totalAmount}
//                         onChangeText={setTotalAmount}

//                     // editable={false}
//                     />
//                 </View>

//                 <TouchableOpacity
//                     style={[styles.submitButton, { opacity: parseFloat(totalAmount) > 10000 ? 1 : 0.5 }]}
//                     onPress={handleNext}
//                     disabled={parseFloat(totalAmount) <= 10000}
//                 >
//                     <Text style={styles.submitButtonText}>Next</Text>
//                 </TouchableOpacity>
//             </ScrollView >
//         </View >
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingHorizontal: 20,
//         paddingTop: 20,
//     },
//     heading: {
//         fontSize: responsiveFontSize(2.5),
//         fontWeight: 'bold',
//         marginTop: 20,
//         textAlign: 'center',
//         color: '#333',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         paddingVertical: 20,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 15,
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//     },
//     icon: {
//         marginRight: 10,
//         color: '#ee1d23',
//     },
//     input: {
//         flex: 1,
//         height: responsiveHeight(6),
//         fontSize: responsiveFontSize(2),
//         color: '#333',
//     },
//     dateText: {
//         fontSize: responsiveFontSize(2),
//         color: '#333',
//         marginLeft: 10,
//     },
//     submitButton: {
//         backgroundColor: '#ee1d23',
//         paddingVertical: 15,
//         paddingHorizontal: 30,
//         borderRadius: 10,
//         marginBottom: responsiveHeight(4),
//         marginTop: responsiveHeight(4)
//     },
//     submitButtonText: {
//         color: '#fff',
//         textAlign: 'center',
//         fontSize: responsiveFontSize(2),
//     },
//     placeholderStyle: {
//         color: '#333',
//     },
//     itemTextStyle: {
//         color: '#333',
//     },

//     selectedTextStyle: {
//         color: 'black',
//     },
//     productButton: {
//         backgroundColor: '#fff',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         marginTop: 10,
//         borderWidth: 1,
//         borderColor: '#ee1d23',
//     },
//     backButton: {
//         width: responsiveWidth(10),
//         backgroundColor: '#3c3c3c',
//         height: responsiveHeight(5),
//         borderRadius: 25,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     title: {
//         fontSize: responsiveFontSize(2),
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color: 'black',
//     },
//     noteContainer: {
//         backgroundColor: '#ffefef',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 20,
//     },
//     noteText: {
//         color: '#ff0000',
//         fontSize: responsiveFontSize(1.8),
//         textAlign: 'center',
//     },
// });
// export default AddProduct;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, StyleSheet, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
const AddProduct = () => {
    const phoneNumber = useSelector((state) => state.phone.phoneNumber);
    const user = useSelector((state) => state.user.user);
    const userId = user.id;
    const navigation = useNavigation();
    const [totalBoxes, setTotalBoxes] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProductList = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.BASE_URL}productItem-list`);
            const data = await response.json();
            const products = data.map(item => ({
                label: item.product_name,
                value: item.id,
                price: parseFloat(item.price) 
            }));
            setProductList(products);
        } catch (error) {
            console.error('Error fetching product list:', error.message);
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchProductList();
    }, [fetchProductList]);

    useEffect(() => {
        const amount = selectedProducts.reduce((total, product) => {
            const productDetails = productList.find(p => p.value === product.value);
            return total + (productDetails ? productDetails.price : 0);
        }, 0);
        setTotalAmount(amount * parseFloat(totalBoxes || 0));
    }, [selectedProducts, totalBoxes, productList]);

    const handleNext = () => {
        if (totalAmount > 10000) {
            navigation.navigate('ClaimForm', {
                totalBoxes,
                totalAmount,
                selectedProducts
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Invalid Amount',
                text2: 'Your invoice amount must be greater than 10,000 to proceed with the claim.',
            });
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProductList();
    }, [fetchProductList]);

      const K_OPTIONS = [
        {
          item: 'Juventus',
          id: 'JUVE',
        },
        {
          item: 'Real Madrid',
          id: 'RM',
        },
        {
          item: 'Barcelona',
          id: 'BR',
        },]

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', gap: responsiveWidth(22) }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={responsiveFontSize(2)} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>PRODUCT DETAILS</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.noteContainer}>
                    <Text style={styles.noteText}>To claim, the invoice amount must be greater than 10,000.</Text>
                </View>

                <View style={styles.inputContainer}>
                <Icon name="cubes" size={20} color="#ee1d23" style={styles.icon} />
                    <SelectBox
                        label="Select product"
                        options={K_OPTIONS}
                        selectedValues={selectedProducts}
                        onMultiSelect={(item) => setSelectedProducts(xorBy(selectedProducts, [item], 'value'))}
                        onTapClose={(item) => setSelectedProducts(xorBy(selectedProducts, [item], 'value'))}
                        isMulti
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="cubes" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Total number of boxes"
                        placeholderTextColor="grey"
                        keyboardType="numeric"
                        value={totalBoxes}
                        onChangeText={setTotalBoxes}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="money" size={20} color="#ee1d23" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Total Amount"
                        placeholderTextColor="grey"
                        value={totalAmount.toFixed(2)}
                        editable={false}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.submitButton, { opacity: totalAmount > 10000 ? 1 : 0.5 }]}
                    onPress={handleNext}
                    disabled={totalAmount <= 10000}
                >
                    <Text style={styles.submitButtonText}>Next</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    icon: {
        marginRight: 10,
        color: '#ee1d23',
    },
    input: {
        flex: 1,
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#ee1d23',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: responsiveHeight(4),
        marginTop: responsiveHeight(4)
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
    },
    noteContainer: {
        backgroundColor: '#ffefef',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    noteText: {
        color: '#ff0000',
        fontSize: responsiveFontSize(1.8),
        textAlign: 'center',
    },
    backButton: {
        width: responsiveWidth(10),
        backgroundColor: '#3c3c3c',
        height: responsiveHeight(5),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        textAlign: 'center',
        color: 'black',
    },
});

export default AddProduct;
