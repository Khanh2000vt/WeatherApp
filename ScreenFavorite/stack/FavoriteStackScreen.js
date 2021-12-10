/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
const Stack = createNativeStackNavigator();
export default function FavoriteStackScreen() {
  return (
    // Tắt tên title
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
