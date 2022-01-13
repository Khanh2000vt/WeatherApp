/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ScrollView, View, Text, Dimensions, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import {VictoryBar,VictoryLine, VictoryPie, VictoryChart, VictoryTheme, VictoryLabel} from 'victory-native';
const {height, width} = Dimensions.get('window');

export default function ChartScreen(props) {
  const name = props?.data?.weather?.name || "Unknown";
  const forecast = props?.data?.forecast;
  let dailyArray = forecast?.list.filter(item => item.dt_txt.slice(11, 13) === '03').map(item => {
    return {
      "temp": Math.ceil(item.main.temp - 273.15),
      "ngay": `${item.dt_txt.slice(8, 10)}/${item.dt_txt.slice(5, 7)}`
    }
  })
  let hourlyArray = forecast?.list.filter(item => {
    const today = new Date();
    let newString = item.dt_txt.slice(8, 10)
    return  newString == today.getDate();
  }).map(item => {
    return {
      "temp": Math.ceil(item.main.temp - 273.15),
      "gio": `${item.dt_txt.slice(11,13)} giờ`
    }})
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

  const AQI1 = [
    {x: 1, y: props?.data?.AQI.list[0]?.components?.co, label:`CO 
    ${props?.data?.AQI.list[0]?.components?.co}
    `},
    {x: 2, y: props?.data?.AQI.list[0]?.components?.o3, label:`O3 
    ${props?.data?.AQI.list[0]?.components?.o3}`},
    {x: 3, y: props?.data?.AQI.list[0]?.components?.pm10, label:`PM10 
    ${props?.data?.AQI.list[0]?.components?.pm10}`},
    {x: 4, y: props?.data?.AQI.list[0]?.components?.pm2_5, label:`PM2_5 
    ${props?.data?.AQI.list[0]?.components?.pm2_5}`},
  ]
  const AQI2 = [
    {x: 1, y: props?.data?.AQI.list[0]?.components?.no, label:`NO 
    ${props?.data?.AQI.list[0]?.components?.no}`},
    {x: 2, y: props?.data?.AQI.list[0]?.components?.so2, label:`SO2 
    ${props?.data?.AQI.list[0]?.components?.so2}`},
    {x: 3, y: props?.data?.AQI.list[0]?.components?.no2, label:`NO2 
    ${props?.data?.AQI.list[0]?.components?.no2}`},
    {x: 4, y: props?.data?.AQI.list[0]?.components?.nh3, label:`NH3 
    ${props?.data?.AQI.list[0]?.components?.nh3}`},
  ]
  const [activeHourlyChart, setActiveHourlyChart] = useState('Chart');
  const [activeDailyChart, setActiveDailyChart] = useState('Bar');
  return (
    <View style={styles.container}>
      {typeof forecast != 'undefined' ? (
      <ScrollView style={{paddingLeft:5}} 
      showsVerticalScrollIndicator={false}>
      <View style={styles.containerName}>
        <View style={styles.containerTextName}>
        <Text style={styles.textName}>{name}</Text>
        </View>
      </View>
      <View style={styles.containerDaily}>
        <VictoryChart width={width - 20} height={height/3} theme={VictoryTheme.material}>
      {activeDailyChart === "Bar" ? (<VictoryBar 
      style={{ labels: { fill: "white" } }}
        alignment="start"
        style={{
          data:{
            fill:'#c43a31',
            width:15,
          }
        }}
        animate
        data={dailyArray} x="ngay" y="temp"/>) : (
          <VictoryLine
        animate
        style={{
          data: { stroke: "#c43a31" },
        }}
        data={dailyArray} x="ngay" y="temp"/>
        )}
      </VictoryChart>
      <Text style={{textAlign: 'center', fontSize: 15, color:'#000'}}>Biểu đồ thời tiết 5 ngày tiếp theo</Text>
      {activeDailyChart === "Bar" ? (<View style={styles.containButton}>
        <TouchableOpacity style={styles.containButtonTextActive}
        onPress={() => {
          setActiveDailyChart('Chart');
        }}
        >
          <Text style={{textAlign: 'center', color:'#000'}}>View Line Chart</Text>
        </TouchableOpacity>
      </View>) : (
        <View style={styles.containButton}>
        <TouchableOpacity style={styles.containButtonTextActive}
        onPress={() => {
          setActiveDailyChart('Bar');
        }}
        >
          <Text style={{textAlign: 'center', color:'#000'}}>View Column Chart</Text>
        </TouchableOpacity>
      </View>
      )}
      
      </View>

      {/*  */}
      <View style={styles.containerDaily}>
      <VictoryChart width={width} height={height / 3} theme={VictoryTheme.material}>
      {activeHourlyChart === "Bar" ? (<VictoryBar 
        horizontal
        alignment="start"
        style={{
          data:{
            fill:'#c43a31',
            width:15,
          }
        }}
        animate
        data={hourlyArray} x="gio" y="temp"/>) : (<VictoryLine
        style={{
          data: { stroke: "#c43a31" },
        }}
          animate
          data={hourlyArray} x="gio" y="temp"/>)}
      </VictoryChart>

      <Text style={{textAlign: 'center', fontSize: 15, color:'#000'}}>Biểu đồ thời tiết hàng giờ</Text>
      {activeHourlyChart === "Bar" ? (<View style={styles.containButton}>
        <TouchableOpacity style={styles.containButtonTextActive}
        onPress={() => {
          setActiveHourlyChart('Chart');
        }}
        >
          <Text style={{textAlign: 'center', color:'#000'}}>View Line Chart</Text>
        </TouchableOpacity>
      </View>) : (
        <View style={styles.containButton}>
        <TouchableOpacity style={styles.containButtonTextActive}
        onPress={() => {
          setActiveHourlyChart('Bar');
        }}
        >
          <Text style={{textAlign: 'center', color:'#000'}}>View Column Chart</Text>
        </TouchableOpacity>
      </View>
      )}
      
      </View>
      <View style={{marginTop:20, position:'relative'}}>
      <VictoryPie data={AQI1} 
      width={width}
      height={height/3}
      colorScale={["tomato", "orange", "gold", "pink", "navy" ]}
      />
      <VictoryPie data={AQI2} 
      width={width}
      height={height/4}
      colorScale={["powderblue", "orange", "gold", "pink", "navy" ]}
      />
      <Text style={{textAlign: 'center', fontSize: 20, color:'#000'}}>AQI: {getTextFromAQI(props?.data?.AQI.list[0].main.aqi)}</Text>
      </View>
      <View style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        {props?.data?.AQI.list[0].main.aqi == 5 && (
            <View
              style={{
                backgroundColor: '#800E1F',
                width: width /2,
                height: 3
              }}></View>
          )}
          {props?.data?.AQI.list[0].main.aqi == 4 && (
            <View
              style={{
                backgroundColor: '#ed6c78',
                width: width /2,
                height: 3
              }}></View>
          )}
          {props?.data?.AQI.list[0].main.aqi == 3 && (
            <View
              style={{
                backgroundColor: '#FF6656',
                width: width /2,
                height: 3
              }}></View>
          )}
          {props?.data?.AQI.list[0].main.aqi == 2 && (
            <View
              style={{
                backgroundColor: '#F7DD70',
                width: width /2,
                height: 3
              }}></View>
          )}
          {props?.data?.AQI.list[0].main.aqi == 1 && (
            <View
              style={{
                backgroundColor: '#24E69E',
                width: width /2,
                height: 3
              }}></View>
          )}
      </View>
      
    </ScrollView>
    ) : (
      <View style={{display:'flex',height:height, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ed6c78" />
      </View>
    )}
    </View>
  );
}

const styles= StyleSheet.create({
  container: {flex:1, backgroundColor: 'rgb(246,235,216)', padding:10},
  containerName: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
  containerTextName: {height: 40,backgroundColor:'#fff',display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft:20, paddingRight:20, borderRadius:20},
  textName: {color:'#000', fontSize: 20},
  containerDaily: {
    position:'relative'
  },
  containButton: {display:'flex', alignItems: 'center',justifyContent: 'center', flexDirection:'row'},
  containButtonText: {width: 150, backgroundColor:'rgba(255,255,255,0.1)', borderRadius: 20, padding:5, margin: 10},
  containButtonTextActive: {width: 150, backgroundColor:'#fff', borderRadius: 20, padding:5, margin: 10}
})