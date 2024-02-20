import React from 'react';

import ListingDetailsScreen from '/app/screens/ListingDetailsScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '/app/screens/ProfileScreen';
import SignUpScreen from '/app/screens/SignUpScreen';
import SignInScreen from '/app/screens/SignInScreen';
import UploadImageScreen from './app/screens/UploadImageScreen';
import BottomBarNavigator from './app/components/BottomBarNavigator';
import WelcomeScreen from '/app/screens/WelcomeScreen';
import UserGuideScreen from '/app/screens/UserGuideScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ListingDetailsScreen" component={ListingDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UploadImageScreen" component={UploadImageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTabNavigator" component={BottomBarNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="UserGuideScreen" component={UserGuideScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
