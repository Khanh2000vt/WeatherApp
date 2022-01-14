/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Switch,
  View,
  StyleSheet,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListComponent from '../components/items/ListComponent';
import {
  optionsNotification,
  optionsTemperature,
  optionsLocation,
} from '../components/store/DataListComponent';
export default function SettingsScreen({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false); // switch

  // list option
  const [notification, setNotification] = useState(optionsNotification);
  const [temperature, setTemperature] = useState(optionsTemperature);
  const [location, setLocation] = useState(optionsLocation);

  //option
  const [optionItem, setOptionItem] = useState({
    notification: 'Once a day',
    temperature: 'Celsius',
    location: 'Default Location',
  });

  // async function setDataTheme() {
  //   const jsonValue = JSON.stringify(!isEnabled);
  //   console.log('setData2: ', jsonValue);
  //   await AsyncStorage.setItem('@storage_Key', jsonValue);
  // }

  // async function getDataTheme() {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key_Theme');
  //     if (jsonValue != null) {
  //       const initTheme = JSON.parse(jsonValue);
  //       console.log('get: ', initTheme);

  //       setIsEnabled(initTheme);
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // }

  async function toggleSwitch() {
    try {
      // setDataTheme();
    } catch (e) {
      // saving error
    }
    setIsEnabled(previousState => !previousState);
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
      ...optionItem,
      notification: itemSelect.title,
    });
    setNotification([...optionNew]);
  }

  function handleSelectTemperature(itemSelect, indexSelect) {
    const optionNew = changeOption(indexSelect, temperature);
    setOptionItem({
      ...optionItem,
      temperature: itemSelect.title,
    });
    setTemperature([...optionNew]);
  }

  function handleSelectLocation(itemSelect, indexSelect) {
    const optionNew = changeOption(indexSelect, location);
    setOptionItem({
      ...optionItem,
      location: itemSelect.title,
    });
    setLocation([...optionNew]);
  }

  return (
    <ScrollView style={{}}>
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

      <View style={styles.containerItem}>
        <Ionicons name="star-half-outline" size={20} color="gray" />
        <Text style={styles.textItem}>
          Choose dark mode in
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          style={styles.switchItem}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('HelpScreen')}
        style={styles.containerItem}>
        <Ionicons name="help-circle-outline" size={20} color="gray" />
        <Text style={styles.textItem}>
          Help
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('AboutScreen')}
        style={styles.containerItem}>
        <Ionicons name="information-circle-outline" size={20} color="gray" />
        <Text style={styles.textItem}>
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
