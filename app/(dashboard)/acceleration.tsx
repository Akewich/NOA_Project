import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { useTheme } from "@/context/ThemeContext";

import { PaperProvider } from "react-native-paper";
import SensorChart from "@/components/SensorChart/SensorChart";

// === Component ===
const AccelerationScreen = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <SensorChart
          sensorKey="acceleration"
          title="ACCELERATION"
          unitLabel="(G)"
        />
      </View>
    </PaperProvider>
  );
};

export default AccelerationScreen;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
    },
    chartTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 8,
    },
  });
