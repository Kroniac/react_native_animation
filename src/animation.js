import React, { Component } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { Deck } from './deck';
import { DATA } from './config/data';

export class Animation extends Component {
  render() {
    return (
      <View style = {Styles.container} >
        <Deck 
          data = {DATA}
        />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex:1,
  }
})