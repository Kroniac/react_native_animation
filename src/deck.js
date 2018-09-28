import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, PanResponder, Animated, Dimensions, ToastAndroid } from 'react-native'
import { Card } from './components/card'

const Screen_Width = Dimensions.get('window').width;
const Swipe_Threshold = Screen_Width * 0.3;

export class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    }
    this.fadeIn = new Animated.Value(0);
    this.position = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > Swipe_Threshold) {
          ToastAndroid.show('Placed', ToastAndroid.SHORT);
          this._resetPosition();
        } else if (gesture.dx < -Swipe_Threshold) {
          this._forceSwipeLeft();
          ToastAndroid.show('Skipped', ToastAndroid.SHORT);
        } else this._resetPosition();
      },
    });
  }

  _forceSwipeRight = () => {
    Animated.timing(this.position, {
      toValue: { x: Screen_Width * 2, y: 0 },
      duration: 250,
    }).start();
  }

  _forceSwipeLeft = () => {
    Animated.timing(this.position, {
      toValue: { x: -Screen_Width * 2, y: 0 },
      duration: 250,
    }).start(() => {
      this._onSwipeLeft();
    });
  }

  _resetPosition = () => {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  _returnCardStyles = () => {
    const rotate = this.position.x.interpolate({
      inputRange: [-Screen_Width * 2, 0, Screen_Width * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    };
  }

  _onSwipeLeft= () => {
    this.position.setValue({ x: 0, y: 0 });
    this.setState((prevState) => ({ currentIndex: prevState.currentIndex + 1 }));
  }

  _returnOpacity = () => {
    const opacity = this.position.x.interpolate({
      inputRange: [-Swipe_Threshold, 0],
      outputRange: [1, -5],
    });

    return opacity;
  }

  render() {
    return (
      <View style = {Styles.container}>
        <Animated.View style = {{ zIndex: 1, opacity: this._returnOpacity(), justifyContent: 'center', borderRadius: 10, height: 40, width: 80, backgroundColor: 'orange', alignItems: 'center', top: 7 }}>
          <Text style = {{ fontFamily: 'avenir', fontSize: 16 }} >SKIP</Text>
        </Animated.View>
        {
          this.state.currentIndex <= this.props.data.length - 1 ?
            <Animated.View
              style = {[{ width: '100%' }, this._returnCardStyles()]}
              {...this.panResponder.panHandlers}
            >
              <Card item = {this.props.data[this.state.currentIndex]} />
            </Animated.View> : <View style = {{ width: '100%', alignItems: 'center' }} ><Text>Empty List</Text></View>
        }
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7,
    zIndex: 0,
  }
})