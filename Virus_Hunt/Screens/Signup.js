import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";


const AuthScreen = ({ isLogin, onAuthToggle, onAuthSubmit, navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  //const isLogin = route.params?.isLogin ?? true; // Default to Login screen
  const handleSignup = async () => {
    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }

    try {
        const response = await fetch("http://192.168.10.9:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        // Ensure the response is properly handled
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Signup failed");
        }

        const data = await response.json();
        alert(data.message); // Show success message

        // Navigate to Login screen (if using React Navigation)
        navigation.navigate("Login");

    } catch (error) {
        console.error("Signup Error:", error);
        alert(`Signup Error: ${error.message}`);
    }
};

  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>{isLogin ? "Login to Virus Hunt" : "Sign Up for Virus Hunt"}</Text>
      {!isLogin && (
        <TextInput
          placeholder="Name"
          placeholderTextColor="#888"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      )}
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.toggleText}>""Already have an account? Login"</Text>
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

export default AuthScreen;
