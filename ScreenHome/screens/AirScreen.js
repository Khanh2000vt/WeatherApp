import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView
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
  
  const [airData, setAirData] = useState([]);
  const [location, setLocation] = useState([])
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    const fetchAirData = async () => {
      const dataLocation = await axios('https://weather-api-2021-100eggs.herokuapp.com/');
      setLocation(dataLocation.data);

      const airData = await axios(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.render.lat}&lon=${location.render.lon}&appid=${APIKEY}`);
      setAirData(airData.data);
    }
    fetchAirData();
  }, []);
  // airData.list[0].main.aqi
  setTimeout(function () {
    setTimePassed(true);
  }, 3000);
  if (timePassed) {
    return (
      <ScrollView>
        {typeof airData.list != 'undefined' ? (
          <View style={styles.airScreen}>
            <View>
            {airData.list[0].main.aqi === 1 && <GoodAir data={airData} name={location.render.name}/>}
            {airData.list[0].main.aqi === 2 && <FairAir data={airData} name={location.render.name}/>}
            {airData.list[0].main.aqi === 3 && <ModerateAir data={airData} name={location.render.name}/>}
            {airData.list[0].main.aqi === 4 && <PoorAir data={airData} name={location.render.name}/>}
            {airData.list[0].main.aqi === 5 && <VeryPoorAir data={airData} name={location.render.name}/>}
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
        <Text style={{color:'#fff', fontSize:13}}> Đang tải dữ liệu</Text>
        <Text style={{color:'#fff', fontSize: 13}}> Xin chờ trong giây lát</Text>
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
