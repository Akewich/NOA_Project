import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
} from "victory-native";
import { Dimensions } from "react-native";

interface Props {
  xData: { x: number; y: number }[];
  yData: { x: number; y: number }[];
  zData: { x: number; y: number }[];
  selectedAxes: { x: boolean; y: boolean; z: boolean };
  chartType: "line" | "scatter";
}

const ChartSection = ({
  xData,
  yData,
  zData,
  selectedAxes,
  chartType,
}: Props) => {
  if (!xData.length) return null;

  const domainX: [number, number] = [xData[0].x, xData[xData.length - 1].x];
  const commonProps = { size: 3 };

  return (
    <VictoryChart
      width={Dimensions.get("window").width - 10}
      height={260}
      padding={{ top: 20, bottom: 40, left: 40, right: 40 }}
      theme={VictoryTheme.material}
      domain={{ x: domainX, y: [-10, 10] }}
    >
      <VictoryAxis
        dependentAxis
        style={{
          axis: { stroke: "#ccc" },
          tickLabels: { fontSize: 10, fill: "#999" },
          grid: { stroke: "#eee", strokeDasharray: "4" },
        }}
      />
      <VictoryAxis
        style={{
          axis: { stroke: "#ccc" },
          tickLabels: { fontSize: 10, fill: "#999" },
          grid: { stroke: "#f0f0f0" },
        }}
        tickFormat={() => ""}
      />

      <VictoryStack>
        {selectedAxes.x &&
          (chartType === "line" ? (
            <VictoryLine
              interpolation="monotoneX"
              data={xData}
              style={{ data: { stroke: "#FF9AA2", strokeWidth: 2 } }}
            />
          ) : (
            <VictoryScatter
              data={xData}
              {...commonProps}
              style={{ data: { fill: "#FF9AA2" } }}
            />
          ))}
        {selectedAxes.y &&
          (chartType === "line" ? (
            <VictoryLine
              interpolation="monotoneX"
              data={yData}
              style={{ data: { stroke: "#9EDFFF", strokeWidth: 2 } }}
            />
          ) : (
            <VictoryScatter
              data={yData}
              {...commonProps}
              style={{ data: { fill: "#9EDFFF" } }}
            />
          ))}
        {selectedAxes.z &&
          (chartType === "line" ? (
            <VictoryLine
              interpolation="monotoneX"
              data={zData}
              style={{ data: { stroke: "#B5EAD7", strokeWidth: 2 } }}
            />
          ) : (
            <VictoryScatter
              data={zData}
              {...commonProps}
              style={{ data: { fill: "#B5EAD7" } }}
            />
          ))}
      </VictoryStack>
    </VictoryChart>
  );
};

export default ChartSection;
