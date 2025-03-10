import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { Link } from "expo-router";
import { useTheme, ThemeMode } from "../../context/ThemeContext";

type Props = {};

const SettingScreen = () => {
  const { colors, mode, setMode } = useTheme();

  // Create dynamic styles using useMemo to prevent recalculation on every render
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.headerText}>Setting</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} color={colors.icon} />
        </View>
      </View>
      {/* Content */}

      {/* Picture and Name */}
      <View style={styles.profileContainer}>
        <Avatar
          size={70}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/3.jpg" }}
        />
        <Text style={styles.nameText}>Name</Text>
      </View>

      {/* Account Setting */}
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <Link href="/(settings)/account" asChild>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="person" size={24} color={colors.icon} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Account Setting</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.icon} />
        </TouchableOpacity>
      </Link>

      {/* Theme Settings */}
      <View style={styles.themeSection}>
        <Text style={styles.sectionTitle}>Theme Settings</Text>

        {/* Light Mode */}
        <TouchableOpacity
          style={styles.themeOptionA}
          onPress={() => setMode("light")}
        >
          <Ionicons name="sunny" size={24} color={colors.icon} />
          <Text style={styles.themeText}>Light Mode</Text>
          <View
            style={[
              styles.selectedCircle,
              mode === "light" && { backgroundColor: colors.selectedIcon },
            ]}
          />
        </TouchableOpacity>

        {/* Dark Mode */}
        <TouchableOpacity
          style={styles.themeOptionB}
          onPress={() => setMode("dark")}
        >
          <Ionicons name="moon-outline" size={24} color={colors.icon} />
          <Text style={styles.themeText}>Dark Mode</Text>
          <View
            style={[
              styles.selectedCircle,
              mode === "dark" && { backgroundColor: colors.selectedIcon },
            ]}
          />
        </TouchableOpacity>

        {/* System Mode */}
        <TouchableOpacity
          style={styles.themeOptionC}
          onPress={() => setMode("system")}
        >
          <Ionicons name="settings" size={24} color={colors.icon} />
          <Text style={styles.themeText}>System Default</Text>
          <View
            style={[
              styles.selectedCircle,
              mode === "system" && { backgroundColor: colors.selectedIcon },
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* Reset Setting */}
      <Text style={styles.sectionTitle}>Others</Text>
      <Link href="/(settings)/reset" asChild>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="refresh" size={24} color={colors.icon} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Reset Setting</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.icon} />
        </TouchableOpacity>
      </Link>

      {/* Delete Account */}
      <Link href="/(settings)/delete" asChild>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="trash" size={24} color={colors.icon} />
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>Delete Account</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.icon} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

// Create a function that returns StyleSheet with colors as parameter
const createStyles = (colors: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.text,
    },
    logoContainer: {
      flex: 1, // Takes up available space
    },
    iconContainer: {
      alignItems: "flex-end",
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      margin: 20,
    },
    nameText: {
      margin: 40,
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    btn: {
      backgroundColor: colors.card,
      width: "100%",
      height: 55,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 10,
      marginTop: 12,
      paddingHorizontal: 20,
      // borderColor: colors.border,
      // borderWidth: 1,
    },
    themeSection: {
      marginVertical: 20,
    },
    themeOptionA: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      marginVertical: 2,
      backgroundColor: colors.card,
      borderBottomLeftRadius: 1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 1,
      paddingHorizontal: 20,
      // borderColor: colors.border,
      // borderWidth: 1,
    },
    themeOptionB: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      marginVertical: 2,
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      // borderColor: colors.border,
      // borderWidth: 1,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    themeOptionC: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      marginVertical: 2,
      backgroundColor: colors.card,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingHorizontal: 20,
      // borderColor: colors.border,
      // borderWidth: 1,
    },
    themeText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
      marginLeft: 20,
    },
    selectedCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderColor: colors.text,
      borderWidth: 2,
      marginLeft: 10,
    },
    btnTextContainer: {
      flex: 1, // Makes text take remaining space
      marginLeft: 20, // Moves text to the left
    },
    btnText: {
      color: colors.text,
      fontSize: 15,
    },
    sectionTitle: {
      marginBottom: 10,
      fontWeight: "bold",
      fontSize: 16,
      color: colors.text,
    },
  });
};

export default SettingScreen;
