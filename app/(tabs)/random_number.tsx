import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Animated,
  Easing,
  Pressable,
  TextInput,
  Text,
  View,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRef, useState } from "react";

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
      headerBackgroundColor={{ light: "white", dark: "white" }}
      headerImage={
        <ThemedView
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#EEE",
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
        </Collapsible>
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText style={{ marginRight: 10 }}>Range: Zero to</ThemedText>
        <TextInput
          editable={!isSpinning}
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="100"
          onChangeText={(text) =>
            setMaxRange(text.length > 0 ? parseInt(text) : 0)
          }
          value={maxRange.toString()}
        />
      </ThemedView>

      <ThemedView style={styles.rollContainer}>
        <Pressable onPress={() => generateNumber()}>
          <ThemedView style={{ backgroundColor: "inherit" }}>
            <ThemedView
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#CCC",
              }}
            >
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
            </ThemedView>
            <ThemedText style={styles.roll}>Roll!</ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>
          {!isSpinning && spinCount > 0 ? randomNumber : "..."}
        </Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {},
  rollContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "#CCC",
    shadowOffset: { width: 4, height: 4 },
  },
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    width: 50,
    padding: 4,
  },
  roll: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: "black",
    backgroundColor: "inherit",
  },
  numberContainer: {
    width: "100%",
    height: 100,
    padding: 0,
    margin: 0,
    backgroundColor: "navy",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    padding: 0,
    margin: 0,
    color: "white",
    fontSize: 48,
  },
});
