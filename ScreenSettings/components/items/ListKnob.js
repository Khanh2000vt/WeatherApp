/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function ListKnob() {
    return (
        <View style={styles.rules}></View>
    );
}

const styles = StyleSheet.create({
    rules: {
        height: 5,
        width: '10%',
        backgroundColor: '#c0c0c0',
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 20,
      },
});
