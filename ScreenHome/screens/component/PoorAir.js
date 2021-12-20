import React from 'react';
import {View, Text, StyleSheet, Dimensions,Image, ScrollView} from 'react-native';
import AirComponents from './AirComponents'
const {height, width} = Dimensions.get('window');

const today = new Date();
const time = ` ${today.getHours()}:${today.getMinutes()}`;
const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} `;

export default function PoorAir(props) {
    return (
        <ScrollView>
            <View style={styles.container}>
            <Text style={{color:'#fff', fontSize: 25, marginTop:20}}>{props.name}</Text>
            <Text style={{color:'#fff', fontSize: 20, marginTop:20}}>Unhealthy</Text>
            <View style={styles.containImage}>
            <Image source={require('../../source/sad-face.png')}
            style={styles.image}/>
            </View>
            <Text style={{color:'#fff', fontSize: 25}}>{props.data.list[0].components.pm2_5}</Text>
            <Text style={{color:'#666', fontSize:8, color:'#fff'}}>Pm2_5</Text>
            <Text style={{textAlign:'center', color:'#fff', marginTop:10}}>Everyone may begin to experience health effect.</Text>
            <Text style={{textAlign:'center', color:'#fff'}}>Members of sensitive groups may experience more serious health effects</Text>
            <Text style={{marginTop:10, color:'#fff', fontSize: 12, fontStyle:'italic'}}>Update as of {time} {date}</Text>
            <AirComponents data={props.data.list[0].components}/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        widht:width,
        backgroundColor: '#9B174C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    containImage:{
        display: 'flex', 
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:40,
        marginBottom:30
    },
    image: {
        width: width /3,
        height: width /3
    }
})