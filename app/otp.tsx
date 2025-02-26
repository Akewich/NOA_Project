import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { Link, Stack, useLocalSearchParams, router } from "expo-router";
import axios from "axios";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);
  const params = useLocalSearchParams();
  const email = (params.email as string) || "your email";

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    // Validate OTP is complete
    if (otpCode.length !== 4) {
      Alert.alert("Error", "Please enter the complete 4-digit code");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "https://your-api-endpoint.com/auth/verify-otp",
        {
          email: email,
          otp: otpCode,
        }
      );

      // Handle successful verification
      Alert.alert("Success", "Email verified successfully!", [
        {
          text: "Continue",
          onPress: () => router.push("/signin"),
        },
      ]);
    } catch (error) {
      // Handle errors
      let errorMessage = "Verification failed. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          errorMessage = "Invalid OTP code";
        } else if (error.response?.status === 404) {
          errorMessage = "Email not found";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      await axios.post("https://your-api-endpoint.com/auth/resend-otp", {
        email: email,
      });

      Alert.alert(
        "Success",
        "A new verification code has been sent to your email"
      );

      // Clear current OTP inputs
      setOtp(["", "", "", ""]);
      // Focus on first input
      inputs.current[0]?.focus();
    } catch (error) {
      let errorMessage = "Failed to resend code. Please try again.";

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "OTP" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent an OTP to {email}. Please enter the code below.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.input}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Didn't get email */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get the code?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.sendSpan}>Resend code</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.otp}>
          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleVerify}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading ? "Verifying..." : "Verify Now"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "80%",
  },
  input: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    textAlign: "center",
    width: "20%",
    fontSize: 18,
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
  },
  sendSpan: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 5,
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
    marginBottom: 20,
  },
  btnDisabled: {
    backgroundColor: "#666",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
