import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notification_customer_page from "../screens/Notification_customer_page";
import Customer_page from "../screens/Customer_page";
import About_Us from "../screens/About_Us";
import Edit_Profile from "../screens/Edit_Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import Work_History from "../screens/Work_History";
import Upcoming_Services from "../screens/Upcoming_Services";
import Customer_profile_page from "../screens/Customer_profile_page";
import Customer_Personal_Details from "../screens/Customer_Personal_Details";
import Change_Password from "../screens/Change_Password";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function CustomerStack() {
  return (
    <Stack.Navigator initialRouteName="Customer_page">
      <Stack.Screen
        name="Customer_page"
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
  
function CustomerProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Customer_profile_page">
      <Stack.Screen
        name="Customer_profile_page"
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
        initialRouteName="Customer_page"
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
          component={CustomerStack}
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
          component={CustomerProfileStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }

  const HomeCustomerNavigator = () => {
      return <CustomBottomNavigationBar />
  }

  export default HomeCustomerNavigator;
  
  
  