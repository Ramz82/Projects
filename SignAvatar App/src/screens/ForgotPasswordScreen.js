import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ForgotPasswordScreen = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Refs for each OTP input
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSend = () => {
    if (mobileNumber.trim() === "") {
      Alert.alert("Alert", "Enter Mobile Number");
    } else {
      setOtpSent(true);
      // Your logic to send OTP
    }
  };

  const handleVerify = () => {
    if (otp.some((digit) => digit.trim() === "")) {
      Alert.alert("Alert", "Enter complete OTP");
    } else {
      // Your verification logic here
      const fullOtp = otp.join("");
      console.log("Full OTP:", fullOtp);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value) || value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (value !== "" && index < 3) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.innerContainer}>
          <Image source={require("../Images/home.png")} style={styles.logo} />
          <Text style={styles.instructions} >
            Fill your Email Address and we will send you an OTP to change your
            password
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={25} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
          </View>
          {otpSent && (
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={otpInputRefs[index]}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>
          )}
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={otpSent ? handleVerify : handleSend}
          >
            <Text style={styles.verifyButtonText}>
              {otpSent ? "Verify" : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopColor: "black",
    borderTopWidth: 1,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  instructions: {
    textAlign: "center",
    paddingHorizontal: 30,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "normal",
    top: -25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 0,
    top: -10,
    marginHorizontal: 20,
    padding: 15,
    marginBottom: 25,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    width: 50,
    height: 50,
  },
  verifyButton: {
    backgroundColor: "#63CC3B",
    paddingVertical: 13,
    paddingHorizontal: 150,
    borderRadius: 25,
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ForgotPasswordScreen;
