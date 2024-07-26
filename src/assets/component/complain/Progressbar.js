
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const statusValues = ['pending', 'request_sent', 'in_progress', 'completed'];

const Progressbar = ({ status, onUpdateStatus }) => {
  const progress1 = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  const progress3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (statusValues.indexOf(status) >= 1) start1();
    if (statusValues.indexOf(status) >= 2) start2();
    if (statusValues.indexOf(status) >= 3) start3();
  }, [status]);

  const start1 = () => {
    Animated.timing(progress1, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const start2 = () => {
    Animated.timing(progress2, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const start3 = () => {
    Animated.timing(progress3, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <View style={{ width: '100%', alignItems: 'center', padding: 20, flexDirection: 'row' }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: statusValues.indexOf(status) >= 0 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>1</Text>
        </View>
        <Animated.View
          style={{
            width: progress1.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 50]
            }),
            height: 6,
            backgroundColor: 'green',
          }}
        />
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: statusValues.indexOf(status) >= 1 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>2</Text>
        </View>
        <Animated.View
          style={{
            width: progress2.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 50]
            }),
            height: 6,
            backgroundColor: 'green',
          }}
        />
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: statusValues.indexOf(status) >= 2 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>3</Text>
        </View>
        <Animated.View
          style={{
            width: progress3.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 50]
            }),
            height: 6,
            backgroundColor: 'green',
          }}
        />
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: statusValues.indexOf(status) >= 3 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>4</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          height: 40,
          width: 150,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'center',
        }}
        onPress={() => {
          const nextStatusIndex = statusValues.indexOf(status) + 1;
          if (nextStatusIndex < statusValues.length) {
            onUpdateStatus(statusValues[nextStatusIndex]);
          }
        }}>
        <Text style={{ color: 'white', letterSpacing: 0.5 }}>Change Status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Progressbar;
