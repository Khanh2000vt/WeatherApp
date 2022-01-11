/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Switch,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListComponent from '../components/items/ListComponent';
import {
  optionsNotification,
  optionsTemperature,
  optionsLocation,
} from '../components/store/DataListComponent';
import {ThemeContext} from '../../components/store/ThemeContext';
// import {useTheme} from '../../components/hook/useTheme';

export default function SettingsScreen({navigation}) {
  const DARK = '#242526';
  const LIGHT = '#fff';
  const context = useContext(ThemeContext); // context
  const isLight = context.isLight;
  // const isLight = context.getDataTheme;
  const [isEnabled, setIsEnabled] = useState(!isLight); // switch

  // list option
  const [notification, setNotification] = useState(optionsNotification);
  const [temperature, setTemperature] = useState(optionsTemperature);
  const [location, setLocation] = useState(optionsLocation);

  //option
  const [optionItem, setOptionItem] = useState({
    notification: 'Once a day',
    temperature: 'Celsius',
    location: 'Default Location',

  })
  useEffect(() => {
    context.getDataTheme();
    setIsEnabled(!isLight);
  }, []);

  useEffect(() => {
    context.setData();
    // setIsEnabled(!isLight);
  },[isEnabled]);


  async function setData() {
    const jsonValue = JSON.stringify(isEnabled);
      console.log('setData2: ', jsonValue);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
  }

  async function getDataTheme() {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key_Theme');
      if (jsonValue != null) {
        const initTheme = JSON.parse(jsonValue);
        // setIsLight(initTheme);
        setIsEnabled(initTheme);
      }
    } catch (e) {
      // error reading value
    }
  }


  async function toggleSwitch() {
    try {
      context.toggleTheme();
      setIsEnabled(previousState => !previousState);
    } catch (e) {
      // saving error
    }
  }

  function handlePressNotification() {
    navigation.navigate('OptionsSettings', {
      options: notification,
      onPress: handleSelectNotification,
    });
  }
  function handlePressTemperature() {
    navigation.navigate('OptionsSettings', {
      options: temperature,
      onPress: handleSelectTemperature,
    });
  }
  function handlePressLocation() {
    navigation.navigate('OptionsSettings', {
      options: location,
      onPress: handleSelectLocation,
    });
  }

  function changeOption(indexSelect, data) {
    let temp = data;
    temp.map((item, index) => {
      if (index === indexSelect) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    return temp;
  }

  function handleSelectNotification(itemSelect, indexSelect) {
    const optionNew = changeOption(indexSelect, notification);
    setOptionItem({
      ... optionItem,
      notification: itemSelect.title,
    });
    setNotification([...optionNew]);
  }

  function handleSelectTemperature(itemSelect, indexSelect) {
    const optionNew = changeOption(indexSelect, temperature);
    setOptionItem({
      ... optionItem,
      temperature: itemSelect.title,
    });
    setTemperature([...optionNew]);
  }

  function handleSelectLocation(itemSelect, indexSelect) {
    const optionNew = changeOption(indexSelect, location);
    setOptionItem({
      ... optionItem,
      location: itemSelect.title,
    });
    setLocation([...optionNew]);
  }

  return (
    <ScrollView style={{backgroundColor: isLight ? LIGHT : DARK}}>
      <ListComponent
        onPress={handlePressNotification}
        icon="notifications-outline"
        title="Notification settings"
        option={optionItem.notification}
      />

      <ListComponent
        onPress={handlePressTemperature}
        icon="thermometer-outline"
        title="Show temperature"
        option={optionItem.temperature}
      />

      <ListComponent
        onPress={handlePressLocation}
        icon="location-outline"
        title="Launch Location"
        option={optionItem.location}
      />

      <View style={[styles.containerItem, isLight && styles.itemEven]}>
        <Ionicons name="star-half-outline" size={20} color="gray" />
        <Text style={[styles.textItem, {color: isLight ? DARK : LIGHT}]}>
          Choose dark mode in
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          style={[styles.switchItem, isLight && styles.itemEven]}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('HelpScreen')}
        style={styles.containerItem}>
        <Ionicons name="help-circle-outline" size={20} color="gray" />
        <Text style={[styles.textItem, {color: isLight ? DARK : LIGHT}]}>
          Help
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('AboutScreen')}
        style={[styles.containerItem, isLight && styles.itemEven]}>
        <Ionicons name="information-circle-outline" size={20} color="gray" />
        <Text style={[styles.textItem, {color: isLight ? DARK : LIGHT}]}>
          About
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    padding: 10,
  },
  textItem: {
    marginLeft: 20,
    fontSize: 18,
  },
  switchItem: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  itemEven: {
    backgroundColor: '#fafafa',
  },
});
