import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export class Card extends Component {
  render() {
    return(
      <View style = {[Styles.cardFrame]} >
        <View style = {Styles.imageFrame} >
          <Image 
            style = {{ flex: 1 }}
            source = {{ uri: this.props.item.uri }}
            resizeMode = 'contain'
          />
        </View>
        <Text>{this.props.item.text}</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  cardFrame: {
    elevation: 1,
    width: '100%',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 2,
    paddingVertical: 4,
  },
  imageFrame: {
    height: 300,
    width: '100%',
  }
})