import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Details from './component/Details';
import PushNotification from "react-native-push-notification";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {height, width} = Dimensions.get('window');
const APIKEY = '1ab622d7b5732550a1ba64acf09920cf';
const background = require('../source/daycloud.png')
export default function HomeScreen({navigation}) {
  // useState hooks
  const [homeData, setHomeData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [detailsWeather, setDetailsWeather] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sevenWeathers, setSevenWeathers] = useState([]);
  const [hourly, setHourly] = useState([]);
  // useEffect hook
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const dataLocation = await fetch (
          'https://weather-api-2021-100eggs.herokuapp.com/',
        );
        return dataLocation;

      } catch (err) {
        console.log('Fetch failed', err);
      }
    };

    fetchHomeData()
    .then(response => response.json())
    .then(data => {
      createChannels();
      setHomeData(data.current);
      const weather = data.current.weather;
      setWeather(weather);
          console.log("weather data:" + weather);
          const details = [
            {
              icon: 'thermometer-full',
              title: 'Feel like',
              data: (Math.ceil(weather.main.feels_like - 273.15)).toFixed(0),
            },
            {
              icon: 'wind',
              title: 'Wind',
              data: `${(weather.wind.speed * 10).toFixed(1)} km/h`,
            },
            {
              icon: 'eye',
              title: 'Visibility',
              data: `${(weather.visibility / 1000).toFixed(1)} km`,
            },
            {
              icon: 'feather',
              title: 'Min - Max',
              data: `${Math.floor(weather.main.temp_min - 273.15)} - ${
                Math.ceil(weather.main.temp_max - 273.15)
              }`,
            },
            {
              icon: 'smog',
              title: 'Humidity',
              data: `${weather.main.humidity} %`,
            },
            {
              icon: 'umbrella',
              title: 'Sea Level',
              data: `${weather.main.sea_level}`,
            },
          ];
          setDetailsWeather(details);

          const forecast = data.current.forecast;
        console.log(forecast);
        let dailyArray = forecast.list.filter(item => {
          return item.dt_txt.slice(11, 13) === '03';
        });
        let hourlyArray = forecast.list.filter(item => {
          const today = new Date();
          let newString = item.dt_txt.slice(8, 10)
          return  newString == today.getDate() ;
        });
        setHourly(hourlyArray);
        console.log("Thoi tiet theo gio:" + hourlyArray);
        setSevenWeathers(dailyArray);
        console.log("Thoi tiet theo ngay:" + dailyArray);
        handleNotification(data?.current?.weather?.name, data?.current?.weather, data?.current?.AQI);
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "weather-channel",
        channelName: "Weather Channel"
      }
    )
    PushNotification.createChannel(
      {
        channelId: "AQI-channel",
        channelName: "AQI Channel"
      }
    )
  }

  const handleNotification = (location, weather, AQI) => {
    let infoAQI = "";
    if(AQI?.list[0]?.main?.aqi === 1) infoAQI = "Good";
    if(AQI?.list[0]?.main?.aqi === 2) infoAQI = "Fair";
    if(AQI?.list[0]?.main?.aqi === 3) infoAQI = "Moderate";
    if(AQI?.list[0]?.main?.aqi === 4) infoAQI = "Unhealthy";
    if(AQI?.list[0]?.main?.aqi === 5) infoAQI = "Very Unhealthy";

    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification(
      {
        channelId: "AQI-channel",
        title: `Chất lượng không khí ${location}`,
        message: `
        AQI: ${AQI?.list[0]?.main?.aqi} 
        ${infoAQI} `,
        smallIcon: "ic_aqi",
      }
    )
    PushNotification.localNotification(
      {
      channelId:"weather-channel",
      title: `Thông tin thời tiết ${location}`,
      message: 
      `
      Thời tiết: ${weather?.weather[0]?.description}
      Nhiệt độ: ${Math.ceil(weather?.main?.temp -273.15)}°C
      Độ ẩm: ${weather?.main?.humidity}%
      Tốc độ gió: ${weather?.wind?.speed}km/h
      `,
      smallIcon: "ic_weather",
    }
    )
  }

  // Other function and constant
  const today = new Date();
  const time = ` ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()} `;
  const dateConverter = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()} `;
  const getDateByDtAPI = (dt, timezone) => {
    const today = new Date(dt * 1000 - timezone * 1000);
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} `;
  };
  const getHourByDtAPI = (dt, timezone) => {
    const today = new Date(dt * 1000 - timezone * 1000);
    return `${today.getHours()}/${today.getMinutes()}/${today.getSeconds()} `;
  };


  return (
      <View style={styles.background}>
        {typeof weather.main != 'undefined' ? (
          <ImageBackground source={background} resizeMode='cover' style={{flex: 1}}>
            <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.homeScreen}>
              <Text style={styles.titleLocal}>{weather.name}</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.temperature}>
                  <Text style={styles.temperatureData}>
                    {Math.ceil(weather.main.temp - 273.15)}
                  </Text>
                  <Text style={styles.temperatureUnit}>°C</Text>
                </View>
                <Image
                  style={{height: 50, width: 50}}
                  source={{
                    uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
                  }}></Image>
              </View>
              <Text style={styles.weatherDescription}>
                {weather.weather[0].description}
              </Text>
              <Text style={styles.updateTime}>
                Updated as of {time} {date}
              </Text>
              <View style={styles.details}>
                {detailsWeather.map((item, index) => {
                  return (
                    <Details
                      icon={item.icon}
                      title={item.title}
                      data= {item.data}
                      key={index}
                    />
                  );
                })}
              </View>

              <View style={{width: '100%'}}>
                <FlatList
                  data={sevenWeathers}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={styles.weather7days}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.oneDay}
                      onPress={() => setShowModal(true)}>
                      {/* <Text style={{color:'white', fontSize:14}}>{item.dt_txt.slice(11, 13)}</Text> */}
                      <Image
                        style={{height: 50, width: 50}}
                        source={{
                          uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                        }}></Image>
                      <Text style={{color: '#000', fontSize: 25}}>
                        {Math.ceil(item.main.temp - 273.15)}°
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 14,
                          marginBottom: 10,
                        }}>
                        {item.weather[0].main}
                      </Text>
                      <Text style={{color: '#000', fontSize: 10}}>
                        {item.dt_txt.slice(8, 10)}-{item.dt_txt.slice(5, 7)}-
                        {item.dt_txt.slice(0, 4)}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString(2)}></FlatList>
              </View>

              <View style={{width: '100%'}}>
                <FlatList
                  data={hourly}
                  showsHorizontalScrollIndicator={false}
                  horizontal={false}
                  style={styles.weatherHourly}
                  renderItem={({item}) => (
                    <TouchableOpacity style={styles.oneHour}>
                      <View>
                        <Text style={{color: '#000', fontSize: 20}}>
                          {item.dt_txt.slice(11, 16)}
                        </Text>
                        <Text style={{color: '#000', fontSize: 12, fontStyle: 'italic'}}>
                          {item.weather[0].description}
                        </Text>
                      </View>

                      <View
                        style={{
                          marginRight: 20,
                          borderRadius: 20,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{height: 50, width: 50}}
                          source={{
                            uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                          }}></Image>
                        <Text style={{color: '#000', fontSize: 25}}>
                          {Math.ceil(item.main.temp - 273.15)}°
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString(2)}></FlatList>
              </View>
              {/* <TouchableOpacity 
              // onPress={() => navigation.navigate('AirScreen', {
              //   lat: weather.coord.lat,
              //   lon: weather.coord.lon,
              //   name: weather.name,
              // })}
              style={styles.airQualityButton}>
                <Text style={{color:'#fff', fontSize:15}}>Air Quality</Text>
              </TouchableOpacity> */}
            </View>

            {/* Chi tiết thời tiết */}
            {/* <View>
              <Modal
                visible={showModal}
                transparent={true}
                onRequestClose={_ => {
                  console.log('Close');
                }}>
                <View style={{backgroundColor: ' rgba(0,0,0,0.6)'}}>
                  <TouchableOpacity
                    style={{width: '100%', height: 0.2 * height}}
                    onPress={_ => setShowModal(false)}></TouchableOpacity>
                  <View
                    style={{
                      height: 0.8 * height,
                      backgroundColor: 'white',
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                    }}></View>
                </View>
              </Modal>
            </View> */}
          </ScrollView>
          </ImageBackground>
        ) : (
          <View style={{display:'flex',height:height, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ed6c78" />
      </View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  loadingScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  homeScreen: {
    padding: 10,
    flex: 1,
  },
  headerNav: {
    display: 'flex',
    height: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: width,
  },
  textHeaderNav: {
    color: '#000',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  background: {
    flex: 1,
  },
  titleLocal: {
    fontSize: 24,
    color: '#000',
    alignSelf: 'center',
    fontWeight:'bold'
  },
  iconDetails: {
    color: '#000',
    alignSelf: 'center',
  },
  temperature: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  temperatureData: {
    fontSize: 100,
    color: '#000',
  },
  temperatureUnit: {
    fontSize: 25,
    color: '#000',
  },
  weatherDescription: {
    fontSize: 22,
    color: '#000',
    alignSelf: 'center',
    marginBottom: 10,
  },
  updateTime: {
    fontSize: 10,
    color: '#000',
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 10,
    marginTop: 10
  },
  containerToday: {
    flexDirection: 'row',
    flex: 1,
  },
  weather7days: {
    width: '100%',
    paddingBottom: 15,
    paddingTop: 15,
  },
  weatherHourly: {
    width: '100%',
    borderRadius: 20,
  },
  oneDay: {
    width: 90,
    flexDirection: 'column',
    marginRight: 10,
    borderRadius: 30,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  windHumidity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
  },
  oneHour: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255,255, 0.5)',
    borderRadius: 10,
  },
  oneRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textDayDetails: {
    color: '#000',
    fontSize: 15,
  }
});
