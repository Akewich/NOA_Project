import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const Forgot = (props: Props) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Email submitted: ", email);
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Forgot Password" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.instructions}>
          Please enter your Email to receive an OTP for password reset.
        </Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.otp}>
          <Link href={"/otp"} asChild>
            <TouchableOpacity style={styles.btn} onPress={handleForgotPassword}>
              <Text style={styles.btnText}>Send OTP</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  otp: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
});
