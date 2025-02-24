import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

type Props = {};

const SignInScreen = (props: Props) => {
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign In" }} />
      <View style={styles.container}>
        {/* Images */}
        <Image
          style={{ width: 145, height: 110 }}
          source={require("../assets/images/NOA.png")}
        />
        <Text style={styles.title}>Login account</Text>

        {/* Input fields */}
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

          {/* Forgot */}
          <Link href={"/forgot"} asChild>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Sign in button */}
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign up */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Don't have an account? </Text>
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginSpan}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Go to app home screen */}
        <TouchableOpacity
          onPress={() => {
            router.dismissAll();
            router.push("/(tabs)");
          }}
        >
          <Text>Go to App Home Screen</Text>
        </TouchableOpacity>
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
    marginTop: 57,
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
    marginLeft: 8, // Adds some space between checkbox and text
    fontSize: 16, // You can adjust the font size to match the design
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});
