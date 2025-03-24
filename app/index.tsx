import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import axios from "axios";
import { useAuth, useSession, useSSO, useUser } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import type { SetActive } from "@clerk/types";
import { useFonts } from "expo-font";

// Define the OAuth strategies
enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
}

const SignInScreen = () => {
  useWarmUpBrowser();

  const { isSignedIn } = useAuth(); // Check if user is signed in
  const { user } = useUser(); // Get user details

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To manage the loading state
  const [error, setError] = useState(""); // To manage errors
  const [showPassword, setShowPassword] = useState(false); // To manage the visibility of the password

  const { startSSOFlow } = useSSO();

  // font
  const [fontLoaded] = useFonts({
    Koulen: require("../assets/fonts/Koulen-Regular.ttf"),
  });
  // font loader
  if (!fontLoaded) {
    return <Text>Loading...</Text>; // Or a custom loader/spinner
  }

  // Use font loading hook

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        // Check for user token from your custom authentication
        const userToken = await SecureStore.getItemAsync("user_token");

        if (userToken) {
          console.log("Found existing user token");
          // Redirect to home page if token exists
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    // Only run this check if the user is not already signed in
    if (!isSignedIn) {
      checkExistingSession();
    }
  }, [isSignedIn]);

  const onSelectAuth = useCallback(
    async (strategy: Strategy) => {
      const retryDelay = 30000; // 30 seconds delay before retry
      let retries = 3; // Number of retries

      while (retries > 0) {
        try {
          // Start the SSO process by calling `startSSOFlow()`
          const { createdSessionId, setActive, signIn, signUp } =
            await startSSOFlow({
              strategy,
              redirectUrl: AuthSession.makeRedirectUri(),
            });

          // If sign-in was successful, set the active session
          if (createdSessionId) {
            // Save session ID to SecureStore for persistence
            await SecureStore.setItemAsync("clerk_session", createdSessionId);
            setActive!({ session: createdSessionId });

            // Navigate to home screen
            router.push("/(tabs)/home");
            break; // Exit loop on success
          } else {
            // If `createdSessionId` is missing, handle MFA or other steps
            if (signIn || signUp) {
              // Prompt for sign-in or sign-up steps if required
              console.log("MFA or other steps required.");
              // Handle MFA or further authentication steps
            }
          }
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.status === 429) {
            // Too many requests error
            console.error("Too many requests. Retrying...");
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            retries -= 1; // Decrement retry count
          } else {
            // Handle other errors
            console.error("SSO error", JSON.stringify(err, null, 2));
            break; // Exit loop on non-rate-limit error
          }
        }
      }
    },
    [startSSOFlow]
  );
  useEffect(() => {
    const checkClerkSession = async () => {
      // If the user is already signed in with Clerk, redirect to home
      if (isSignedIn) {
        router.replace("/(tabs)/home");
      }
    };

    checkClerkSession();
  }, [isSignedIn]);

  // handleSignIn function
  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill the information.");
      return;
    }

    setError(""); // Clear any previous error
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        // "https://noaserver-latest.onrender.com/login",
        "http://10.0.2.2:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Save the token only if "Remember Me" is selected
        // if (isSelected) {
        //   await SecureStore.setItemAsync("user_token", data.token);
        // }

        // Navigate to home screen after successful login
        router.push("/(tabs)/home");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
        <View>
          <Image
            style={styles.logo}
            source={require("../assets/images/NOA.png")}
          />
        </View>
        {/* <Text style={styles.title}>Login account</Text> */}

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

        {/* Seperate view */}
        <View style={styles.seperatorView}>
          <View
            style={{
              flex: 1,
              borderBottomColor: "#000",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Text style={styles.seperator}>OR</Text>
          <View
            style={{
              flex: 1,
              borderBottomColor: "#000",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>

        {/* Social login buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => onSelectAuth(Strategy.Google)}
            // onPress={() => onSelectAuth(Strategy.Google)}
          >
            <Image source={require("../assets/images/google 1.png")} />
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => onSelectAuth(Strategy.Facebook)}
          >
            <Image source={require("../assets/images/facebook.png")} />
            <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Sign up link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Don't have an account? </Text>
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginSpan}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <Link href={"/home"} asChild>
          <TouchableOpacity>
            <Text style={styles.loginSpan}>Go to home เลย</Text>
          </TouchableOpacity>
        </Link>
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
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  logo: {
    width: 145,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    width: "100%",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    color: "#888",
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
    fontFamily: "Koulen",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  btn: {
    backgroundColor: "#40C375",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Koulen",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Koulen",
  },
  loginSpan: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Koulen",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#888",
    fontFamily: "Koulen",
  },
  seperatorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 30,
  },
  seperator: {
    color: "#gray",
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#888",
    fontFamily: "Koulen",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "Koulen",
  },
  btnOutline: {
    backgroundColor: "#000",
    borderWidth: 1,
    height: 50,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: "Koulen",
  },
  socialButtonsContainer: {
    width: "100%",
    gap: 20,
  },
});
