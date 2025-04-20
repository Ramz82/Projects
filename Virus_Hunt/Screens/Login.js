import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.10.9:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        if (data.userId) { // Ensure userId exists
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("username", data.name);
          await AsyncStorage.setItem("userId", data.userId.toString()); // Store userId
  
          navigation.navigate("Main");
        } else {
          alert("User ID not received from server.");
        }
      } 
    }catch (error) {
      console.error("Login Error:", error);
      alert("Error logging in.");
    }
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login to Virus Hunt</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Attach handleLogin to the Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.toggleText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121212",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    title: {
      color: "#B0B0B0",
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      backgroundColor: "#1E1E1E",
      color: "#FFF",
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
    },
    button: {
      backgroundColor: "#6200EE",
      padding: 12,
      borderRadius: 8,
      width: "100%",
      alignItems: "center",
      marginBottom: 15,
    },
    buttonText: {
      color: "#FFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    toggleText: {
      color: "#BB86FC",
    },
});

export default LoginScreen;
