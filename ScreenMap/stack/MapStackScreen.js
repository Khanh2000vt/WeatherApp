/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';
const Stack = createNativeStackNavigator();
export default function MapStackScreen() {
  return (
    // Tắt tên title
    <Stack.Navigator>
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
