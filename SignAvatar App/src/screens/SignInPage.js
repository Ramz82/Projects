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
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true); // State to toggle password visibility

  useEffect(() => {
    // Clear email and password when the component mounts
    setEmail("");
    setPassword("");
  }, []);

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();  // Remove extra spaces
    const trimmedPassword = password.trim();  // Remove extra spaces

    // Validate email format
    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!trimmedPassword) {
      Alert.alert("Password required", "Please enter your password.");
      return;
    }

    try {
      // Retrieve stored email and password from AsyncStorage
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");

      // Debugging: Check what is being retrieved from AsyncStorage
      console.log("Entered Email:", trimmedEmail);  // Debugging line
      console.log("Entered Password:", trimmedPassword);  // Debugging line
      console.log("Stored Email:", storedEmail);  // Debugging line
      console.log("Stored Password:", storedPassword);  // Debugging line

      // Check if the entered email and password match the stored values
      if (trimmedEmail === storedEmail && trimmedPassword === storedPassword) {
        console.log("Login successful"); // Debugging line

        // Navigate to the home screen and reset the navigation stack
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      } else {
        // Display an error message for incorrect credentials
        Alert.alert("Invalid credentials", "Please enter correct email and password.");
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
      // Display an error message if there's an issue retrieving data from AsyncStorage
      Alert.alert("Error", "An unexpected error occurred. Please try again later.");
    }
  };

  // Simple email validation function (you can adjust as needed)
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <ImageBackground
      source={require("../../assets/avartarSU.png")} // Path to your background image
      style={styles.container} // This makes the background image fill the entire screen
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.signUpText}>Log In</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Sign in to your registered account</Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.formContainerInner}>
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
                <Icon
                  name={passwordVisible ? "eye-slash" : "eye"} // Conditionally render eye/eye-slash icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => navigation.navigate("ForgotPasswordScreen")} // Navigate to ForgotPasswordScreen
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignIn}>
            <Text style={styles.signUpButtonText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.signInTextContainer}>
            <Text style={styles.signInText}>Need an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
              <Text style={styles.signInButton}>Sign Up</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Add an overlay for better contrast of the form
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "white", // Background of the form
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
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    width: "100%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingRight: 40, // Add space for the icon inside the box
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10, // Position the icon inside the input box
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#63CC3B",
  },
  signUpButton: {
    backgroundColor: "#63CC9B",
    width: "65%",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    elevation: 8, // Add shadow for Android
    shadowColor: "#000", // Add shadow properties for iOS
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

export default SignInPage;

