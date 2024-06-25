// import { StatusBar } from "expo-status-bar";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { StyleSheet, Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import "react-native-gesture-handler";
// import Login from "./src/screens/authentication/Login";
// import ChooseRole from "./src/screens/ChooseRole";
// import GettingStarted from "./src/screens/GettingStarted";
// import LabourSignUpForm from "./src/screens/authentication/LabourSignUpForm";
// import CustomerSignUpform from "./src/screens/authentication/CustomerSignUpForm";
// import SignInWithGoogle from "./src/components/SignInWithGoogle";
// // import AuthTestSignup from './NotUsingComponents/AuthTestSignup'; // For testing. Remove later.
// // import AuthTestLogin from './NotUsingComponents/AuthTestLogin'; // For testing. Remove later.
// // import Home from './NotUsingComponents/Home';
// // import UploadDocument from './src/components/UploadDocument';
// // import Test from './NotUsingComponents/Test';
// // import ForgotPassword from './src/screens/authentication/ForgotPassword';
// // import OTPVerification from './src/screens/authentication/OTPVerification';
// // import ChangePassword from './src/screens/authentication/ChangePassword';
// // import WaitingPage from './src/screens/authentication/WaitingPage';
// import ChatAreaScreen from "./src/screens/ChatAreaScreen";
// import OnlineUsersScreen from "./src/screens/OnlineUsersScreen";
// import registerNNPushToken from "native-notify";
// import Notification from "../LabourLink/src/screens/Notification";
// import NotificationDetail from "../LabourLink/src/screens/NotificationDetail";

// const Stack = createStackNavigator();

// export default function App() {
//   registerNNPushToken(21639, "dwb6dAoCmrQD8faaLyciTU");
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* <Stack.Screen name="GettingStarted" component={GettingStarted} />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SignInWithGoogle"
//           component={SignInWithGoogle}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="ChooseRole"
//           component={ChooseRole}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="CustomerSignUpForm"
//           component={CustomerSignUpform}
//           options={{ title: "back" }}
//         />
//         <Stack.Screen
//           name="LabourSignUp"
//           component={LabourSignUp}
//           options={{ title: "back" }}
//         />

//         <Stack.Screen
//           name="Chat"
//           component={pastUsers}
//           options={{ title: "back" }}
//         /> */}

//         {/* <Stack.Screen
//           name="OnlineUsersScreen"
//           component={OnlineUsersScreen}
//           // options={{ title: "back" }}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="ChatAreaScreen"
//           component={ChatAreaScreen}
//           options={{ title: "back" }}
//         /> */}

//         {/* <Stack.Screen
//           name="Notification"
//           component={Notification}
//           // options={{ title: "back" }}
//           options={{ headerShown: false }}
//         /> */}
//           <Stack.Screen name="Notification" component={Notification} />
//           <Stack.Screen
//             name="NotificationDetail"
//             component={NotificationDetail}
//           />
        
        
//         {/* <Stack.Screen 
//             name="GettingStarted" 
//             component={GettingStarted} />
//         <Stack.Screen 
//             name="Login" 
//             component={Login}
//             options={{ headerShown: false }} />

//          <Stack.Screen 
//             name="Home" 
//             component={Home}
//             options={{ headerShown: false }} />
//         <Stack.Screen 
//             name="SignInWithGoogle" 
//             component={SignInWithGoogle}
//             options={{ headerShown: false }} />
//         <Stack.Screen 
//             name="ChooseRole" 
//             component={ChooseRole} 
//             options={{ headerShown: false }} />
//         <Stack.Screen 
//             name="CustomerSignUpForm" 
//             component={CustomerSignUpform}
//             options={{ title: '' } } />
//         <Stack.Screen 
//             name="LabourSignUpForm" 
//             component={LabourSignUpForm} 
//             options={{ title: '' }} 
//         />
//         <Stack.Screen 
//             name="ForgotPassword" 
//             component={ForgotPassword} 
//             options={{ headerShown: false }} 
//         />
//         <Stack.Screen 
//             name="OTPVerification" 
//             component={OTPVerification} 
//             options={{ headerShown: false }} 
//         />
//         <Stack.Screen 
//             name="ChangePassword" 
//             component={ChangePassword} 
//             options={{ headerShown: false }} 
//         />
//         <Stack.Screen 
//             name="WaitingPage" 
//             component={WaitingPage} 
//             options={{ headerShown: false }} 
//         /> 
//         <Stack.Screen 
//             name="ReviewModel" 
//             component={ReviewModel} 
//             options={{ headerShown: false }} 
//         />
//         <Stack.Screen 
//             name="ReportModel" 
//             component={ReportModel} 
//             options={{ headerShown: false }} 
//         />
//         {/* <Stack.Screen
//             name="LabourPerfomance"
//             component={LabourPerfomanceModel}
//             options={{headerShown: false}}
//         /> */}

//         {/* <Stack.Screen 
//             name="BottomNavigation" 
//             component={BottomNavigationBar} 
//             options={{ headerShown: false }} 
//         /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     flex: 1,
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });


import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import "react-native-gesture-handler";
import Login from "./src/screens/authentication/Login";
import ChooseRole from "./src/screens/ChooseRole";
import GettingStarted from "./src/screens/GettingStarted";
import LabourSignUpForm from "./src/screens/authentication/LabourSignUpForm";
import CustomerSignUpform from "./src/screens/authentication/CustomerSignUpForm";
import SignInWithGoogle from "./src/components/SignInWithGoogle";
import ChatAreaScreen from "./src/screens/ChatAreaScreen";
import OnlineUsersScreen from "./src/screens/OnlineUsersScreen";
import registerNNPushToken from "native-notify";
import Notification from "../LabourLink/src/screens/Notification";
import NotificationDetail from "../LabourLink/src/screens/NotificationDetail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="GettingStarted">
      <Stack.Screen
        name="GettingStarted"
        component={GettingStarted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignInWithGoogle"
        component={SignInWithGoogle}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseRole"
        component={ChooseRole}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerSignUpForm"
        component={CustomerSignUpform}
        options={{ title: "back" }}
      />
      <Stack.Screen
        name="LabourSignUpForm"
        component={LabourSignUpForm}
        options={{ title: "back" }}
      />
    </Stack.Navigator>
  );
}

function NotificationStack() {
  return (
    <Stack.Navigator initialRouteName="Notification">
      <Stack.Screen
        name="Notification"
        component={Notification}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
      />
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
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        component={NotificationStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  registerNNPushToken(21639, "dwb6dAoCmrQD8faaLyciTU");
  return (
    <NavigationContainer>
      <CustomBottomNavigationBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
