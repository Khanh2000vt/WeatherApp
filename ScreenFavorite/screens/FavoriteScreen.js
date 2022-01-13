import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {height, width} = Dimensions.get('window');
const DATAPROVINCE = [
  ['An Giang', '10.5-105.16667'],
  ['Bà Rịa - Vũng Tàu', '10.58333-107.25'],
  ['Bạc Liêu', '9.3-105.5'],
  ['Bắc Kạn', '22.25-105.83333'],
  ['Bắc Giang', '21.33333-106.43333'],
  ['Bắc Ninh', '21.18608-106.07631'],
  ['Bến Tre', '10.16667-106.5'],
  ['Bình Dương', '11.16667-106.66667'],
  ['Bình Định', '14.11-108.52'],
  ['Bình Phước', '11.75-106.91667'],
  ['Bình Thuận', '11.08333-108.08333'],
  ['Cà Mau', '9.08333-105.08333'],
  ['Cao Bằng', '22.75-106.08333'],
  ['Cần Thơ', '10.11667-105.5'],
  ['Đà Nẵng', '16.08333-108.08333'],
  ['Đắk Lắk', '12.75-108.25'],
  ['Đắk Nông', '12.16667-107.75'],
  ['Điện Biên', '21.33333-102.93333'],
  ['Đồng Nai', '11.0-107.16667'],
  ['Đồng Tháp', '10.58333-105.63333'],
  ['Gia Lai', '13.75-108.25'],
  ['Hà Giang', '22.75-105.0'],
  ['Hà Nam', '20.53333-105.96667'],
  ['Hà Nội', '21.0-105.75'],
  ['Hà Tĩnh', '18.33333-105.75'],
  ['Hải Dương', '20.91667-106.33333'],
  ['Hải Phòng', '20.8-106.66667'],
  ['Hòa Bình', '20.66667-105.33333'],
  ['Hồ Chí Minh city', '10.82327-106.62978'],
  ['Hậu Giang', '9.77605-105.46412'],
  ['Hưng Yên', '20.64637-106.05112'],
  ['Khánh Hòa', '12.2549-109.09332'],
  ['Kiên Giang', '10.0-105.16667'],
  ['Kon Tum', '14.75-107.91667'],
  ['Lai Châu', '22.28333-103.25'],
  ['Lào Cai', '22.3-104.16667'],
  ['Lạng Sơn', '21.83333-106.58333'],
  ['Lâm Đồng', '11.66667-108.08333'],
  ['Long An', '10.7-106.16667'],
  ['Nam Định', '20.25-106.25'],
  ['Nghệ An', '19.25-104.91667'],
  ['Ninh Bình', '20.23333-105.9'],
  ['Ninh Thuận', '11.75-108.83333'],
  ['Phú Thọ', '21.39963-105.22221'],
  ['Phú Yên', '13.16667-109.08333'],
  ['Quảng Bình', '17.5-106.33333'],
  ['Quảng Nam', '15.58333-107.91667'],
  ['Quảng Ngãi', '15.0-108.66667'],
  ['Quảng Ninh', '21.03141-106.99101'],
  ['Quảng Trị', '16.75-107.0'],
  ['Sóc Trăng', '9.55-105.91667'],
  ['Sơn La', '21.16667-104.0'],
  ['Tây Ninh', '11.33333-106.16667'],
  ['Thái Bình', '20.5-106.36667'],
  ['Thái Nguyên', '21.66667-105.83333'],
  ['Thanh Hóa', '20.06667-105.33333'],
  ['Thừa Thiên Huế', '16.33333-107.58333'],
  ['Tiền giang', '10.4-106.3'],
  ['Trà Vinh', '9.8-106.3'],
  ['Tuyên Quang', '22.11667-105.25'],
  ['Vĩnh Long', '10.1-106.0'],
  ['Vĩnh Phúc', '21.33333-105.56667'],
  ['Yên Bái', '21.72288-104.9113'],
  ['Quần đảo Hoàng Sa', '16.30-112.0'],
  ['Quần đảo Trường Sa', '8.00-112.0'],
];
export default function FavoriteScreen() {
  const [showModalData, setShowModalData] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [data, setData] = useState([]);
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState([]);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [launch, setLaunch] = useState(false);
  const [reload, setReload] = useState(false);

  const [selectedPicker, setSelectedPicker] = useState();
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
  }, [launch]);

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }
  function postNewFavoritePlaceToServer(newLat, newLon) {
    let putObject = {
      lat: newLat,
      lon: newLon,
    };
    fetch('https://weather-api-2021-100eggs.herokuapp.com/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(putObject),
    });
  }
  function deleteOneFavoritePlace(id) {
    fetch(`https://weather-api-2021-100eggs.herokuapp.com/favorite/${id}`, {
      method: 'DELETE',
    });
  }

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
  }, 10000);
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
              Độ ẩm: {currentPlace.weather.main.humidity}%
            </Text>
          </View>
          <View style={styles.containWindSpeed}>
            <Text style={styles.textFavorite}>
              AQI: {getTextFromAQI(data.current.AQI.list[0].main.aqi)}
            </Text>
          </View>
          {data.current.AQI.list[0].main.aqi == 5 && (
            <View
              style={{
                backgroundColor: '#800E1F',
                width: 2,
                height: 70,
                position: 'absolute',
                left: 1,
                bottom: 15,
              }}></View>
          )}
          {data.current.AQI.list[0].main.aqi == 4 && (
            <View
              style={{
                backgroundColor: '#ed6c78',
                width: 2,
                height: 70,
                position: 'absolute',
                left: 0,
                bottom: 15,
              }}></View>
          )}
          {data.current.AQI.list[0].main.aqi == 3 && (
            <View
              style={{
                backgroundColor: '#FF6656',
                width: 2,
                height: 70,
                position: 'absolute',
                left: 0,
                bottom: 15,
              }}></View>
          )}
          {data.current.AQI.list[0].main.aqi == 2 && (
            <View
              style={{
                backgroundColor: '#F7DD70',
                width: 2,
                height: 70,
                position: 'absolute',
                left: 0,
                bottom: 15,
              }}></View>
          )}
          {data.current.AQI.list[0].main.aqi == 1 && (
            <View
              style={{
                backgroundColor: '#24E69E',
                width: 2,
                height: 70,
                position: 'absolute',
                left: 0,
                bottom: 15,
              }}></View>
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginBottom: 10,
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
                  Độ ẩm: {place.weather.main.humidity}%
                </Text>
              </View>
              <View style={styles.containWindSpeed}>
                <Text style={styles.textFavorite}>
                  AQI: {getTextFromAQI(place.AQI.list[0].main.aqi)}
                </Text>
              </View>
              {place.AQI.list[0].main.aqi == 5 && (
                <View
                  style={{
                    backgroundColor: '#800E1F',
                    width: 2,
                    height: 70,
                    position: 'absolute',
                    left: 0,
                    bottom: 15,
                  }}></View>
              )}
              {place.AQI.list[0].main.aqi == 4 && (
                <View
                  style={{
                    backgroundColor: '#ed6c78',
                    width: 2,
                    height: 70,
                    position: 'absolute',
                    left: 0,
                    bottom: 15,
                  }}></View>
              )}
              {place.AQI.list[0].main.aqi == 3 && (
                <View
                  style={{
                    backgroundColor: '#FF6656',
                    width: 2,
                    height: 70,
                    position: 'absolute',
                    left: 0,
                    bottom: 15,
                  }}></View>
              )}
              {place.AQI.list[0].main.aqi == 2 && (
                <View
                  style={{
                    backgroundColor: '#F7DD70',
                    width: 2,
                    height: 70,
                    position: 'absolute',
                    left: 0,
                    bottom: 15,
                  }}></View>
              )}
              {place.AQI.list[0].main.aqi == 1 && (
                <View
                  style={{
                    backgroundColor: '#24E69E',
                    width: 2,
                    height: 70,
                    position: 'absolute',
                    left: 0,
                    bottom: 15,
                  }}></View>
              )}
              <TouchableOpacity
                style={{position: 'absolute', top: 2, right: 7}}
                onPress={() => {
                  deleteOneFavoritePlace(place.id);
                  setLaunch(false);
                  setReload(!reload);
                }}>
                <FontAwesome5 name="times-circle" style={styles.iconDetails} />
              </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.addFavorite}
            onPress={() => {
              setShowModalAdd(true);
            }}>
            <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>
              Thêm mới +
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {/* <Modal
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
          </Modal> */}

          <Modal
            style={{position: 'relative'}}
            visible={showModalAdd}
            transparent={true}
            animationType="fade"
            onDismiss={() => setShowModalAdd(false)}
            onRequestClose={_ => {
              console.log('Close');
            }}>
            <View style={{backgroundColor: ' rgba(0,0,0,0.6)'}}>
              <TouchableOpacity
                style={{width: width, height: 0.45 * height}}
                onPress={_ => setShowModalAdd(false)}></TouchableOpacity>
              <View style={styles.modalAddFavorite}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={require('../source/headerModal.png')}
                    style={{
                      width: '20%',
                      height: 5,
                      resizeMode: 'contain',
                    }}></Image>
                </View>
                <Text style={{marginTop: 20, fontSize: 15, marginBottom: 10}}>
                  Lựa chọn tỉnh thành của bạn:
                </Text>
                <View style={{borderWidth: 1, borderColor: 'red'}}>
                  <Picker
                    ref={pickerRef}
                    selectedValue={selectedPicker}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedPicker(itemValue);
                      //  alert(itemValue);
                      let latLonArray = itemValue.split('-');
                      setLat(latLonArray[0]);
                      setLon(latLonArray[1]);
                    }}>
                    <Picker.Item label="Tỉnh/Thành phố" value="" />
                    {DATAPROVINCE.map(province => {
                      return (
                        <Picker.Item label={province[0]} value={province[1]} />
                      );
                    })}
                  </Picker>
                </View>
                <Text style={{marginTop: 20, fontSize: 15, marginBottom: 10}}>
                  Hoặc điền Lat, Lon cho địa điểm yêu thích:
                </Text>
                <TextInput
                  inlineImageLeft="search_icon"
                  placeholder="Input Lat ..."
                  style={{paddingLeft: 10, borderWidth: 1, borderColor: 'red'}}
                  onChangeText={text => setLat(text)}
                />
                <TextInput
                  inlineImageLeft="search_icon"
                  placeholder="Input Lon ..."
                  onChangeText={text => setLon(text)}
                  style={{
                    marginTop: 10,
                    paddingLeft: 10,
                    borderWidth: 1,
                    borderColor: 'red',
                  }}
                />
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    marginTop: 20,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.addFavorite}
                    onPress={() => {
                      postNewFavoritePlaceToServer(lat, lon);
                      setReload(!reload);
                      setShowModalAdd(false);
                      setLaunch(false);
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 15,
                        textAlign: 'center',
                      }}>
                      Thêm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View
        style={{
          display: 'flex',
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
    height: 45,
    width: '50%',
    borderRadius: 30,
    backgroundColor: '#ed6c78',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer','",
    marginTop: 10,
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
  modalAddFavorite: {
    position: 'relative',
    height: 0.6 * height,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    paddingTop: 10,
  },
  iconDetails: {
    color: '#FF6D7F',
    alignSelf: 'center',
    fontSize: 25,
  },
});
