import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, CheckBox } from "@rneui/themed";
import { Link } from "expo-router";

type Props = {};

const ProfileScreen = () => {
  const [theme, setTheme] = useState("system"); // Tracks the selected theme

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Setting
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} />
        </View>
      </View>
      {/* Content */}

      {/* Picture and Name */}
      <View style={{ flexDirection: "row", alignItems: "center", margin: 20 }}>
        <Avatar
          size={70}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/3.jpg" }}
        />
        <Text style={{ margin: 40, fontSize: 24, fontWeight: "bold" }}>
          Name
        </Text>
      </View>

      {/* Account Setting */}
      <Link href="/(settings)/account" asChild>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="person" size={24} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Account Setting</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} />
        </TouchableOpacity>
      </Link>

      {/* Theme Settings */}
      <View style={{ marginVertical: 20 }}>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 16 }}>
          Theme Settings
        </Text>

        {/* Light Mode */}
        <TouchableOpacity
          style={styles.themeOptionA}
          onPress={() => setTheme("light")}
        >
          <Ionicons name="sunny" size={24} />
          <Text style={styles.themeText}>Light Mode</Text>
          <View
            style={[
              styles.selectedCircle,
              theme === "light" && { backgroundColor: "#000" }, // Green for selected
            ]}
          />
        </TouchableOpacity>

        {/* Dark Mode */}
        <TouchableOpacity
          style={styles.themeOptionB}
          onPress={() => setTheme("dark")}
        >
          <Ionicons name="moon-outline" size={24} />
          <Text style={styles.themeText}>Dark Mode</Text>
          <View
            style={[
              styles.selectedCircle,
              theme === "dark" && { backgroundColor: "#000" }, // Green for selected
            ]}
          />
        </TouchableOpacity>

        {/* System Mode */}
        <TouchableOpacity
          style={styles.themeOptionC}
          onPress={() => setTheme("system")}
        >
          <Ionicons name="settings" size={24} />
          <Text style={styles.themeText}>System Default</Text>
          <View
            style={[
              styles.selectedCircle,
              theme === "system" && { backgroundColor: "#000" }, // Green for selected
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* Reset Setting */}
      <Link href="/(settings)/reset" asChild>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="refresh" size={24} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Reset Setting</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} />
        </TouchableOpacity>
      </Link>

      {/* Delete Account */}
      <Link href="/(settings)/delete" asChild>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="trash" size={24} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Delete Account</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoContainer: {
    flex: 1, // Takes up available space
  },
  iconContainer: {
    alignItems: "flex-end",
  },
  btn: {
    backgroundColor: "#fff",
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 12,
    paddingHorizontal: 20, // Add spacing
  },
  themeOptionA: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginVertical: 2,
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 1,
    paddingHorizontal: 20, // Add spacing
  },
  themeOptionB: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginVertical: 2,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20, // Add spacing
  },
  themeOptionC: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginVertical: 2,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20, // Add spacing
  },
  themeText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    marginLeft: 20, // Add spacing
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "#000", // Border color for all circles
    borderWidth: 2,
    marginLeft: 10,
  },
  btnTextContainer: {
    flex: 1, // Makes text take remaining space
    marginLeft: 20, // Moves text to the left
  },
  btnText: {
    color: "#000",
    fontSize: 15,
  },
});
