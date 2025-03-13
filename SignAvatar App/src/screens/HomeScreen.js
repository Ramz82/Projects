import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle file upload
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setSelectedImage(result.uri); // Update state with selected file URI
        Alert.alert("File Selected", `You selected ${result.name}`);
      } else {
        console.log("No file selected");
      }
    } catch (err) {
      console.error("Error selecting file:", err);
      Alert.alert("Error", "An error occurred while selecting the file.");
    }
  };

  return (
    <ImageBackground
      source={require("../Images/Capture.png")} // Replace with your image path
      style={styles.container}
    >
      <View style={styles.contentSection}>
        <Text style={styles.instructionsText}>
          Paste the link of the video , or upload a document file from your
          device
        </Text>
        <View style={styles.linkInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Paste a link here..."
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleFileUpload}
        >
          <View style={styles.uploadButtonContent}>
            <Image
              source={require("../Images/up1.png")}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText}>+ Upload your file</Text>
          </View>
        </TouchableOpacity>
      </View>

      

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("SharePage")}>
          <Image source={require("../Images/share1.png")} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Image source={require("../Images/home1.png")} style={styles.navIcon} />
            <View style={styles.activeDot} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image source={require("../Images/settings1.png")} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={require("../Images/Profile1.png")} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  contentSection: {
    width: "100%", // Left side content section takes 100% width
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: Add slight background overlay for better contrast
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  instructionsText: {
    fontSize: 25,
    color: "black",
    marginBottom: 20,
    fontWeight: "bold", // Explicitly set to normal to remove bold
  },
  linkInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    width: "80%", // Input field takes up 80% width of the section
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    border: "black",
  },
  submitButton: {
    marginLeft: 10,
    backgroundColor: "#63CC9B",
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#ffff",
  },
  uploadButton: {
    backgroundColor: "#63CC9B",
    borderRadius: 10,
    padding: 35, // Increased padding to increase height
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    radius:10,
  },
  uploadButtonContent: {
    flexDirection: "row",
    alignItems: "center",

  },
  uploadIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    color:"white",
  },
  uploadText: {
    color: "white",
  },
  imagePreviewSection: {
    width: "50%", // Takes up the right half of the screen
    paddingTop: 20, // Adds top padding to create space from the top
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%", // Takes up full width of the section
    height: 300, // Fixed height for the image
    resizeMode: "contain", // Ensures the image maintains its aspect ratio
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  activeDot: {
    position: "absolute",
    bottom: -5,
    left: "50%",
    marginLeft: -3,
    backgroundColor: "#63CC9B",
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});