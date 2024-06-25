import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Labour_page from "../screens/Labour_page";
import Notification_customer_page from "../screens/Notification_customer_page";
import Customer_page from "../screens/Customer_page";
import Labour_profile_page from "../screens/Labour_profile_page";
import Previous_Work_History from "../screens/Previous_Work_History";
import Appointment from "../screens/Appointment";
import Appointment_page from "../screens/Appointment_page";
import Languages from "../screens/Languages";
import About_Us from "../screens/About_Us";
import Edit_Profile from "../screens/Edit_Profile"; 
import Icon from "react-native-vector-icons/FontAwesome";
import Personal_Details from "../screens/Personal_Details";
import Labour_Change_Password from "../screens/Labour_Change_Password";
import Edit from "../screens/Edit";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function LabourStack() {
    return (
      <Stack.Navigator initialRouteName="Labour_page">
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
        <Stack.Screen
          name="Appointment_page"
          component={Appointment_page}
          options={{ headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{ headerBackTitle: "Back" }}
        />
      </Stack.Navigator>
    );
  }
  
  function LabourProfileStack() { 
  return (
    <Stack.Navigator initialRouteName="Labour_profile_page">
      <Stack.Screen
        name="Labour_profile_page"
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
        name="Labour_Change_Password"
        component={Labour_Change_Password}
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
          component={LabourStack}
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
          component={LabourProfileStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }

  const HomeLabourNavigator = () => {
      return <CustomBottomNavigationBar />
  }

  export default HomeLabourNavigator;
  
  
  