import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/NOA.png")}
          />
          <Text style={styles.title}>Home</Text>
        </View>
        {/* Notification Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} />
        </View>
      </View>

      {/* Flatlist of function */}
      <View style={styles.blockContainer}>
        <View style={styles.block}>
          <Text>Block 1</Text>
        </View>
        <View style={styles.block}>
          <Text>Block 2</Text>
        </View>
        <View style={styles.block}>
          <Text>Block 3</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.deviceContainer}>
        <View style={styles.device}>
          <Text>Device 1</Text>
        </View>
        <View style={styles.device}>
          <Text>Device 2</Text>
        </View>
        <View style={styles.device}>
          <Text>Device 3</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 35,
  },
  // Header Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Takes up available space
  },
  logo: {
    width: 37,
    height: 28,
  },
  title: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: "bold",
  },
  iconContainer: {
    alignItems: "flex-end",
  },
  // Block Styles
  blockContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    gap: 15, // Adds spacing between blocks
  },
  block: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  // Device Styles
  deviceContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 20, // Adds spacing between device blocks
    paddingBottom: 20, // Prevents last block from being cut off
  },
  device: {
    width: 342,
    height: 275,
    backgroundColor: "#fff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15, // Ensures spacing between device blocks
  },
});
