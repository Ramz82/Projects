import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ChangepasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handlePasswordChange = async () => {
    const storedPassword = await AsyncStorage.getItem("userPassword");
    console.log("Stored Password:", storedPassword); // Debug output

    // Use trim() to ensure no leading/trailing whitespaces
    if (oldPassword.trim() !== storedPassword) {
      Alert.alert("Error", "The old password is incorrect.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "The new passwords do not match.");
      return;
    }
    // Set the new password, again make sure to trim it to avoid whitespace issues
    await AsyncStorage.setItem("userPassword", newPassword.trim());
    Alert.alert("Success", "Password successfully changed!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../Images/home.png")} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} style={styles.icon} />
        <TextInput
          secureTextEntry={hidePassword}
          style={styles.input}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-reset" size={24} style={styles.icon} />
        <TextInput
          secureTextEntry={hidePassword}
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-check" size={24} style={styles.icon} />
        <TextInput
          secureTextEntry={hidePassword}
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
    top: 25,
  },
  logo: {
    width: 220,
    height: 200,
    resizeMode: "contain",
    top: -17,
    textAlign: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    width: "90%",
    left: 20,
    top: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
  icon: {
    marginHorizontal: 0,
  },
  button: {
    backgroundColor: "#63CC9B",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    marginTop: 20,
    top: 10,
    paddingVertical: 13,
    left: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});

export default ChangepasswordScreen;
