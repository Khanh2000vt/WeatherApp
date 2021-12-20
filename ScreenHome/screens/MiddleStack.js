import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';
import AirScreen from './AirScreen';
const Tab = createMaterialTopTabNavigator();
const MiddleStack = () => {
    // navigation.setOptions({tabBarStyle: {display: 'none'}});
  return (
      <Tab.Navigator
        screenOptions={{
          headerShow: false,
          tabBarStyle: {
            display: 'none',
          }
        }}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="AirScreen" component={AirScreen} />
      </Tab.Navigator>
  );
};


export default MiddleStack;