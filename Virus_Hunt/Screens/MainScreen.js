import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dashboard from './Dashboard';

const MainScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('FILE');
  const [selectedFile, setSelectedFile] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);

  // Load username from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedUserId = await AsyncStorage.getItem("userId");

        if (storedUsername) {
          setUsername(storedUsername);
        }
        if (storedUserId) {
          setUserId(storedUserId);
          console.log("User ID:", storedUserId); // Debugging
        } else {
          console.log("User ID not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (res.canceled) {
        console.log("User cancelled file selection.");
        return;
      }

      const files = res.assets.map((file) => ({
        name: file.name,
        type: file.mimeType,
        size: file.size,
        uri: file.uri,
        date: new Date().toISOString(),
      }));
      
      console.log("Selected Files:", files);
      setSelectedFile(files); // ✅ Store selected files in state
      // Retrieve userId from AsyncStorage
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId); // Update state just in case
      if (!storedUserId) {
        Alert.alert("Error", "User ID not found.");
        return;
        }


      // // Send file metadata to backend
      // await uploadFileDetails(userId, files);
      await uploadFileDetails(storedUserId, files);

    } catch (err) {
      console.error("File picking error:", err);
    }
  };

  const uploadFileDetails = async (userId, files) => {
    try {
      const response = await fetch("http://192.168.10.9:5000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, files }),
      });

      const data = await response.json();
      console.log("Files uploaded:", data);
      Alert.alert("Success", "Files uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload files.");
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="URL, IP address, domain or file hash"
            placeholderTextColor="#999"
            editable={activeTab === 'URL'}
          />
        </View>

        {/* Logo and Title */}
        {activeTab !== 'URL' && (
          <View style={styles.headerContainer}>
            <Image source={require('../assets/Logo.png')} style={styles.logo} />
            <Text style={styles.title}>VIRUS HUNT</Text>
            <Text style={styles.subtitle}>
              Analyse suspicious files, domains, IPs and URLs to detect malware and other breaches, automatically share them with the security community.
            </Text>
          </View>
        )}

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('FILE')}>
            <Text style={[styles.tabText, activeTab === 'FILE' && styles.activeTab]}>FILE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('URL')}>
            <Text style={[styles.tabText, activeTab === 'URL' && styles.activeTab]}>URL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('SEARCH')}>
            <Text style={[styles.tabText, activeTab === 'SEARCH' && styles.activeTab]}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        {/* File Upload Section */}
        {activeTab === 'FILE' && (
          <View style={styles.uploadContainer}>
            <Image source={require('../assets/Scan.png')} style={styles.uploadIcon} />
            <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
              <Text style={styles.uploadButtonText}>Choose file</Text>
            </TouchableOpacity>
            {selectedFile && (
              <Text style={styles.fileText}>
                Selected File: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </Text>
            )}
          </View>
        )}

         {/* Display Uploaded Files */}
         {selectedFile.length > 0 && (
          // <View style={styles.fileList}>
          // <Text style={styles.sectionTitle}>Selected File(s)</Text>
          <View style={styles.selectedFileBox}>
         <Text style={styles.selectedFileText}>Selected File</Text>
          {selectedFile.map((file, index) => (
          <View key={index} style={styles.fileItem}>
          <Image source={{ uri: file.uri }} style={styles.fileImage} />
          <View style={styles.fileDetails}>
            <Text style={styles.fileText}>📁 Name: {file.name}</Text>
            <Text style={styles.fileText}>📄 Type: {file.type}</Text>
            <Text style={styles.fileText}>📅 Date: {new Date(file.date).toLocaleString()}</Text>
            <Text style={styles.fileText}>📦 Size: {(file.size / 1024).toFixed(2)} KB</Text>
          </View>
        </View>
          ))}
          </View>
          )}
        {/* Welcome Message */}
        <Text style={styles.user}>
          Welcome to Virus Hunt {username ? username : ""}
        </Text>
         <TouchableOpacity style={styles.Dashboardbtn} onPress={() => navigation.navigate('Dashboard')}>
              <Text style={styles.DashboardText}>Go to Dashboard</Text>
            </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.Dashboardbtn}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go to Dashboard</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0D0F1C',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 100,
  },
  searchContainer: {
    width: '90%',
    backgroundColor: '#1E2235',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 15,
  },
  searchInput: {
    color: '#FFF',
    fontSize: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6B84DB',
  },
  user: {
    top:180,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B84DB',
    marginTop: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: '#A5A9C4',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  tabText: {
    color: '#A5A9C4',
    fontSize: 16,
    marginHorizontal: 20,
  },
  activeTab: {
    color: '#6B84DB',
    borderBottomWidth: 2,
    borderBottomColor: '#6B84DB',
  },
  uploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  uploadIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#6B84DB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileList: {
    marginTop: 30,
    width: '90%',
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  // fileItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: 5,
  // },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    gap: 10, // optional, if you want spacing between image and text
  },
  fileDetails: {
    flex: 1, // take remaining width
    justifyContent: 'center',
  },
  // fileImage: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 5,
  //   marginRight: 10,
  // },
  fileImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  fileText: {
    color: '#A5A9C4',
    marginBottom: 5,
    paddingHorizontal: 50,
    fontSize: 14,
  },
  Dashboardbtn: {
    bottom: 15,
    backgroundColor: '#6B84DB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  DashboardText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedFileBox: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
    maxWidth: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  selectedFileText: {
    color: '#A5A9C4',
    fontSize: 14,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});

export default MainScreen;
