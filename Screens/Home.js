import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {getDistance} from 'geolib';

const Home = ({navigation}) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBCMct19_1MEuAT_X6bAfId1T_G0OXp5t4';

  const [state, setState] = useState({
    startingCords: {
      latitude: 19.1663,
      longitude: 72.8526,
    },
    destinationCords: {},
  });

  const {startingCords, destinationCords} = state;

  let distance = getDistance(startingCords, destinationCords);
  console.log(distance);

  const onPressLocation = () => {
    navigation.navigate('ChooseLocation', {getCordinates: fetchValues});
  };

  const onUserLocationChange = coordinate => {
    console.log('cordinate', coordinate);
  };

  const fetchValues = data => {
    setState({
      startingCords: {
        latitude: data.pickupCords.latitude,
        longitude: data.pickupCords.longitude,
      },
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapView
          onUserLocationChange={onUserLocationChange}
          style={styles.map}
          initialRegion={{
            ...startingCords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={startingCords}
              destination={destinationCords}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="red"
            />
          )}

          <Marker
            image={require('../Src/images/bike.png')}
            coordinate={startingCords}
          />
          {Object.keys(destinationCords).length > 0 && (
            <Marker
              image={require('../Src/images/greenMarker.png')}
              coordinate={destinationCords}
            />
          )}
        </MapView>
      </View>
      <View style={styles.bottom}>
        <Text style={{fontSize: 16}}>Where are you going..?</Text>
        <TouchableOpacity onPress={onPressLocation} style={styles.input}>
          <Text style={{fontSize: 16}}>Enter Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  bottom: {
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 30,
    width: '100%',
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default Home;
