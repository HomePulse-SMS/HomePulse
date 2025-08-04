import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

// A simple icon component using Text
const Icon = ({ name, style }) => (
  <Text style={[styles.icon, style]}>{name}</Text>
);

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    if (!email || !password) {
      alert("Error: Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = "http://localhost:8080/authenticate";

      const response = await axios.post(API_URL, {
        email: email,
        password: password,
      });

      const token = response.data.data.jwttoken;

      if (token) {
        // console.log("Login successful, token:", token);
        alert("Login successful, token:", token);
      }
    } catch (error) {
      // console.error("Login Error Object:", JSON.stringify(error, null, 2));
      alert("Login Failed Email or Password is Incorrect");

      // if (error.response) {
      //   const status = error.response.status;
      //   const errorMessage =
      //     error.response.data?.message || JSON.stringify(error.response.data);
      //   alert(`Login Failed (Status: ${status}): ${errorMessage}`);
      // } else if (error.request) {
      //   alert(
      //     "Network Error: Could not connect to the server. Is it running and is the URL correct?"
      //   );
      // } else {
      //   alert(`Error: An unexpected error occurred: ${error.message}`);
      // }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (loading) return;
    setEmail("");
    setPassword("");
  };

  // const handleSignUp = () => {
  //   if (loading) return;
  //   alert("Redirecting to the sign-up page.");
  // };

  const handleForgotPassword = () => {
    if (loading) return;
    alert("Password recovery instructions have been sent to your email.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.loginCard}>
          <Text style={styles.title}>Welcome !</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            {/* <Icon name="📧" /> */}
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <Icon name="🔒" /> */}
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={{ alignSelf: "flex-end", opacity: loading ? 0.5 : 1 }}
            disabled={loading}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledLook]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelButton,
              loading && styles.disabledLook,
            ]}
            onPress={handleCancel}
            disabled={loading}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>

          {/* <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={handleSignUp}
              style={{ opacity: loading ? 0.5 : 1 }}
              disabled={loading}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles for Login Screen
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#e5e7eb" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loginCard: {
    width: "100%",
    maxWidth: 450,
    padding: 32,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: "#4b5563", marginBottom: 24 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  icon: { fontSize: 18, marginRight: 12, color: "#6b7280" },
  input: { flex: 1, height: 48, fontSize: 16, color: "#111827" },
  forgotPasswordText: {
    color: "#3b82f6",
    marginBottom: 24,
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    minHeight: 50,
    justifyContent: "center",
  },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  cancelButtonText: { color: "#374151" },
  disabledLook: { opacity: 0.5 },
  signUpContainer: { flexDirection: "row", marginTop: 24 },
  signUpText: { color: "#4b5563", fontSize: 14 },
  signUpLink: { color: "#3b82f6", fontWeight: "600", fontSize: 14 },
});

export default LoginScreen;
