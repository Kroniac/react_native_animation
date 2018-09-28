import React, { PureComponent } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export class Ball extends PureComponent {
  constructor() {
    super();
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 }
    }).start();
  }

  render() {
    return (
      <Animated.View style = {this.position.getLayout()} >
        <View style = {Styles.ball} />
      </Animated.View>
    );
  }
}

const Styles = StyleSheet.create({
  ball: {
    height: 70,
    width: 70,
    backgroundColor: 'black',
    borderRadius: 35,
  },
});
