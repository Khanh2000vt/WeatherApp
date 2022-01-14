/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="cloudy" size={30} color="red" />
        <Ionicons name="cloudy-night-outline" size={30} color="blue" />
        <Ionicons name="thunderstorm" size={30} color="red" />
        <Ionicons name="snow-outline" size={30} color="blue" />
        <Ionicons name="rainy" size={30} color="red" />
        <Ionicons name="partly-sunny-outline" size={30} color="blue" />
        <Ionicons name="moon" size={30} color="red" />
      </View>

      <View style={styles.body}>
        <Ionicons name="logo-react" size={60} color="#61dafb" />
        <Text style={{fontSize: 20, color:'#000'}}>Đây là một sản phẩm của</Text>
        <Text style={{fontSize: 20, color:'#000'}}>Nguyễn Ngọc Khánh</Text>
        <Text style={{fontSize: 20, color:'#000'}}>Đinh Xuân Linh</Text>
        <Text style={{fontSize: 20, color:'#000'}}>Lồ Văn Khang</Text>
        <Text style={{fontSize: 20, color:'#000'}}>Nguyễn Văn Huy</Text>
      </View>

      <View style={styles.footer}>
        <Ionicons name="alarm" size={30} color="blue" />
        <Ionicons name="basketball-outline" size={30} color="red" />
        <Ionicons name="color-palette" size={30} color="blue" />
        <Ionicons name="leaf-outline" size={30} color="red" />
        <Ionicons name="pizza" size={30} color="blue" />
        <Ionicons name="school-outline" size={30} color="red" />
        <Ionicons name="paw" size={30} color="blue" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: -8,
    marginRight: 8,
  },
  body: {
    alignItems: 'center',
    marginTop: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: -12,
  },
});
