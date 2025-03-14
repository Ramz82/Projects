import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
} from "react-native";

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>
          {/* Add your settings content here */}
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>App Language</Text>
            <Text style={styles.selectedLanguage}>English</Text>
            <Image
              source={require("../Images/arrow.png")}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Feedback")}
          >
            <Text style={styles.optionText}>Feedback</Text>
            <Image
              source={require("../Images/arrow.png")}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("TermsOfService")}
          >
            <Text style={styles.optionText}>Terms of Service</Text>
            <Image
              source={require("../Images/arrow.png")}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <View style={[styles.option, styles.notificationOption]}>
            <Text style={styles.optionText}>Notifications</Text>
            <Switch />
          </View>
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
          <View
            style={{
              position: "absolute",
              bottom: -5,
              left: "50%",
              marginLeft: -3,
              backgroundColor: "#63CC9B",
              width: 6,
              height: 6,
              borderRadius: 3,
            }}
          />
        </TouchableOpacity>
        {/* Profile Icon */}
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
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    marginTop: 90,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
  },
  selectedLanguage: {
    color: "#63CC9B",
    marginRight: 5,
  },
  arrowIcon: {
    width: 12,
    height: 12,
    tintColor: "#63CC9B",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 20,
  },
  notificationOption: {
    justifyContent: "flex-start",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1, // Added light border line
    borderTopColor: "#ddd", // Added light border line color
    height: 60,
  },
});

export default Settings;
