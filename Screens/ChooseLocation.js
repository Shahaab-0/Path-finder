import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {showError, showSuccess} from '../helper/HelperFunction';
import AddressPickup from './AddressPickup';

const ChooseLocation = ({navigation, route}) => {
  const [state, setState] = useState({
    pickupCords: {},
    destinationCords: {},
  });

  const {pickupCords, destinationCords} = state;

  const checkValid = () => {
    if (Object.keys(pickupCords).length === 0) {
      showError('Please enter your pickup location');
      return false;
    }
    if (Object.keys(destinationCords).length === 0) {
      showError('Please enter your pickup location');
      return false;
    }
    return true;
  };

  const fetchAddressCords = (lat, lng) => {
    setState({
      ...state,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  const fetchDestinationCords = (lat, lng) => {
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  const onDone = () => {
    const isValid = checkValid();
    if (isValid) {
      route.params.getCordinates({
        pickupCords,
        destinationCords,
      });
      showSuccess('Success');
      navigation.goBack();
    }
  };

  //   console.log('route value', route.params.getCordinates);
  //   console.log('Pickup cords', pickupCords);
  //   console.log('destination cords', destinationCords);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: 'white', flex: 1, padding: 25}}>
        <AddressPickup
          placeholderText="Enter Pickup Location"
          fetchAddress={fetchAddressCords}
        />
        <View style={{marginBottom: 16}} />
        <AddressPickup
          placeholderText="Enter Destination Location"
          fetchAddress={fetchDestinationCords}
        />
        <TouchableOpacity onPress={onDone} style={styles.button}>
          <Text style={{fontSize: 16}}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
});

export default ChooseLocation;
