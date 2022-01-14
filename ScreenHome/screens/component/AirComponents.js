import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
export default function AirComponents(props) {
  return (
    <View>
      <View style={{backgroundColor: '#rgba(255,255,255,0.8)', width: width - 40, margin:20, borderRadius:20, padding:20}}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom:5}}>
          <View
            style={styles.oneColumn}>
            <Text style={styles.text}>CO:</Text>
            <Text style={styles.textUnder}>{props.data.co}</Text>
          </View>
          <View
            style={styles.oneColumn}>
            <Text style={styles.text}>NO:</Text>
            <Text style={styles.textUnder}>{props.data.no}</Text>
          </View>
          <View
            style={styles.oneColumn}>
            <Text style={styles.text}>NO2:</Text>
            <Text style={styles.textUnder}>{props.data.no2}</Text>
          </View>
          <View
            style={styles.oneColumn}>
            <Text style={styles.text}>O3:</Text>
            <Text style={styles.textUnder}>{props.data.o3}</Text>
          </View>
        </View>
        <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
        <View
          style={styles.oneColumn}>
          <Text style={styles.text}>SO2:</Text>
          <Text style={styles.textUnder}>{props.data.so2}</Text>
        </View>
        <View
          style={styles.oneColumn}>
          <Text style={styles.text}>PM2_5:</Text>
          <Text style={styles.textUnder}>{props.data.pm2_5}</Text>
        </View>
        <View
          style={styles.oneColumn}>
          <Text style={styles.text}>PM10:</Text>
          <Text style={styles.textUnder}>{props.data.pm10}</Text>
        </View>
        <View
          style={styles.oneColumn}>
          <Text style={styles.text}>NH3:</Text>
          <Text style={styles.textUnder}>{props.data.nh3}</Text>
        </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    oneColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    text:{
        color:'#000',
        fontSize:10
    },
    textUnder: {
        color: '#000',
        fontSize:14
    }
})