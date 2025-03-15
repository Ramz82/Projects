import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const SharePage = () => {
  const navigation = useNavigation(); // Initialize navigation

  const copyLinkToClipboard = () => {
    // Logic to copy the link to clipboard
    // You can implement this using Clipboard API or any other method
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Copy the app download link and share it with your friends.
          </Text>
          <TouchableOpacity style={styles.button} onPress={copyLinkToClipboard}>
            <Text style={styles.buttonText}>Copy Link</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Bottom Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("SharePage")}>
          <Image
            source={require("../Images/share1.png")}
            style={{ width: 24, height: 24 }}
          />
          <View style={styles.dot} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image
            source={require("../Images/home1.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image
            source={require("../Images/settings1.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../Images/Profile1.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#63CC9B",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#63CC9B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
  },
  dot: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    marginLeft: -3,
    backgroundColor: "#63CC9B",
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default SharePage;
