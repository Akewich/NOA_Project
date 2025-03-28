import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
const data = [
  { category: "Acceleration", values: { X: 28.356, Y: 16.258, Z: 16.935 } },
  { category: "VelocityAngul", values: { X: 23.586, Y: 24.986, Z: 30.525 } },
  { category: "VibrationSpd", values: { X: 10.562, Y: 25.658, Z: 40.895 } },
  { category: "VibrationAngle", values: { X: 10.562, Y: 25.658, Z: 40.895 } },
  {
    category: "Vibration Dis",
    values: { X: 10.562, Y: 25.658, Z: 40.895 },
  },
  { category: "Frequency", values: { X: 10.562, Y: 25.658, Z: 40.895 } },
];

const DashboardScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();

  // usefont
  const [fontLoaded] = useFonts({
    Koulen: require("../../assets/fonts/Koulen-Regular.ttf"),
  });
  // font loader
  if (!fontLoaded) {
    return <Text>Loading...</Text>; // Or a custom loader/spinner
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Back Button */}
      {/* <View style={styles.header}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color={colors.icon}
          onPress={() => router.back()}
        />
        <Text style={styles.headerText}>Dashboard</Text>
      </View> */}

      {/* Data Sections */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.section}>
            {/* <Text style={styles.category}>{item.category}</Text> */}
            <View style={styles.dataRow}>
              {Object.entries(item.values).map(([key, value]) => (
                <View key={key} style={styles.dataCard}>
                  <Text style={styles.axis}>
                    {/* axis and catagory  */}
                    {key} - {item.category}
                  </Text>
                  <Text style={styles.value}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: "Koulen",
  },
  section: {
    marginBottom: 40,
  },
  category: {
    fontSize: 16,
    fontFamily: "Koulen",
    textAlign: "center",
    marginBottom: 5,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dataCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 7,
    alignItems: "center",
    width: wp("25%"),
    height: hp("8%"),
    justifyContent: "space-between",
  },
  axis: {
    fontSize: 9,
    fontWeight: "600",
    fontFamily: "Koulen",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "flex-end",
    fontFamily: "Koulen",
  },
  listContent: {
    paddingBottom: 20,
  },
});
