import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

// Import your screens
import Labour_page from "./src/screens/Labour_page";
import Notification_customer_page from "./src/screens/Notification_customer_page";
import Customer_page from "./src/screens/Customer_page";
import Labour_profile_page from "./src/screens/Labour_profile_page";
import Previous_Work_History from "./src/screens/Previous_Work_History";
import Appointment from "./src/screens/Appointment";
import Appointment_page from "./src/screens/Appointment_page";
import Languages from "./src/screens/Languages";
import About_Us from "./src/screens/About_Us";
import Edit_Profile from "./src/screens/Edit_Profile";
import Personal_Details from "./src/screens/Personal_Details";
import Change_Password from "./src/screens/Change_Password";
import Customer_Personal_Details from "./src/screens/Customer_Personal_Details";
import Customer_profile_page from "./src/screens/Customer_profile_page";
import Work_History from "./src/screens/Work_History";
import Upcoming_Services from "./src/screens/Upcoming_Services";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
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
      </Stack.Navigator>
  );
}

function CustomerStack() {
  return (
    <Stack.Navigator initialRouteName="CustomerMain">
      <Stack.Screen
        name="CustomerMain"
        component={Customer_page}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Work_History"
        component={Work_History}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Upcoming_Services"
        component={Upcoming_Services}
        options={{ headerBackTitle: "Back" }}
      />
      
    </Stack.Navigator>
  );
}

function ProfileStack() { 
  return (
    <Stack.Navigator initialRouteName="ProfileMain">
      <Stack.Screen
        name="ProfileMain"
        component={Labour_profile_page}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Languages"
        component={Languages}
        options={{ title: "Languages", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Edit_Profile"
        component={Edit_Profile}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Personal_Details"
        component={Personal_Details}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Change_Password"
        component={Change_Password}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="About_Us"
        component={About_Us}
        options={{ title: "About Us", headerBackTitle: "Back" }}
      />
    </Stack.Navigator>
  );
}

function CustomerProfileStack() {
  return (
    <Stack.Navigator initialRouteName="CustomerProfileMain">
      <Stack.Screen
        name="CustomerProfileMain"
        component={Customer_profile_page}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Customer_Personal_Details"
        component={Customer_Personal_Details}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Edit_Profile"
        component={Edit_Profile}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Change_Password"
        component={Change_Password}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="About_Us"
        component={About_Us}
        options={{ headerBackTitle: "Back" }}
      />
    </Stack.Navigator>
  );
}



function CustomBottomNavigationBar() {
  return (
    <Tab.Navigator
      initialRouteName="Labour_page"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Notification":
              iconName = "bell";
              break;
            case "Chat":
              iconName = "comment";
              break;
            case "Profile":
              iconName = "user";
              break;
            default:
              iconName = "question";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notification"
        component={CustomerProfileStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={CustomerStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <CustomBottomNavigationBar />
    </NavigationContainer>
  );
}

