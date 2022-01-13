/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';


export default function SettingsScreen() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  Geolocation.getCurrentPosition( 
    (data) => {
    setLat(data.coords.latitude);
  }, 
  (error) => {
    console.warn('request location error', error)
  },
  {enableHighAccuracy: true, timeout:20000}
  )
  return (
    <View>
      <Text>{lat}</Text>
    </View>
  );
}
