import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import {
  HomeStackScreen,
  FavoriteStackScreen,
  MapStackScreen,
  ChartStackScreen,
  SettingsStackScreen,
} from './components/store/index';
const Tab = createBottomTabNavigator();
function putCurrentLocation(lat, lon){
  let putObject = {
    lat,
    lon
  }
  fetch('https://weather-api-2021-100eggs.herokuapp.com/current', {
    method: 'PUT',
    headers: {
        'Content-Type':'application/json' 
    },
    body: JSON.stringify(putObject)
})
}
export default function App() {
  Geolocation.getCurrentPosition( 
    (data) => {
      putCurrentLocation(data.coords.latitude, data.coords.longitude);
  }, 
  (error) => {
    console.warn('request location error', error)
  },
  {enableHighAccuracy: true, timeout:20000})
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Chart') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={18} color={color} />;
          },

          // tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // none title text
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Favorite" component={FavoriteStackScreen} />
        {/* <Tab.Screen name="Map" component={MapStackScreen} /> */}
        <Tab.Screen name="Chart" component={ChartStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
