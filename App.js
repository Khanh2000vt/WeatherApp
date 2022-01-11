import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  HomeStackScreen,
  FavoriteStackScreen,
  MapStackScreen,
  ChartStackScreen,
  SettingsStackScreen,
} from './components/store/index';
import {ThemeContext} from './components/store/ThemeContext';
const Tab = createBottomTabNavigator();

export default function App() {
  // const DARK = '#242526';
  const LIGHT = '#fff';
  const context = useContext(ThemeContext); // context
  const isLight = context.isLight;
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Settings" //Cai them de tien
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

          tabBarActiveTintColor: isLight ? 'tomato' : LIGHT,
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // none title text
          tabBarHideOnKeyboard: true,
          tabBarActiveBackgroundColor: isLight ? '#f8f8ff' : '#3c3c3c',
          tabBarInactiveBackgroundColor: isLight ? LIGHT : 'black',
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Favorite" component={FavoriteStackScreen} />
        <Tab.Screen name="Map" component={MapStackScreen} />
        <Tab.Screen name="Chart" component={ChartStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
