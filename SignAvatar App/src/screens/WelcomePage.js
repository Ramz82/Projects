import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

// Get the screen width and height
const { width, height } = Dimensions.get('window');

function WelcomePage({ navigation }) {
  return (
    <View style={styles.welcomeContainer}>
      <Image source={require('../../assets/avartarWEL.png')} style={styles.logo} />
      <Text style={styles.getStartedText}>Let's Get Started</Text>
      <Text style={styles.oneLineDescription}>Welcome to SignAvatar, your gateway to personalized avatars!</Text>

      <TouchableOpacity 
        style={styles.startButton} 
        onPress={() => navigation.navigate('SignUpPage')} // Navigating to SignUpPage
      >
        <Text style={styles.startButtonText}>Register Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#63CC9B',
    padding: 20,
  },
  logo: {
    width: width * 0.8,  // Image takes 80% of the screen width
    height: height * 0.5, // Image takes 50% of the screen height (half of the screen height)
    marginBottom: 20,
  },
  getStartedText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },
  placeholderText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
  startButton: {
    backgroundColor: 'black', // Set background color of the button to black
    paddingVertical: 25,         // Increase vertical padding to make the button bigger
    paddingHorizontal: 60,       // Increase horizontal padding to make the button wider
    borderRadius: 10,            // Optional: round the button corners
    marginTop: 40,               // Space between this button and the previous element
    width: '75%',                // Button takes 75% of screen width
    alignItems: 'center',        // Center the text horizontally
    justifyContent: 'center',    // Center the text vertically
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  oneLineDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,  // Adjust spacing as needed
  },
});

export default WelcomePage;
