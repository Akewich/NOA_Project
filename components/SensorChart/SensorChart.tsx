import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import AxisSelector from "./AxisSelector";
import ChartTypeSelect from "./ChartTypeSelect";
import ChartSection from "./ChartSection";
import SensorDataTable from "./SensorDataTable";
import DeviceDate from "./DeviceDate";

type Axis = "x" | "y" | "z";
type ChartType = "line" | "scatter";

interface Props {
  sensorKey: keyof SensorReading["x"]; // เช่น "acceleration"
  title: string; // ชื่อ chart เช่น ACCELERATION
  unitLabel?: string; // เช่น (G)
}

interface SensorReading {
  x: { [key: string]: number };
  y: { [key: string]: number };
  z: { [key: string]: number };
  datetime: string;
}

const SensorChart = ({ sensorKey, title, unitLabel = "" }: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [chartType, setChartType] = useState<ChartType>("line");
  const [selectedAxes, setSelectedAxes] = useState({
    x: true,
    y: true,
    z: true,
  });
  const [xData, setXData] = useState<{ x: number; y: number }[]>([]);
  const [yData, setYData] = useState<{ x: number; y: number }[]>([]);
  const [zData, setZData] = useState<{ x: number; y: number }[]>([]);
  const [historyData, setHistoryData] = useState<
    { x: number; y: number; z: number }[]
  >([]);

  // === Mock Data ===
  const mockRawData: SensorReading[] = Array.from({ length: 20 }, (_, i) => {
    const timestamp = Date.now() + i * 1000;
    return {
      datetime: new Date(timestamp).toISOString(),
      x: {
        acceleration: Math.random() * 10 - 5,
        velocityangular: Math.random() * 10 - 5,
        vibrationspeed: Math.random() * 10 - 5,
        vibrationangle: Math.random() * 10 - 5,
        vibrationdisplacement: Math.random() * 10 - 5,
        frequency: Math.random() * 10 - 5,
      },
      y: {
        acceleration: Math.random() * 10 - 5,
        velocityangular: Math.random() * 10 - 5,
        vibrationspeed: Math.random() * 10 - 5,
        vibrationangle: Math.random() * 10 - 5,
        vibrationdisplacement: Math.random() * 10 - 5,
        frequency: Math.random() * 10 - 5,
      },
      z: {
        acceleration: Math.random() * 10 - 5,
        velocityangular: Math.random() * 10 - 5,
        vibrationspeed: Math.random() * 10 - 5,
        vibrationangle: Math.random() * 10 - 5,
        vibrationdisplacement: Math.random() * 10 - 5,
        frequency: Math.random() * 10 - 5,
      },
    };
  });

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= mockRawData.length) {
        clearInterval(interval);
        return;
      }

      const d = mockRawData[index];
      const time = new Date(d.datetime).getTime();
      setXData((prev) => [...prev.slice(-19), { x: time, y: d.x[sensorKey] }]);
      setYData((prev) => [...prev.slice(-19), { x: time, y: d.y[sensorKey] }]);
      setZData((prev) => [...prev.slice(-19), { x: time, y: d.z[sensorKey] }]);
      setHistoryData((prev) => [
        { x: d.x[sensorKey], y: d.y[sensorKey], z: d.z[sensorKey] },
        ...prev.slice(0, 9),
      ]);
      index++;
    }, 1000);

    return () => clearInterval(interval);
  }, [sensorKey]);

  return (
    <View style={styles.container}>
      <DeviceDate />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>
          {title.toUpperCase()}: {chartType.toUpperCase()} PLOT
        </Text>
        <ChartTypeSelect chartType={chartType} setChartType={setChartType} />
      </View>
      <ChartSection
        xData={xData}
        yData={yData}
        zData={zData}
        chartType={chartType}
        selectedAxes={selectedAxes}
      />
      <AxisSelector
        selectedAxes={selectedAxes}
        setSelectedAxes={setSelectedAxes}
      />
      <SensorDataTable data={historyData} title={title} unitLabel={unitLabel} />
    </View>
  );
};

export default SensorChart;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: 40,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 8,
    },
  });
