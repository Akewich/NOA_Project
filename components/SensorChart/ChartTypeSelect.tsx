import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, Button } from "react-native-paper";

interface ChartTypeSelectProps {
  chartType: "line" | "scatter";
  setChartType: (type: "line" | "scatter") => void;
}

const ChartTypeSelect: React.FC<ChartTypeSelectProps> = ({
  chartType,
  setChartType,
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.menuWrapper}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{
              color: "#6A4DF4",
              fontWeight: "bold",
              fontSize: 14,
            }}
            style={{
              borderRadius: 20,
              borderColor: "#ccc",
              borderWidth: 1,
              height: 40,
              justifyContent: "center",
            }}
          >
            {chartType === "line" ? "Line Plot" : "Scatter Plot"}
            <Ionicons
              name="chevron-down"
              size={14}
              color="#6A4DF4"
              style={{ marginLeft: 6 }}
            />
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setChartType("line");
            closeMenu();
          }}
          title="Line Plot"
        />
        <Menu.Item
          onPress={() => {
            setChartType("scatter");
            closeMenu();
          }}
          title="Scatter Plot"
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    alignSelf: "flex-end",
    marginBottom: 10,
    zIndex: 99,
  },
});

export default ChartTypeSelect;
