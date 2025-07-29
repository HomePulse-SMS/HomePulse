import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import LottieView from 'lottie-react-native';

const HomeScreen = ({ navigation }) => {
  const [pincode, setPincode] = useState('');

  const handleNext = () => {
    if (pincode.length === 6) {
      navigation.navigate('SelectCity', { pincode });
    } else {
      alert('Enter a valid 6-digit pincode');
    }
  };

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <LottieView
            source={{ uri: 'https://lottie.host/145ceeb5-15d8-42a9-91fc-89d278771897/kDj5EY0nvT.lottie' }}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
        />
          <Text style={styles.title}>Enter Your Pincode</Text>
          <TextInput
              style={styles.input}
              placeholder="6-digit Pincode"
              keyboardType="numeric"
              value={pincode}
              onChangeText={setPincode}
              maxLength={6}
              placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 25,
    color: '#333',
  },
  input: {
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 25,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '50%',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
