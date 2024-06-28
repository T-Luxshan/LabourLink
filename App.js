// import { StatusBar } from "expo-status-bar";
// import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import "react-native-gesture-handler";



import MainNavigator from "./src/utils/MainNavigator";
import LoginProvider from "./src/context/LoginProvider";


export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
      <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
      
  
  );
}



