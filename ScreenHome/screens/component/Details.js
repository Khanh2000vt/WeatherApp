import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Details(props) {
  return (
    <View style={styles.details}>
      <FontAwesome5 name={props.icon} style={styles.iconDetails}/>
      <Text style={styles.titleInformation}>{props.title}</Text>
      <Text style={styles.dataInformation}>{props.data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    width:'30%',
    marginVertical: 10
  },
  iconDetails: {
    color: '#FF6D7F',
    alignSelf: "center",
  },
  titleInformation: {
    fontSize: 10,
    color: "#343432",
    alignSelf: "center",
  },
  dataInformation: {
    fontSize: 12,
    color: "#343432",
    alignSelf: "center",
  },
});