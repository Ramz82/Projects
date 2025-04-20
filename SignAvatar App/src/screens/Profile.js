import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
} from "react-native";

const Profile = ({ navigation }) => {
  const [profileName, setProfileName] = useState("Noah");
  const [profileImage, setProfileImage] = useState(null);

  // Load the profile data from AsyncStorage
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("profileName");
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedName) setProfileName(storedName);
        if (storedImage) setProfileImage(storedImage);
      } catch (error) {
        console.log("Error loading profile data", error);
      }
    };

    const focusListener = navigation.addListener("focus", loadProfileData);
    return () => focusListener.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          {/* Profile Picture and Name */}
          <View style={styles.profileHeader}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profilePicture}
              />
            ) : (
              <Image
                source={require("../Images/pp.jpg")}
                style={styles.profilePicture}
              />
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profileName}</Text>
            </View>
          </View>
          {/* Options */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Image
              source={require("../Images/edit.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("DevicePermission")}
          >
            <Image
              source={require("../Images/dev.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Device Permission</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Image
              source={require("../Images/passw.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Information")}
          >
            <Image
              source={require("../Images/info.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Information</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("WelcomePage")} // Navigate to WelcomePage on Logout
          >
            <Image
              source={require("../Images/lo.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Bottom Footer */}
      <View style={styles.footer}>
        {/* Share Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("SharePage")}>
          <Image
            source={require("../Images/share1.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        {/* Home Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image
            source={require("../Images/home1.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        {/* Settings Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image
            source={require("../Images/settings1.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../Images/Profile1.png")}
            style={{ width: 30, height: 30 }}
          />
          <View style={styles.profileIndicator} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    marginTop: 120,
  },
  content: {
    paddingHorizontal: 20,
    width: "100%",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    height: 60,
  },
  profileIndicator: {
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

export default Profile;
