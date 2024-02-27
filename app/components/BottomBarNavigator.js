
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ListingScreen from '../screens/ListingScreen';
import MapScreen from '../screens/MapScreen';
import UploadImageScreen from '../screens/UploadImageScreen';
import ChatGptScreen from '../screens/ChatGptScreen';
import colors from '/app/config/colors';


const Tab = createBottomTabNavigator();
//<MaterialIcons name="pets" size={24} color="black" />
const BottomTabNavigator = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListingScreen">
      <Tab.Screen
        name="DogsMap"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="google-maps" size={size} color={colors.purple} />
          ),
        }}
      />
      <Tab.Screen
        name="ListingScreen"
        component={ListingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted-square" size={size} color={colors.purple} />
          ),
        }}
      />
      <Tab.Screen
        name="Doggy Bot"
        component={ChatGptScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pets" size={size} color={colors.purple} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;