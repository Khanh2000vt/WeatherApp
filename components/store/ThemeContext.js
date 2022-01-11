/* eslint-disable prettier/prettier */
import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ThemeContext = createContext();
// let localStorage;
function ThemeProvider({children}) {
  const [isLight, setIsLight] = useState(true);
  console.log('chay context');
  // useEffect(() => {
  //   getDataTheme();
  // }, []);
  async function setData() {
    const jsonValue = JSON.stringify(isLight);
    console.log('setData1: ', jsonValue);
    await AsyncStorage.setItem('@storage_Key_Theme', jsonValue);
  }

  async function getDataTheme() {
    console.log('chay get data');
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key_Theme');
      if (jsonValue != null) {
        const initTheme = JSON.parse(jsonValue);
        setIsLight(initTheme);
        console.log('context: ', initTheme);
        console.log('context-typeof: ', typeof initTheme);
      }
    } catch (e) {
      // error reading value
    }
  }

  function toggleTheme() {
    setIsLight(isLight === true ? false : true);
  }

  const value = {
    isLight,
    toggleTheme,
    getDataTheme,
    setData,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export {ThemeContext, ThemeProvider};
