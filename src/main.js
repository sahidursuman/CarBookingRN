import React, { Component } from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import GeoCoder from 'react-native-geocoder'

export default class Main extends Component {
  state = {
    postion: null,
    carLocations: [
      {
        rotation: 78,
        latitude: 37.78725,
        longitude: -122.4318
      },
      {
        rotation: -10,
        latitude: 37.79015,
        longitude: -122.4318
      },
      {
        rotation: 262,
        latitude: 37.78525,
        longitude: -122.4348
      }
    ]
  }

  static initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421
  }

  _onRegionChange = region => {
    this.setState({ position: null })
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(async () => {
      try {
        const res = await GeoCoder.geocodePosition({
          lat: region.latitude,
          lng: region.longitude
        })
        this.setState({ position: res[0] })
      } catch (err) {
        console.log(err)
      }
    }, 2000)
  }

  componentDidMount() {
    this._onRegionChange(this.initialRegion)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.fullScreenMap}
          initialRegion={this.initialRegion}
          onRegionChange={this._onRegionChange}
        >
          {this.state.carLocations.map((carLocation, i) => (
            <MapView.Marker key={i} coordinate={carLocation}>
              <Animated.Image
                style={{
                  transform: [{ rotate: `${carLocation.rotation}deg` }]
                }}
                source={require('../img/car.png')}
              />
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fullScreenMap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})
