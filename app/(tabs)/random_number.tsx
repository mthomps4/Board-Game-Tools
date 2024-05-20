import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet, Animated, Easing, Pressable } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export default function RandomNumberScreen() {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [maxRange, setMaxRange] = useState<number>(100);
  const [spinCount, setSpinCount] = useState<number>(0);

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

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1080deg"],
  });

  const generateNumber = () => {
    setIsSpinning(true);
    setSpinCount(spinCount + 1);
    handlePressIn();
    setTimeout(() => {
      setRandomNumber(Math.floor(Math.random() * maxRange));
      setIsSpinning(false);
      rotateValue.stopAnimation();
      rotateValue.setValue(0);
    }, 1000);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#CCC", dark: "#CCC" }}
      headerImage={
        <ThemedView
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#ccc",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Ionicons size={250} name="cube-outline" />
          <Ionicons size={200} name="cube-outline" />
          <Ionicons size={310} name="cube-outline" />
          <Ionicons size={100} name="cube-outline" />
          <Ionicons size={50} name="cube-outline" />
        </ThemedView>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Random Number Generator</ThemedText>
        <Collapsible title="Instructions">
          <ThemedText>Set a max number (default 100).</ThemedText>
          <ThemedText>Click the button to see you random number.</ThemedText>
          <ThemedText>Update and spin again.</ThemedText>
        </Collapsible>
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText>
          Range: Zero to{" "}
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) =>
              setMaxRange(text.length > 0 ? parseInt(text) : 0)
            }
            value={maxRange.toString()}
          />
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <Pressable onPress={() => generateNumber()}>
          <ThemedView>
            <ThemedView style={{ display: "flex", flexDirection: "row" }}>
              <Animated.View
                style={{
                  transform: [{ rotate: spin }],
                }}
              >
                <Ionicons
                  size={50}
                  name="cube-outline"
                  style={{ textAlign: "center", color: "black" }}
                />
              </Animated.View>
              <Animated.View
                style={{
                  transform: [{ rotate: spin }],
                }}
              >
                <Ionicons
                  size={100}
                  name="cube-outline"
                  style={{ textAlign: "center", color: "black" }}
                />
              </Animated.View>
              <Animated.View
                style={{
                  transform: [{ rotate: spin }],
                }}
              >
                <Ionicons
                  size={50}
                  name="cube-outline"
                  style={{ textAlign: "center", color: "black" }}
                />
              </Animated.View>
            </ThemedView>
            <ThemedText style={styles.roll}>Roll!</ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.numberContainer}>
        {!isSpinning && spinCount > 0 ? (
          <ThemedText style={styles.number}>{randomNumber}</ThemedText>
        ) : null}
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
  titleContainer: {},
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  roll: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: "black",
  },
  numberContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    margin: 10,
    width: 200,
    height: 200,
    color: "#FFF",
    backgroundColor: "purple",
  },
});
