import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Labour_page from "../screens/Labour_page";
import Notification_customer_page from "../screens/Notification_customer_page";
import Customer_page from "../screens/Customer_page";
import Labour_profile_page from "../screens/Labour_profile_page";
import Previous_Work_History from "../screens/Previous_Work_History";
import Appointment from "../screens/Appointments";
import Appointment_page from "../screens/Appointment_page";
import Languages from "../screens/Languages";
import About_Us from "../screens/About_Us";
import Edit_Profile from "../screens/Edit_Profile";
import Icon from "react-native-vector-icons/FontAwesome";


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
          name="About_Us"
          component={About_Us}
          options={{ title: "About Us", headerBackTitle: "Back" }}
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
          component={Notification_customer_page}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Chat"
          component={Customer_page}
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

  const HomeLabourNavigator = () => {
      return <CustomBottomNavigationBar />
  }

  export default HomeLabourNavigator;
  
  
  