import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRef } from "react";

const SpinningIcon = () => {
  // Create a new animated value for rotation
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Function to handle press in (start spinning)
  const handlePressIn = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000, // Duration of one spin
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };

  // // Function to handle press out (stop spinning)
  const handlePressOut = () => {
    rotateValue.stopAnimation();
    rotateValue.setValue(0);
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1080deg"],
  });

  return (
    <TouchableWithoutFeedback
      onPressOut={handlePressOut}
      onPressIn={handlePressIn}
    >
      <Animated.View
        style={{
          transform: [{ rotate: rotateInterpolate }],
        }}
      >
        <Ionicons
          size={50}
          name="code-slash"
          style={{ textAlign: "center", color: "black" }}
        />
        <Ionicons
          size={100}
          name="code-slash"
          style={{ textAlign: "center", color: "black" }}
        />
        <Ionicons
          size={50}
          name="code-slash"
          style={{ textAlign: "center", color: "black" }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default function SpinnerScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#CCC", dark: "#CCC" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Spinner</ThemedText>
      </ThemedView>
      <Collapsible title="Instructions">
        <ThemedText>Touch and hold the icon below to watch it spin!</ThemedText>
      </Collapsible>
      <ThemedView style={styles.titleContainer}>
        <SpinningIcon />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "navy",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    display: "flex",
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
});
