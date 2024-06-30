import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notification_customer_page from "../screens/Notification_customer_page";
import Customer_page from "../screens/Customer_page";
import About_Us from "../screens/About_Us";
import Edit_Profile from "../screens/Edit_Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import { Badge, withBadge } from "react-native-elements";
import Work_History from "../screens/Work_History";
import Upcoming_Services from "../screens/Upcoming_Services";
import Customer_profile_page from "../screens/Customer_profile_page";
import Customer_Personal_Details from "../screens/Customer_Personal_Details";
import Change_Password from "../screens/Change_Password";
import ReviewModel from "../components/ReviewModel";
import ReportModel from "../components/ReportModel";
import MapViewScreen from "../screens/MapViewScreen";
import LabourInfo from "../screens/LabourInfo";
import BookAppointment from "../screens/BookAppointment";
import LabourPerformanceModel from "../components/LabourPerfomanceModel";
import ChatAreaScreen from "../screens/ChatAreaScreen";
import OnlineUsersScreen from "../screens/OnlineUsersScreen";
import Notification from "../screens/Notification";
import NotificationDetail from "../screens/NotificationDetail";
import { findNotifications } from "../services/NoificationSevice";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        name="add_review"
        component={ReviewModel}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="report-user"
        component={ReportModel}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Upcoming_Services"
        component={Upcoming_Services}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="MapViewScreen"
        component={MapViewScreen}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="LabourInfo"
        component={LabourInfo}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointment}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="ChatAreaScreen"
        component={ChatAreaScreen}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="labour-perfomance"
        component={LabourPerformanceModel}
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

function NotificationStack() {
  return (
    <Stack.Navigator initialRouteName="Notification">
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="OnlineUsersScreen">
      <Stack.Screen
        name="OnlineUsersScreen"
        component={OnlineUsersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatAreaScreen"
        component={ChatAreaScreen}
        options={{ title: "back" }}
      />
    </Stack.Navigator>
  );
}

function CustomBottomNavigationBar() {
  const [notifications, setNotifications] = useState([]);
  const [email, setEmail] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error("Failed to fetch email from storage", error);
      }
    };

    fetchEmail();
  }, []);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     if (email) {
  //       try {
  //         const response = await findNotifications(email);
  //         const sortedNotifications = response.data.sort(
  //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //         );
  //         setNotifications(sortedNotifications);
  //       } catch (error) {
  //         console.log("Error fetching notifications ", error);
  //       }
  //     }
  //   };

  //   fetchNotifications();
  // }, [email]);
  useEffect(() => {
    const interval = setInterval(async () => {
      if (email) {
        setRefreshing(true);
        try {
          const response = await findNotifications(email);
          const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setNotifications(sortedNotifications);
        } catch (error) {
          console.error('Error refreshing notifications', error);
        } finally {
          setRefreshing(false);
        }
      }
    }, 1000); // Refresh every 1 second

    return () => clearInterval(interval);
  }, [email]);

  const unreadNotificationCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <Tab.Navigator
      initialRouteName="Customer_page"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let badgeCount = 0;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Notification":
              iconName = "bell";
              badgeCount = unreadNotificationCount;
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

          const IconWithBadge =
            badgeCount > 0 ? withBadge(badgeCount)(Icon) : Icon;

          return <IconWithBadge name={iconName} size={size} color={color} />;
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
        component={NotificationStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
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
  return <CustomBottomNavigationBar />;
};

export default HomeCustomerNavigator;
