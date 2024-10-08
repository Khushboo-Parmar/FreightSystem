import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, RefreshControl, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import Footer from '../../Footer/Footer';
import Header from '../../Header';

const AddProduct = (props) => {
    const user = useSelector((state) => state.user.token);
    const navigation = useNavigation();
    const [totalBoxes, setTotalBoxes] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [totalAmount, setTotalAmount] = useState(props?.route.params?.totalAmount ? props?.route.params?.totalAmount : 0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productList, setProductList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [invoiceAmount, setinvoiceAmount] = useState(0);
    const [multitotalAmount, setMultiTotalAmount] = useState(props?.route.params?.totalAmount ? props?.route.params?.totalAmount : 0);
    const fetchProductList = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.BASE_URL}productItem-list`);
            const data = await response.json();
            const products = data?.map(item => ({
                item: item.product_name ? item.product_name.toLowerCase() : '',
                id: item.id || '',
                price: parseFloat(item.price) || 0
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
    const handleNext = async () => {

        if (!selectedProduct || !totalBoxes || !productPrice) {
            ToastAndroid.show(`${!selectedProduct ? 'Please Select a Product' : !totalBoxes ? 'Please Select The Total Boxes' : !productPrice ? 'Please Give The Price' : 'Please Fill All Fields'}`, ToastAndroid.SHORT);
            return null;
        }
        const multipleValue = Number(totalBoxes) * Number(productPrice);;
        const newTotalAmount = Number(totalAmount) + Number(multipleValue);
        // const newTotalAmount = Number(totalAmount) * Number(productPrice);
        setTotalAmount(newTotalAmount);
        setMultiTotalAmount(newTotalAmount);

        const response = await fetch('https://erp.genics.co.in/api/save-product', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_code: props?.route?.params?.code,
                product_id: selectedProduct,
                quantity: totalBoxes,
                price: productPrice
            })
        });
        fetchItems();
        const result = await response?.json();
        if (result?.status === 200) {
            setSelectedProduct(null);
            setTotalBoxes('');
            setProductPrice('');
        }
        ToastAndroid.show(`${result?.status === 401 ? 'Please Fill All Fields' : result?.message}`, ToastAndroid.SHORT);
    };
    const fetchItems = async () => {
        const response = await fetch(`${process.env.BASE_URL}get-products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_code: props?.route?.params?.code,
            })
        });
        const result = await response?.json();
        props?.route?.params?.setItems(result?.data?.length)
        setData(result?.data);
    };
    const handleDelete = async (id, price) => {
        const response = await fetch(`${process.env.BASE_URL}delete-product`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        });
        const result = await response?.json();

        // const updatedTotalAmount = Number(totalAmount) - Number(price);
        // const updatedMultiTotalAmount = Number(multitotalAmount) - Number(price);

        const deletedProduct = data.find(item => item.id === id);
        if (deletedProduct) {
            const totalDeductedAmount = deletedProduct.quantity * price;

            // Update the total amount
            const updatedTotalAmount = Number(totalAmount) - Number(totalDeductedAmount);
            const updatedMultiTotalAmount = Number(multitotalAmount) - Number(totalDeductedAmount);


            setTotalAmount(updatedTotalAmount);
            setMultiTotalAmount(updatedMultiTotalAmount);
        }
        fetchItems();
        ToastAndroid.show(`${result?.message}`, ToastAndroid.SHORT);
    };
    useEffect(() => {
        if (!props?.route?.params?.code) setTotalAmount(0);
        fetchItems();
    }, []);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProductList();
    }, [fetchProductList]);
    return (
        <>
            <Header />

            <View style={styles.container}>
                <View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'flex-start',gap:responsiveWidth(22)}}>
                
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={responsiveFontSize(2.5)} color="#ee1d23" />
                </TouchableOpacity>
                <Text style={{color:'black', fontSize:responsiveFontSize(1.8)}}>Add Product Details</Text>
                </View>


                <ScrollView contentContainerStyle={styles.scrollContainer}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                    <View style={styles.inputContainer}>
                        {productList.length > 0 ? (
                            <View style={{ marginBottom: responsiveHeight(1), width: '100%' }}>
                                <Dropdown
                                    data={productList}
                                    inputSearchStyle={{ color: 'black' }}
                                    labelField="item"
                                    valueField="id"
                                    placeholder="Select a Product"
                                    search
                                    itemContainerStyle={{ borderRadius: 200 }}
                                    searchPlaceholder="Search by Product Name.."
                                    value={selectedProduct}
                                    onChange={(id) => setSelectedProduct(id?.id)}
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 14,
                                        paddingHorizontal: responsiveWidth(6),
                                        color: 'black',
                                        height: responsiveHeight(7),
                                        marginVertical: responsiveHeight(3)
                                    }}
                                    itemTextStyle={{ color: 'black' }}
                                    placeholderStyle={{ color: 'grey' }}
                                    selectedTextStyle={{ color: 'black' }}
                                    containerStyle={{ paddingHorizontal: responsiveWidth(1) }}
                                />
                            </View>
                        ) : (
                            <Text>No products available</Text>
                        )}
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
                            placeholder="Product Price"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            value={productPrice}
                            onChangeText={setProductPrice}
                        />
                    </View>
                    <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Icon name="dollar" size={20} color="#ee1d23" style={styles.icon} />
                        <Text></Text>
                        <TextInput
                            style={[styles.input, { fontSize: responsiveFontSize(2.4), fontWeight: 'bold', paddingTop: responsiveHeight(2) }]}
                            placeholder="Total Amount"
                            placeholderTextColor="grey"
                            editable={false}
                            value={`${totalAmount}`}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.submitButton]}
                        onPress={handleNext}
                    >
                        <Text style={styles.submitButtonText}>Add Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.submitButton]}
                        onPress={() => {
                            if (totalAmount >= 10000) {
                                navigation.navigate('ClaimForm', {
                                    totalBoxes,
                                    totalAmount,
                                    selectedProduct,
                                });
                            } else {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Invalid Amount',
                                    text2: 'Invoice amount must exceed 10,000 to proceed with the claim.',
                                });
                            }
                        }}
                    >
                        <Text style={styles.submitButtonText}>Save</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: responsiveHeight(3) }}>
                        {data?.map((i) => (
                            <View key={i.id} style={{
                                paddingVertical: responsiveWidth(5),
                                paddingHorizontal: responsiveWidth(5),
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                borderRadius: 10,
                                marginBottom: responsiveHeight(1),
                                shadowRadius: 3,
                                elevation: 5,
                                backgroundColor: 'white',
                                marginHorizontal: responsiveHeight(1),
                                gap: responsiveHeight(1.9)
                            }} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'black' }}>{i?.product_name}</Text>
                                    <Text style={{ color: 'black' }}>{i?.quantity}x</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'red' }}>Rs:{i?.price}</Text>
                                    <TouchableOpacity onPress={() => { handleDelete(i?.id, i?.price) }}>
                                        <Icon name="trash" size={20} color="#ee1d23" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingHorizontal: 20,
        paddingTop: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        // justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
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
        width: responsiveWidth(6)
    },
    input: {
        flex: 1,
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        color: '#333',
        textTransform: 'uppercase'
    },
    submitButton: {
        backgroundColor: '#ee1d23',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        // marginBottom: responsiveHeight(4),
        marginTop: responsiveHeight(2)
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

    title: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        textAlign: 'center',
        color: 'black',
    },
    backButton: {
        // position: 'absolute',
        // top: responsiveHeight(1),
        // left: responsiveWidth(3),
        width: responsiveWidth(8),
        height: responsiveHeight(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default AddProduct;