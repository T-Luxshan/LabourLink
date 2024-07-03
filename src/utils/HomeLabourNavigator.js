import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Labour_page from "../screens/Labour_page";
import Notification_customer_page from "../screens/Notification_customer_page";
import Customer_page from "../screens/Customer_page";
import Labour_profile_page from "../screens/Labour_profile_page";
import Previous_Work_History from "../screens/Previous_Work_History";
import Appointment from "../screens/Appointment";
import Appointment_page from "../screens/Appointment_page";
// import Languages from "../screens/Languages";
import About_Us from "../screens/About_Us";
import Edit_Profile from "../screens/Edit_Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import Personal_Details from "../screens/Personal_Details";
import Labour_Change_Password from "../screens/Labour_Change_Password";
import Edit from "../screens/Edit";
import ReportModel from "../components/ReportModel";
import ChatAreaScreen from "../screens/ChatAreaScreen";
import OnlineUsersScreen from "../screens/OnlineUsersScreen";
import Notification from "../screens/Notification";
import NotificationDetail from "../screens/NotificationDetail";
import { findNotifications } from "../services/NoificationSevice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Badge, withBadge } from "react-native-elements";
import WaitingPage from '../screens/authentication/WaitingPage';
import {totalUnreadMessageCount} from "../services/ChatService";

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
        name="report-user"
        component={ReportModel}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="waiting-page"
        component={WaitingPage}
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

function NotificationStack() {
  return (
    <Stack.Navigator initialRouteName="Notification">
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
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
  const [refreshingChatCount, setRefreshingChatCount] = useState(false);
  const [receivedMessagesCount, setReceivedMessagesCount] = useState({});


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

  useEffect(() => {
    const interval = setInterval(async () => {
      if (email) {
        setRefreshingChatCount(true);
        try {
          const response = await totalUnreadMessageCount( email);
          setReceivedMessagesCount(response.data)
        } catch (error) {
          console.error("Error refreshing notifications", error);
        } finally {
          setRefreshingChatCount(false);
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
      initialRouteName="Labour_page"
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
                badgeCount = receivedMessagesCount;
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
        component={LabourStack}
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
        component={LabourProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const HomeLabourNavigator = () => {
  return <CustomBottomNavigationBar />;
};

export default HomeLabourNavigator;
