import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { Link, Stack } from "expo-router";

const otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    // Handle OTP submission logic here
    console.log("OTP Submitted:", otp.join(""));
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "OTP" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Check Your Email</Text>
        <Text>We've sent an OTP to your Email. Please check your SMS.</Text>
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
            />
          ))}
        </View>

        {/* Didn't get SMS */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get SMS?</Text>
          <Link href={"/forgot"} asChild>
            <TouchableOpacity>
              <Text style={styles.sendSpan}>Try again</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.otp}>
          <Link href={"/signin"} asChild>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Verify Now</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

export default otp;

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
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
