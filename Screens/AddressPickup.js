import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

const AddressPickup = ({placeholderText, fetchAddress}) => {
  const onPressAdress = (data, details) => {
    Geocoder.init('AIzaSyBCMct19_1MEuAT_X6bAfId1T_G0OXp5t4');
    const address = details.description;
    Geocoder.from(address)
      .then(json => {
        var lat = json.results[0].geometry.location.lat;
        var lng = json.results[0].geometry.location.lng;
        fetchAddress(lat, lng);
      })
      .catch(error => console.warn(error));

    // console.log('details >', details.description);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholderText}
        onPress={onPressAdress}
        query={{
          key: 'AIzaSyBCMct19_1MEuAT_X6bAfId1T_G0OXp5t4',
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.input,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerStyle: {
    backgroundColor: 'white',
  },
  input: {
    height: 48,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#F3F3F3',
  },
});

export default AddressPickup;
