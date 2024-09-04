import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions,ToastAndroid } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const MyPieChart = () => {
    const [data, setData] = useState([
        {
            name: 'Pending',
            claims: 0,
            color: '#F44336',
            legendFontColor: 'black',
            legendFontSize: responsiveFontSize(1.8),
        },
        {
            name: 'Complete',
            claims: 0,
            color: '#2196F3',
            legendFontColor: 'black',
            legendFontSize: responsiveFontSize(1.8),
        },
        {
            name: 'Cancled',
            claims: 0,
            color: '#D3D3D3',
            legendFontColor: 'black',
            legendFontSize: responsiveFontSize(1.8),
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found");
                }
                const response = await fetch(`${process.env.BASE_URL}count-status`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    const newData = [
                        {
                            name: 'Pending',
                            claims: result.status_counts.status_0_count,
                            color: '#F44336',
                            legendFontColor: 'black',
                            legendFontSize: responsiveFontSize(1.8),
                        },
                        {
                            name: 'Complete',
                            claims: result.status_counts.status_1_count,
                            color: '#2196F3',
                            legendFontColor: 'black',
                            legendFontSize: responsiveFontSize(1.8),
                        },
                        {
                            name: 'Cancled',
                            claims: 1,
                            color: '#D3D3D3',
                            legendFontColor: 'black',
                            legendFontSize: responsiveFontSize(1.8),
                        },
                    ];
                    setData(newData);
                } else {
                    ToastAndroid.show('Failed to fetch status counts', ToastAndroid.SHORT);
                }
            } catch (error) {
                console.error('Error fetching status counts:', error);
                ToastAndroid.show('An error occurred while fetching the status counts', ToastAndroid.SHORT);
      
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <PieChart
                data={data}
                width={responsiveWidth(100) - 32}
                height={responsiveHeight(30)}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                accessor="claims"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                style={styles.pieChart}
                hasLegend={false}
            />
            <View style={[styles.customLegend,{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:responsiveWidth(6)}]}>
                {data.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
                        <Text style={styles.legendText}>{item.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    pieChart: {
        borderRadius: 16,
        marginLeft: responsiveWidth(18)
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(0.5),
        justifyContent: 'flex-start',
    },
    legendColorBox: {
        width: responsiveWidth(2.5),
        height: responsiveWidth(2.5),
        borderRadius: responsiveWidth(2),
    },
    legendText: {
        fontSize: responsiveFontSize(1.8),
        color: 'black',
        marginLeft: responsiveWidth(2),
        fontWeight:'bold'
    },
    customLegend: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});

export default MyPieChart;