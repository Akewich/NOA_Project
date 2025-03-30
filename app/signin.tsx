import {
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
import Checkbox from "expo-checkbox";
import axios from "axios";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To manage the loading state
  const [error, setError] = useState(""); // To manage errors
  const [showPassword, setShowPassword] = useState(false); // To manage the visibility of the password

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill the information.");
      return;
    }

    setError(""); // Clear any previous error
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://noaserver-latest.onrender.com/login",
        {
          email,
          password,
        }
      );

      // Handle successful response (you can save the token, navigate, etc.)
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        // Navigate to home screen after successful login
        // For example, you could use `router.push("/(tabs)")`
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Sign-in error:", err);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign In" }} />
      <View style={styles.container}>
        {/* Image */}
        <Image
          style={{ width: 145, height: 110 }}
          source={require("../assets/images/NOA.png")}
        />
        <Text style={styles.title}>Login account</Text>

        {/* Error message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Input fields */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.inputField}
            secureTextEntry={!showPassword} // Toggle password visibility
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxWrapper}>
            <Checkbox
              value={isSelected}
              onValueChange={setIsSelected}
              color={isSelected ? "#4630EB" : undefined}
            />
            <Text style={styles.checkboxText}>Remember me</Text>
          </View>

          {/* Forgot password link */}
          <Link href={"/forgot"} asChild>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Sign in button */}
        <TouchableOpacity
          style={styles.btn}
          onPress={handleSignIn}
          disabled={isLoading} // Disable the button while loading
        >
          <Text style={styles.btnText}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Don't have an account? </Text>
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginSpan}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

export default SignInScreen;

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
    marginBottom: 96,
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
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  btn: {
    backgroundColor: "#000",
    width: 190,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 57,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
  },
});
