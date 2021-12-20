/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AirScreen from '../screens/AirScreen';
import MiddleStack from '../screens/MiddleStack'
const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="MiddleStack"
        component={MiddleStack}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
 
// // Tắt tên title
    // <HomeStack.Navigator 
    // screenOptions={{
    //   headerShow:false,
    //   tabBarStyle:{
    //     display:'none'
    //   }
    // }}>
      // <HomeStack.Screen
      //   name="HomeScreen"
      //   component={HomeScreen}
      //   options={{headerShown: false}}
      // />
    //   <HomeStack.Screen 
    //   name="AirScreen" 
    //   component={AirScreen} 
    //   options={{headerShown: false}} />
    // </HomeStack.Navigator>