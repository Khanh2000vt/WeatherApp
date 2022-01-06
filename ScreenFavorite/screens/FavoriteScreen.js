import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import {Picker} from '@react-native-picker/picker'
const {height, width} = Dimensions.get('window');

export default function FavoriteScreen() {
  const [showModalData, setShowModalData] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [dataModal, setDataModal] = useState('');
  const [data, setData] = useState([]);
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState('');
  const [launch, setLaunch] = useState(false);
  const [reload, setReload] = useState(false);

  const [selectedPicker, setSelectedPicker] = useState()
  useEffect(() => {
    const fetchFavoriteData = async () => {
      try {
        const data = await fetch(
          'https://weather-api-2021-100eggs.herokuapp.com',
        );
        return data;
      } catch (err) {
        console.log('Fetch failed', err);
      }
    };
    fetchFavoriteData()
      .then(response => response.json())
      .then(data => {
        setData(data);
        setCurrentPlace(data.current);
        setFavoritePlaces(data.favorite);
      });
  }, [reload]);

  function getTextFromAQI(aqi) {
    if (aqi === 5) {
      return 'Very Unhealthy';
    } else if (aqi === 4) {
      return 'Unhealthy';
    } else if (aqi === 3) {
      return 'Moderate';
    } else if (aqi === 2) {
      return 'Fair';
    } else if (aqi === 1) {
      return 'Good';
    }
  }
  setTimeout(function () {
    setLaunch(true);
  }, 3000);
  if (launch) {
    return (
      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 10,
          backgroundColor: 'rgb(246,235,216)',
        }}>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            fontSize: 15,
            color: '#33539e',
          }}>
          Launch Location
        </Text>
        <TouchableOpacity style={styles.oneFavorite}>
          <View style={styles.containTitle}>
            <Text style={{color: '#000', fontSize: 20}}>
              {currentPlace.weather.name}
            </Text>
          </View>
          <View style={styles.containTemperature}>
            <Text style={{color: '#000', fontSize: 24}}>
              {Math.ceil(currentPlace.weather.main.temp - 273.15)} °C
            </Text>
          </View>
          <View style={styles.containWeather}>
            <Text style={styles.textFavorite}>
              {currentPlace.weather.weather[0].main}
            </Text>
          </View>
          <View style={styles.containImage}>
            <Image
              style={{height: 40, width: 40}}
              source={{
                uri: `http://openweathermap.org/img/w/${currentPlace.weather.weather[0].icon}.png`,
              }}></Image>
          </View>
          <View style={styles.containHumidity}>
            <Text style={styles.textFavorite}>
              Độ ẩm: {currentPlace.weather.main.humidity}
            </Text>
          </View>
          <View style={styles.containWindSpeed}>
            <Text style={styles.textFavorite}>
              AQI: {getTextFromAQI(data.current.AQI.list[0].main.aqi)}
            </Text>
          </View>
          {data.current.AQI.list[0].main.aqi == 5 && 
            <View style={{backgroundColor: '#800E1F', width: 2, height: 70, position:'absolute', left:1, bottom:15}}>
              </View>}
              {data.current.AQI.list[0].main.aqi == 4 && 
            <View style={{backgroundColor: '#ed6c78', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
              {data.current.AQI.list[0].main.aqi == 3 && 
            <View style={{backgroundColor: '#FF6656', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
              {data.current.AQI.list[0].main.aqi == 2 && 
            <View style={{backgroundColor: '#F7DD70', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
              {data.current.AQI.list[0].main.aqi == 1 && 
            <View style={{backgroundColor: '#24E69E', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginBottom:10,
            fontSize: 15,
            color: '#33539e',
          }}>
          Favorite Places
        </Text>
        {favoritePlaces.map(place => {
          return (
            <TouchableOpacity
              style={styles.oneFavorite}
              onPress={() => {
                setShowModalData(true);
                setDataModal(place);
              }}>
              <View style={styles.containTitle}>
                <Text style={{color: '#000', fontSize: 20}}>
                  {place.weather.name}
                </Text>
              </View>
              <View style={styles.containTemperature}>
                <Text style={{color: '#000', fontSize: 24}}>
                  {Math.ceil(place.weather.main.temp - 273.15)} °C
                </Text>
              </View>
              <View style={styles.containWeather}>
                <Text style={styles.textFavorite}>
                  {place.weather.weather[0].main}
                </Text>
              </View>
              <View style={styles.containImage}>
                <Image
                  style={{height: 40, width: 40}}
                  source={{
                    uri: `http://openweathermap.org/img/w/${currentPlace.weather.weather[0].icon}.png`,
                  }}></Image>
              </View>
              <View style={styles.containHumidity}>
                <Text style={styles.textFavorite}>
                  Độ ẩm: {place.weather.main.humidity}
                </Text>
              </View>
              <View style={styles.containWindSpeed}>
                <Text style={styles.textFavorite}>
                  AQI: {getTextFromAQI(place.AQI.list[0].main.aqi)}
                </Text>
              </View>
              {place.AQI.list[0].main.aqi == 5 && 
            <View style={{backgroundColor: '#800E1F', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
              {place.AQI.list[0].main.aqi == 4 && 
            <View style={{backgroundColor: '#ed6c78', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
              {place.AQI.list[0].main.aqi == 3 && 
            <View style={{backgroundColor: '#FF6656', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
              {place.AQI.list[0].main.aqi == 2 && 
            <View style={{backgroundColor: '#F7DD70', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
              {place.AQI.list[0].main.aqi == 1 && 
            <View style={{backgroundColor: '#24E69E', width: 2, height: 70, position:'absolute', left:0, bottom:15}}>
              </View>}
            </TouchableOpacity>
          );
        })}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 40,
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.addFavorite}
           onPress={() => {
             setShowModalAdd(true);
          }}>
            <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>
              Thêm mới +
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Modal
            visible={showModalData}
            transparent={true}
            animationType='fade'
            onRequestClose={_ => {
              console.log('Close');
            }}>
            <View style={{backgroundColor: ' rgba(0,0,0,0.6)'}}>
              <TouchableOpacity
                style={{width: width, height: 0.4 * height}}
                onPress={_ => setShowModalData(false)}></TouchableOpacity>
              <View
                style={{
                  height: 0.6 * height,
                  backgroundColor: 'white',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}>
                  
                <Text>{dataModal?.weather?.coord?.lat}</Text>
              </View>
            </View>
          </Modal>

          <Modal
          style={{position:'relative'}}
            visible={showModalAdd}
            transparent={true}
            animationType='fade'
            onDismiss={() =>  setShowModalAdd(false) }
            onRequestClose={_ => {
              console.log('Close');
            }}>
            <View style={{backgroundColor: ' rgba(0,0,0,0.6)'}}>
              <TouchableOpacity
                style={{width: width, height: 0.4* height}}
                onPress={ _ => setShowModalAdd(false)}></TouchableOpacity>
              <View
                style={{
                  position:'relative',
                  height: 0.6 * height,
                  backgroundColor: 'white',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}>
                 <Picker ref={pickerRef} 
                 selectedValue={selectedPicker}
                 onValueChange={(itemValue, itemIndex) => {
                   setSelectedPicker(itemValue);
                 }}
                 >
                   <Picker.Item label="Java" value="java"/>
                   <Picker.Item label="javascript" value="javascript"/>
                   </Picker>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={{display:'flex',height:height, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ed6c78" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  oneFavorite: {
    height: 100,
    width: '100%',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'relative',
    marginBottom: 10,
  },
  addFavorite: {
    height: 40,
    width: '50%',
    borderRadius: 30,
    backgroundColor: '#ed6c78',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer','",
    marginBottom: 10,
  },
  background: {
    flex: 1,
  },
  textFavorite: {
    color: '#000',
  },
  containTitle: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  containWeather: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  containImage: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  containTemperature: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  containHumidity: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  containWindSpeed: {
    position: 'absolute',
    right: 20,
    top: 70,
  },
});
