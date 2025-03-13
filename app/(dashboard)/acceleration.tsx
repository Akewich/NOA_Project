import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLegend,
} from "victory-native";

const generateMockData = () => {
  const xData = [];
  const yData = [];
  const zData = [];

  for (let i = 8; i <= 13; i += 0.2) {
    xData.push({ x: i, y: Math.random() * 10 - 5 });
    yData.push({ x: i, y: Math.random() * 10 - 5 });
    zData.push({ x: i, y: Math.random() * 10 - 5 });
  }

  return { xData, yData, zData };
};

const AccelerationScreen = () => {
  const [data, setData] = useState(generateMockData());

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Name :10×80C</Text>

      <View style={styles.chartContainer}>
        <VictoryChart
          width={Dimensions.get("window").width - 40}
          height={250}
          theme={VictoryTheme.material}
          domain={{ y: [-10, 10] }}
        >
          <VictoryAxis
            tickFormat={(t) => `${t} AM`}
            tickValues={[8, 9, 10, 11, 12, 13]}
            style={{ tickLabels: { fontSize: 10 } }}
          />
          <VictoryAxis
            dependentAxis
            tickValues={[-10, -5, 0, 5, 10]}
            style={{ tickLabels: { fontSize: 10 } }}
          />
          <VictoryScatter
            data={data.xData}
            size={3}
            style={{ data: { fill: "#FF9AA2" } }}
          />
          <VictoryScatter
            data={data.yData}
            size={3}
            style={{ data: { fill: "#9EDFFF" } }}
          />
          <VictoryScatter
            data={data.zData}
            size={3}
            style={{ data: { fill: "#B5EAD7" } }}
          />
          <VictoryLegend
            x={Dimensions.get("window").width - 200}
            y={20}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: "X", symbol: { fill: "#FF9AA2" } },
              { name: "Y", symbol: { fill: "#9EDFFF" } },
              { name: "Z", symbol: { fill: "#B5EAD7" } },
            ]}
          />
        </VictoryChart>
      </View>

      <View style={styles.valueContainer}>
        <View style={styles.valueCard}>
          <View style={[styles.axisDot, { backgroundColor: "#FF9AA2" }]}>
            <Text>X</Text>
          </View>
          <Text style={styles.value}>12.125</Text>
        </View>
        <View style={styles.valueCard}>
          <View style={[styles.axisDot, { backgroundColor: "#9EDFFF" }]}>
            <Text>Y</Text>
          </View>
          <Text style={styles.value}>12.125</Text>
        </View>
        <View style={styles.valueCard}>
          <View style={[styles.axisDot, { backgroundColor: "#B5EAD7" }]}>
            <Text>Z</Text>
          </View>
          <Text style={styles.value}>12.125</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: "#F5F7FF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,

    marginBottom: 20,
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  valueCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    width: "30%",
  },
  axisDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccelerationScreen;
