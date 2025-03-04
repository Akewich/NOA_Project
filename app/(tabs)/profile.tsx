import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const ProfileScreen = (props: Props) => {
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
        <Ionicons name="person" size={80} />
        {/* Username */}
        <Text style={{ margin: 40, fontSize: 24, fontWeight: "bold" }}>
          Name
        </Text>
      </View>

      {/* Botton to Another Pages */}

      {/* Account Setting */}
      <View>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="person" size={24} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Account Setting</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} />
        </TouchableOpacity>
      </View>
      {/* Theme*/}
      <View>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="moon-outline" size={24} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Theme</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} />
        </TouchableOpacity>
      </View>
      {/* Reset Setting */}
      <View>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="refresh" size={24} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Reset Setting</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} />
        </TouchableOpacity>
      </View>
      {/* Delete Account */}
      <View>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="trash" size={24} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Delete Account</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 35,
  },
  // Header
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
  // Content
  btn: {
    backgroundColor: "#fff",
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 12,
    paddingHorizontal: 20, // Add spacing
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
