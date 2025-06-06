import React from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";

type Axis = "x" | "y" | "z";

interface Props {
  selectedAxes: { x: boolean; y: boolean; z: boolean };
  setSelectedAxes: React.Dispatch<
    React.SetStateAction<{ x: boolean; y: boolean; z: boolean }>
  >;
}

const AxisSelector = ({ selectedAxes, setSelectedAxes }: Props) => {
  const toggleAxis = (axis: Axis) => {
    setSelectedAxes((prev) => ({ ...prev, [axis]: !prev[axis] }));
  };

  return (
    <View style={styles.container}>
      {(["x", "y", "z"] as Axis[]).map((axis) => (
        <CheckBox
          key={axis}
          title={axis.toUpperCase()}
          checked={selectedAxes[axis]}
          onPress={() => toggleAxis(axis)}
          size={30}
          checkedColor="#000"
          containerStyle={styles.checkbox}
          textStyle={{ fontWeight: "bold", fontSize: 20 }}
        />
      ))}
    </View>
  );
};

export default AxisSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: "#fff",
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 0,
  },
});
