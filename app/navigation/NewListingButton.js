import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function NewListingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="dog" color="white" size={24} />
      </View>
      <Text style={styles.text}>My dogs</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    height: 50,
    justifyContent: "center",
    width: 60,
    right: "50%",
  },
});

export default NewListingButton;
