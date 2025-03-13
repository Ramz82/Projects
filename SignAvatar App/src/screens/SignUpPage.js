import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the eye icon

const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState(""); // New state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true); // For password visibility toggle
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true); // For confirm password visibility toggle

  useEffect(() => {
    // Load previously entered values from AsyncStorage (if any)
    const loadUserData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("userEmail");
        const savedPassword = await AsyncStorage.getItem("userPassword");
        if (savedEmail !== null) {
          setEmail(savedEmail);
        }
        if (savedPassword !== null) {
          setPassword(savedPassword);
        }
      } catch (error) {
        console.log("Error loading user data", error);
      }
    };
    loadUserData();
  }, []);

  const handleSignUp = async () => {
    // Validate all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill all fields before proceeding.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters long.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords don't match!");
      return;
    }

    try {
      await AsyncStorage.setItem("userEmail", email.trim()); // Store email
      await AsyncStorage.setItem("userPassword", password.trim()); // Store password
      navigation.navigate("SignInPage"); // Redirect to login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/avartarSU.png")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.signUpText}>Create Account</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Sign up to create your account
            </Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.formContainerInner}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="****"
                secureTextEntry={passwordVisible} // Conditionally show/hide password
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                style={styles.eyeIconContainer}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"} // Conditionally render eye/eye-off icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="****"
                secureTextEntry={confirmPasswordVisible} // Conditionally show/hide confirm password
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                } // Toggle confirm password visibility
                style={styles.eyeIconContainer}
              >
                <Ionicons
                  name={confirmPasswordVisible ? "eye-off" : "eye"} // Conditionally render eye/eye-off icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.signInTextContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignInPage")}>
              <Text style={styles.signInButton}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  header: {
    marginBottom: 10,
  },
  signUpText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  descriptionContainer: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  descriptionText: {
    color: "#666666",
    textAlign: "left",
  },
  line: {
    borderBottomWidth: 3,
    borderBottomColor: "#63CC9B",
    marginTop: 20,
    width: 50,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    color: "black",
    fontWeight: "bold",
  },
  input: {
    fontsize: 18,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 9,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "left",
    position: "relative",
  },
  passwordInput: {
    width: "100%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
  },
  signUpButton: {
    backgroundColor: "#63CC9B",
    width: "65%",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signUpButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInTextContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  signInText: {
    color: "black",
    fontSize: 16,
  },
  signInButton: {
    color: "#63CC9B",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default SignUpPage;
