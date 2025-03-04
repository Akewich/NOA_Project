import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const Loading = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.loader,
          { transform: [{ rotate: rotateInterpolation }] },
        ]}
      >
        <View style={[styles.dot, styles.dot1]} />
        <View style={[styles.dot, styles.dot2]} />
        <View style={[styles.dot, styles.dot3]} />
        <View style={[styles.dot, styles.dot4]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Background overlay
  },
  loader: {
    width: 50,
    height: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dot1: {
    backgroundColor: "#E11462",
    top: 0,
    left: "50%",
    transform: [{ translateX: -5 }],
  },
  dot2: {
    backgroundColor: "#6FCADE",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -5 }],
  },
  dot3: {
    backgroundColor: "#3DB88F",
    right: 0,
    top: "50%",
    transform: [{ translateY: -5 }],
  },
  dot4: {
    backgroundColor: "#E9A920",
    left: 0,
    top: "50%",
    transform: [{ translateY: -5 }],
  },
});

export default Loading;
