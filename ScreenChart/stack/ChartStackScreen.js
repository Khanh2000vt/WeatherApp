/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChartScreen from '../screens/ChartScreen';
const Stack = createNativeStackNavigator();
export default function ChartStackScreen() {
  return (
    // Tắt tên title
    <Stack.Navigator>
      <Stack.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
