import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './Navigation/tabs';
import {
  IndexHomeContainer,
  IndexRestuarantContainer,
  IndexOrderDeliveryContainer,
} from './Screens';
const Stack = createStackNavigator();

const App = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Restuarant" component={IndexRestuarantContainer} />
        <Stack.Screen
          name="OrderDelivery"
          component={IndexOrderDeliveryContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
