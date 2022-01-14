/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListKnob from '../items/ListKnob';

export default function OptionsSettings({navigation, route}) {
  const {options, onPress} = route.params;
  console.log(options);
  function handleOnPress(item, index) {
    navigation.goBack();
    onPress(item, index);
  }
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        ]}
        onPress={navigation.goBack}
      />
      <View style={styles.modalList}>
        <ListKnob />
        <View>
          {options.map(function (item, index) {
            return (
              <TouchableHighlight
                onPress={() => handleOnPress(item, index)}
                key={index}
                activeOpacity={0.7}
                underlayColor="#DDDDDD">
                <View style={styles.containerOption}>
                  <Text style={styles.textTitle}>{item.title}</Text>
                  {item.isSelected && (
                    <Ionicons
                      name="checkmark-outline"
                      size={22}
                      color="black"
                    />
                  )}
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalList: {
    width: '100%',
    height: '55%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerOption: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 17,
  },
});
