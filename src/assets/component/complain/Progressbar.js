
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { s } from '../../commonCSS/Style';

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
      toValue: 50,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const start2 = () => {
    Animated.timing(progress2, {
      toValue: 50,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const start3 = () => {
    Animated.timing(progress3, {
      toValue: 50,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <View style={{ width: '100%', alignItems: 'center', padding: 30, flexDirection: 'row' }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: statusValues.indexOf(status) > 0 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>1</Text>
        </View>
        <View style={{ width: 50, height: 6, backgroundColor: '#f2f2f2' }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: statusValues.indexOf(status) > 1 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>2</Text>
        </View>
        <View style={{ width: 50, height: 6, backgroundColor: '#f2f2f2' }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: statusValues.indexOf(status) > 2 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>3</Text>
        </View>
        {/* <View style={{ width: 50, height: 6, backgroundColor: '#f2f2f2' }}></View> */}
        {/* <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: statusValues.indexOf(status) > 3 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>4</Text>
        </View> */}
      </View>
      <View style={{ width: '100%', padding: 20, position: 'absolute', top: 0, left: 40, flexDirection: 'row' }}>
        <Animated.View
          style={{
            width: progress1,
            height: 6,
            marginTop: 20,
            backgroundColor: 'green',
          }}
        ></Animated.View>
        <Animated.View
          style={{
            width: progress2,
            height: 6,
            marginTop: 20,
            marginLeft: 30,
            backgroundColor: 'green',
          }}
        ></Animated.View>
        {/* <Animated.View
          style={{
            width: progress3,
            height: 6,
            marginTop: 20,
            marginLeft: 30,
            backgroundColor: 'green',
          }}
        ></Animated.View> */}
      </View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          height: 40,
          width: 150,
          backgroundColor: 'black',
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
