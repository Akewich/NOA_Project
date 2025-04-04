import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "@/context/ThemeContext";

import Device from "../../assets/images/cable.svg";
const DeviceDate = () => {
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  // === Theme ===
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const date = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setDateStr(date);
      setTimeStr(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.infoCard}>
        <View>
          {/* <Text style={styles.infoLabel}>CURRENT DATE & TIME</Text> */}
          <Text style={styles.infoDate}>{dateStr}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={styles.infoTime}>{timeStr}</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={[styles.deviceName, { color: "gray" }]}>from</Text>
              <Text style={styles.deviceName}>VIB01</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.statusRow}>
            <Device width={30} height={30} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeviceDate;

const createStyles = (colors: any) =>
  StyleSheet.create({
    infoCard: {
      flexDirection: "row",
      backgroundColor: colors.block,
      padding: 15,
      height: 60,
      width: 238,
      marginVertical: hp("2%"),
      marginBottom: 19,
      borderRadius: 12,
      justifyContent: "space-around",
      alignItems: "center",
    },
    infoLabel: {
      color: "#a0a0a0",
      fontSize: 16,
      fontFamily: "Koulen",
    },
    infoDate: {
      color: colors.revertText,
      fontSize: 25,
      fontFamily: "Koulen",
    },
    infoTime: {
      color: "gray",
      fontSize: 12,
      fontFamily: "Koulen",
    },
    divider: {
      height: "100%",
      width: 2,
      backgroundColor: "#444",
      marginHorizontal: 12,
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    statusDot: {
      width: 8,
      height: 8,
      backgroundColor: "#4CAF50",
      borderRadius: 4,
      marginRight: 5,
    },
    statusText: {
      color: "#bbb",
      fontSize: 14,
      fontFamily: "Koulen",
    },
    deviceLabel: {
      color: "#fff",
      fontSize: 30,
      fontFamily: "Koulen",
    },
    deviceName: {
      color: "#4CAF50",
      fontSize: 12,
      fontFamily: "Koulen",
    },
  });
