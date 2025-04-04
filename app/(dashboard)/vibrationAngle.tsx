import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { PaperProvider } from "react-native-paper";
import SensorChart from "@/components/SensorChart/SensorChart";

const VibrationAngleScreen = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <SensorChart
          sensorKey="vibrationangle"
          title="VIBRATION ANGLE"
          unitLabel="(G)"
        />
      </View>
    </PaperProvider>
  );
};

export default VibrationAngleScreen;

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
