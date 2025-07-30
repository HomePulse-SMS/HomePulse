import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform, StatusBar
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("manoj.mehta@example.com");
  const [password, setPassword] = useState("pass123");

  const saveUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('isRegistered', 'true');
      await AsyncStorage.setItem('userData', JSON.stringify(userData)); // optional
    } catch (e) {
      console.error('Error saving registration:', e);
    }
  };

  const handleSignIn = async() => {
      await fetch("http://localhost:8080/users/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(async (res) => {
        const responseData = await res.json();

        if (responseData.status === "Success") {
          console.log(responseData.data);
          let city = responseData.data.societyId.location.city
          let pincode = 556;
          let apartment = responseData.data.societyId.sname
          let flatNumber = responseData.data.room_no

          saveUserData({pincode, city, apartment, flatNumber}).then(r =>navigation.navigate("Dashboard"));
        } else {
          console.log("User not found");
        }
      })
          .catch((error) => console.error("Error:", ));

    };

  return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
        <Text style={styles.title}>Welcome To HomePulse</Text>

        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
        />

        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('SelectState')}
            style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#2c3e50',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#7f8c8d',
  },
  button: {
    backgroundColor: '#e67e22',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#e67e22',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

