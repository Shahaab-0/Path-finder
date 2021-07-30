import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Screens/Home';
import ChooseLocation from './Screens/ChooseLocation';
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen navigationop name="Home" component={Home} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
