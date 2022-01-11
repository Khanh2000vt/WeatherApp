/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
function useTheme() {
  const [isLight, setIsLight] = useState(true);
  async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      console.log('theme: ', typeof JSON.parse(jsonValue));
      console.log('theme1: ', jsonValue);
      if (jsonValue != null) {
        const initTheme = JSON.parse(jsonValue);
        setIsLight(initTheme);
      }
    } catch (e) {
      // error reading value
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return isLight;
}

export {useTheme};
