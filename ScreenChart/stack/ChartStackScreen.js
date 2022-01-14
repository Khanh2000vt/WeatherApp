import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChartScreen from '../screens/ChartScreen';
import MiddleStack from '../screens/MiddleStack'
const ChartStack = createNativeStackNavigator();
export default function ChartStackScreen() {
  return (
    <ChartStack.Navigator>
      <ChartStack.Screen
        name="MiddleStack"
        component={MiddleStack}
        options={{headerShown: false}}
      />
    </ChartStack.Navigator>
  );
}