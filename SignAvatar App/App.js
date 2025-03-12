import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import WelcomePage from "./src/screens/WelcomePage";
import FirstPage from "./src/screens/FirstPage";
import SignUpPage from "./src/screens/SignUpPage";
import SignInPage from "./src/screens/SignInPage";
import HomeScreen from "./src/screens/HomeScreen";
import SharePage from "./src/screens/SharePage";
import Settings from "./src/screens/Setting";
import Profile from "./src/screens/Profile";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import EditProfile from "./src/screens/EditProfile";
import ChangepasswordScreen from "./src/screens/ChangepasswordScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// FrontPage Component
function FrontPage({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("WelcomePage")} // Navigate to WelcomePage on press
    >
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <Text style={styles.appName}>SignAvatar</Text>
    </TouchableOpacity>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FrontPage"
        screenOptions={{ headerShown: false }} // Hide headers globally
      >
        <Stack.Screen name="FrontPage" component={FrontPage} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SharePage" component={SharePage} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ title: "Forgot Password", headerShown: true }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangepasswordScreen}
          options={{ title: "Change Password", headerShown: true }}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A97D", // Sea green background color
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;
