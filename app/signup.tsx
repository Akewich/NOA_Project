import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const SignUpScreen = (props: Props) => {
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign Up" }} />
      <View style={styles.container}>
        <Image
          style={{ width: 145, height: 110 }}
          source={require("../assets/images/NOA.png")}
        />
        <Text style={styles.title}>Create an account</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput placeholder="Email" style={styles.inputField} />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.inputField}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            style={styles.inputField}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href={"/signin"}>
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
    flex: 1, // Makes the input field take remaining space
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
    flexDirection: "row", // Make elements inline
    justifyContent: "center", // Center them horizontally
    alignItems: "center", // Align vertically
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
});
