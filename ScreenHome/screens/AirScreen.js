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

const {height, width} = Dimensions.get('window');
const APIKEY = '1ab622d7b5732550a1ba64acf09920cf';


export default function AirScreen({navigation}) {
  
  // const {lat, lon, name} = route?.params;

  const lat = 21.0245;
  const lon = 105.84117;
  const name = "Hanoi";
  const [airData, setAirData] = useState([]);
  const [timePassed, setTimePassed] = useState(false);
  // Ha noi: 21.0245 105.84117
  useEffect(() => {
    const fetchAirData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIKEY}`,
      )
        .then(response => response.json())
        .then(data => {
          setAirData(data);
        });
    };
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
            {airData.list[0].main.aqi === 1 && <GoodAir data={airData} lat={lat} lon={lon} name={name}/>}
            {airData.list[0].main.aqi === 2 && <FairAir data={airData} lat={lat} lon={lon} name={name}/>}
            {airData.list[0].main.aqi === 3 && <ModerateAir data={airData} lat={lat} lon={lon} name={name}/>}
            {airData.list[0].main.aqi === 4 && <PoorAir data={airData} lat={lat} lon={lon} name={name}/>}
            {airData.list[0].main.aqi === 5 && <VeryPoorAir data={airData} lat={lat} lon={lon} name={name}/>}
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
