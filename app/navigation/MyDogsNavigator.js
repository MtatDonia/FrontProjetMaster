import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "../screens/ListingScreen";

const Stack = createStackNavigator();

const MyDogsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Map" component={ListingScreen} />
    <Stack.Screen name="Listing" component={ListingScreen} />
  </Stack.Navigator>
);

export default MyDogsNavigator;