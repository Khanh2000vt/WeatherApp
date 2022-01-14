/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableHighlight, Text, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function ListComponent(props) {
  function handleOnPress() {
    props.onPress();
  }

  return (
    <TouchableHighlight
      onPress={handleOnPress}
      activeOpacity={0.7}
      underlayColor="#DDDDDD">
      <View
        style={[
          styles.containerItem,
        ]}>
        <View style={styles.container}>
          <Ionicons
            name={props.icon}
            size={20}
            color="black"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textItem}>
              {props.title}
            </Text>
            <Text style={styles.textOptionSelected}>{props.option}</Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="gray"
          style={styles.chevron}
        />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
  },
  textContainer: {
    marginLeft: 20,
  },
  textItem: {
    fontSize: 18,
    color:'black'
  },
  textOptionSelected: {
    // alignSelf: 'flex-end',
    fontSize: 10,
    fontStyle: 'italic',
    color: 'gray',
    marginLeft: 10,
  },
  chevron: {
    alignSelf: 'center',
  },
  itemEven: {
    backgroundColor: '#fafafa',
  },
});
