import { StatusBar } from 'expo-status-bar';
import * as React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './src/screens/authentication/Login';
import ChooseRole from './src/screens/ChooseRole';
import GettingStarted from './src/screens/GettingStarted'
import LabourSignUpForm from './src/screens/authentication/LabourSignUpForm';
import CustomerSignUpform from './src/screens/authentication/CustomerSignUpForm'
import SignInWithGoogle from './src/components/SignInWithGoogle';
import UploadDocument from './src/components/UploadDocument';
import ForgotPassword from './src/screens/authentication/ForgotPassword';
import OTPVerification from './src/screens/authentication/OTPVerification';
import ChangePassword from './src/screens/authentication/ChangePassword';
import WaitingPage from './src/screens/authentication/WaitingPage';
import Labour_page from "./src/screens/Labour_page";
import Previous_Work_History from "./src/screens/Previous_Work_History";
import Appointment from "./src/screens/Appointment";
import Appointment_page from "./src/screens/Appointment_page";
import Labour_profile_page from "./src/screens/Labour_profile_page";
import Languages from "./src/screens/Languages";
import About_Us from "./src/screens/About_Us";
import Edit_Profile from "./src/screens/Edit_Profile";



const Stack = createStackNavigator();

export default function App() {

  

  return (
   
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Labour_page">
          {/* <Stack.Screen name="GettingStarted" component={GettingStarted} />
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
          options={{ title: "" }}
        />
        <Stack.Screen
          name="LabourSignUpForm"
          component={LabourSignUpForm}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WaitingPage"
          component={WaitingPage}
          options={{ headerShown: false }}
        /> */}
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
            
          />
          {/* <Stack.Screen
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
        <Stack.Screen 
          name="Edit_Profile" 
          component={Edit_Profile} 
        /> */}
        </Stack.Navigator>
      </NavigationContainer>
   

    // <SafeAreaProvider>
    //   <View style={styles.container}>

    //     {/* <ForgotPassword /> */}
    //     {/* <OTPVerification /> */}
    //     <ChangePassword />
    //     {/* <Test /> */}
    //     <StatusBar style="auto" />
    //   </View>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
