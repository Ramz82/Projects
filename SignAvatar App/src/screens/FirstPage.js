import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const FirstPage = ({ navigation }) => {
  const goToSignInPage = () => {
    navigation.navigate("SignInPage");
  };

  const goToSignUpPage = () => {
    navigation.navigate("SignUpPage");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../Images/first.png")} style={styles.image} />
      <TouchableOpacity style={styles.loginButton} onPress={goToSignInPage}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={goToSignUpPage}>
        <Text style={styles.regText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    width: 320,
    borderColor: "#B274F1",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 80,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#B274F1",
    width: 320,
    borderWidth: 2,
    borderColor: "#B274F1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 40,
  },
  buttonText: {
    color: "#B274F1",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  regText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FirstPage;
