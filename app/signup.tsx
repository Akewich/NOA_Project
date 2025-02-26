import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "https://noaserver-latest.onrender.com/register",
        {
          email,
          password,
        }
      );

      // Handle successful registration
      Alert.alert("Success", "Account created successfully!", [
        {
          text: "Verify your email",
          onPress: () => router.push("/otp"),
        },
      ]);
    } catch (error) {
      // Handle errors
      const errorMessage =
        (error as any).response?.data?.message ||
        "Registration failed. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign Up" }} />
      <View style={styles.container}>
        <Image
          style={{ width: 145, height: 110 }}
          source={require("../assets/images/NOA.png")}
        />
        <Text style={styles.title}>Create an account</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.inputField}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} style={styles.icon} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            style={styles.inputField}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} style={styles.icon} />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            style={styles.inputField}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={styles.btnText}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/signin">
            <Text style={styles.loginSpan}>Sign In</Text>
          </Link>
        </View>
      </View>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 33,
    marginBottom: 75,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    width: 320,
    marginBottom: 20,
    paddingBottom: 1,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#000",
    width: 190,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 78,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  loginText: {
    fontSize: 14,
    color: "#000",
  },
  loginSpan: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
