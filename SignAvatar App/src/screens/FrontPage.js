import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// FrontPage Component
function FrontPage({ navigation }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() =>  navigation.navigate('WelcomePage')}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.appName}>SignAvatar</Text>
    </TouchableOpacity>
  );
}

// WelcomePage Component
function WelcomePage() {
  return (
    <View style={styles.pageContainer}>
      <Text>Welcome to the SignAvatar App!</Text>
    </View>
  );
}

// FirstPage Component (Placeholder)
function FirstPage() {
  return (
    <View style={styles.pageContainer}>
      <Text>Welcome to First Page</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FrontPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FrontPage" component={FrontPage} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="FirstPage" component={FirstPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E8B57', // Adjusted to sea green hex color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
