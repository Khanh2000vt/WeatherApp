/* eslint-disable prettier/prettier */
//eaf0d414034242ddac60692415819cdb
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';
import OptionsSettings from '../components/pages/OptionsSetting'
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
export default function SettingsStackScreen({navigation, route}) {
  const tabHiddenRoutes = ['OptionsSettings', 'HelpScreen', 'AboutScreen'];
  if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  } else {
    navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }
  return (
    // Tắt tên title
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerTitleAlign: 'center',

        }}>
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
        <Stack.Screen
          name="HelpScreen"
          component={HelpScreen}
          options={{
            title: 'Help',
          }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            title: 'About',
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="OptionsSettings"
          component={OptionsSettings}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
