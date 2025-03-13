import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
type Props = {};

const HomeScreen = (props: Props) => {
  const { colors, mode, setMode } = useTheme();

  // Create dynamic styles using useMemo to prevent recalculation on every render
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/NOA.png")}
          />
        </View>
        {/* Notification Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} />
        </View>
      </View>

      {/* Flatlist of function */}
      <Text style={[styles.title, { marginTop: 30, fontWeight: "bold" }]}>
        Device the most used
      </Text>
      <Text style={[styles.title, { fontSize: 12 }]}>
        This is your most used device
      </Text>
      <View style={styles.blockContainer}>
        <View style={styles.block}>
          <Text>Block 1</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.deviceContainer}>
        <Link href={"/(dashboard)"} asChild>
          <TouchableOpacity>
            <View style={styles.device}>
              <Text>Device 1</Text>
            </View>
          </TouchableOpacity>
        </Link>
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

const createStyles = (colors: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
      backgroundColor: colors.background,
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
      fontSize: 14,

      color: colors.text,
    },
    iconContainer: {
      alignItems: "flex-end",
    },
    // Block Styles
    blockContainer: {
      // flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      gap: 15, // Adds spacing between blocks
    },
    block: {
      width: "100%",
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
      width: "100%",
      height: 275,
      backgroundColor: "#fff",
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15, // Ensures spacing between device blocks
    },
  });
};
