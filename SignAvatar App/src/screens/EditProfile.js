import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  Platform,
  ActionSheetIOS,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUri, setAvatarUri] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userCredentials = await AsyncStorage.getItem("userCredentials");
        const parsedCredentials = userCredentials
          ? JSON.parse(userCredentials)
          : {};

        setFullName(parsedCredentials.fullName || "");
        setEmail(parsedCredentials.email || "");
        setAvatarUri(parsedCredentials.avatarUri || null);
      } catch (error) {
        Alert.alert("Error", "Unable to load user information.");
      }
    };

    loadUserInfo();
  }, []);

  const handleUpdate = async () => {
    if (!fullName || !email) {
      Alert.alert("Error", "Fill in all required fields.");
      return;
    }

    try {
      const updatedCredentials = {
        fullName,
        email,
        avatarUri,
      };
      await AsyncStorage.setItem(
        "userCredentials",
        JSON.stringify(updatedCredentials)
      );
      Alert.alert("Success", "Your profile has been updated.");
      navigation.navigate("MyProfileScreen"); // Navigate back to profile screen
    } catch (error) {
      Alert.alert("Error", "There was an issue updating your profile.");
    }
  };

  const openActionSheet = () => {
    const options = ["Cancel", "Upload From Gallery", "Take Photo"];
    if (avatarUri) {
      options.push("View Photo");
    }
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: options,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            pickImage();
          } else if (buttonIndex === 2) {
            takePhoto();
          } else if (buttonIndex === 3 && avatarUri) {
            viewPhoto();
          }
        }
      );
    } else {
      Alert.alert(
        "Choose an option",
        "",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Upload From Gallery", onPress: pickImage },
          { text: "Take Photo", onPress: takePhoto },
          ...(avatarUri ? [{ text: "View Photo", onPress: viewPhoto }] : []),
        ],
        { cancelable: true }
      );
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const viewPhoto = () => {
    setIsModalVisible(true);
  };

  const deletePhoto = () => {
    setAvatarUri(null);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={openActionSheet}
      >
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <Icon name="user" size={50} color="gray" />
        )}
        <Icon
          name="edit"
          size={20}
          color="#007AFF"
          style={styles.avatarEditIcon}
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Image source={{ uri: avatarUri }} style={styles.fullscreenImage} />
            <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
              <Text style={styles.deleteButtonText}>Delete Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 50,
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: "center",
    position: "relative",
    backgroundColor: "white",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  avatarEditIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  goBackButton: {
    backgroundColor: "White",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderColor: "#63CC9B",
    borderWidth: 1,
    alignItems: "center",
    width: "48%",
    marginTop: 30,
  },
  goBackButtonText: {
    color: "White",
    fontSize: 18,
  },
  updateButton: {
    backgroundColor: "#63CC9B",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    width: "48%",
    marginTop: 30,
  },
  updateButtonText: {
    color: "white",
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  fullscreenImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default EditProfile;
