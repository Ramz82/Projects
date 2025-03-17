import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

const MainScreen = () => {
  //const [activeTab, setActiveTab] = useState('FILE');
  const [activeTab, setActiveTab] = useState('URL');


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
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Choose file</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer */}
        {/* <View style={styles.footer}>
          <Text style={styles.footerText}>Contact Us</Text>
          <Text style={styles.footerText}>Facebook | Twitter | LinkedIn</Text>
          <Text style={styles.footerText}>Address: 123 Security Lane, Cyber City</Text>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1, // Make sure it takes the full screen height
    backgroundColor: '#0D0F1C',
  },
  container: {
    flexGrow: 1, // Allows content to grow and scroll
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 100, // Ensures footer is visible
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
    alignItems: 'center',
    marginTop: 20,
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
  footer: {
    marginTop: 40,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1E2235',
    width: '100%',
    minHeight: 150, // Ensures the footer is big enough
  },
  footerText: {
    color: '#A5A9C4',
    fontSize: 14,
    marginVertical: 5,
  },
});

export default MainScreen;
