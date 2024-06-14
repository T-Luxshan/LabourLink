import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Labour_page from "./screens/Labour_page";
import Previous_Work_History from "./screens/Previous_Work_History";
import Appointment from "./screens/Appointment";
import Appointment_page from "./screens/Appointment_page";
import Labour_profile_page from "./screens/Labour_profile_page";
import Languages from "./screens/Languages";
import About_Us from "./screens/About_Us";


// Create a Stack navigator
const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Labour_profile_page">
        <Stack.Screen
          name="Labour_page"
          component={Labour_page}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Previous_Work_History"
          component={Previous_Work_History}
          options={{ headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="Appointment"
          component={Appointment}
          options={{ headerBackTitle: "Back" }}
        />

        <Stack.Screen name="Appointment_page" component={Appointment_page} />

        <Stack.Screen
          name="Labour_profile_page"
          component={Labour_profile_page}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Languages"
          component={Languages}
          options={{ title: "Languages" }}
        />
        <Stack.Screen
          name="About_Us"
          component={About_Us}
          options={{ title: "About Us" }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
