import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import GoodAir from './component/GoodAir';
import FairAir from './component/FairAir';
import ModerateAir from './component/ModerateAir';
import PoorAir from './component/PoorAir';
import VeryPoorAir from './component/VeryPoorAir';
import axios from 'axios';

const {height, width} = Dimensions.get('window');
const APIKEY = '1ab622d7b5732550a1ba64acf09920cf';


export default function AirScreen({navigation}) {
  const [name, setName] = useState([]);
  const [airData, setAirData] = useState([]);
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    const fetchAirData = async () => {
      try {
        const dataLocation = await fetch (
          'https://weather-api-2021-100eggs.herokuapp.com/',
        );
        return dataLocation;

      } catch (err) {
        console.log('Fetch failed', err);
      }
    };
    fetchAirData()
    .then(response => response.json())
    .then(data => {
      setAirData(data.current.AQI);
      setName(data.current.weather.name);
    })
  }, []);
  setTimeout(function () {
    setTimePassed(true);
  }, 3000);
  if (timePassed) {
    return (
      <ScrollView>
        {typeof airData.list != 'undefined' ? (
          <View style={styles.airScreen}>
            <View>
            {airData.list[0].main.aqi === 1 && <GoodAir data={airData} name={name}/>}
            {airData.list[0].main.aqi === 2 && <FairAir data={airData} name={name}/>}
            {airData.list[0].main.aqi === 3 && <ModerateAir data={airData} name={name}/>}
            {airData.list[0].main.aqi === 4 && <PoorAir data={airData} name={name}/>}
            {airData.list[0].main.aqi === 5 && <VeryPoorAir data={airData} name={name}/>}
            </View>
            
          </View>
        ) : (
          <View>
              <Text> Bad Request</Text>
          </View>
        )}
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.loadingScreen}>
        <View style={{display:'flex',height:height, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ed6c78" />
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  airScreen: {
    width: width,
    height: height,
  },
  loadingScreen: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height:height,
      width:width,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});
