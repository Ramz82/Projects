import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import MainScreen from './screens/MainScreen';
// Create Stack Navigator
const Stack = createStackNavigator();

// Main App Component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
        {/* Authentication Stack */}
        <Stack.Screen name="Main" component={MainScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
