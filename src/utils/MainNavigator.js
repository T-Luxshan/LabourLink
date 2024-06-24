import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../screens/authentication/Login';
import ChooseRole from '../screens/ChooseRole';
import GettingStarted from '../screens/GettingStarted'
import LabourSignUpForm from '../screens/authentication/LabourSignUpForm';
import CustomerSignUpform from '../screens/authentication/CustomerSignUpForm'
import SignInWithGoogle from '../components/SignInWithGoogle';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import OTPVerification from '../screens/authentication/OTPVerification';
import ChangePassword from '../screens/authentication/ChangePassword';
import WaitingPage from '../screens/authentication/WaitingPage';
import { useLogin } from "../context/LoginProvider";
import HomeCustomerNavigator from "./HomeCustomerNavigator";
import HomeLabourNavigator from "./HomeLabourNavigator";


const Stack = createStackNavigator();


const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="GettingStarted">
        <Stack.Screen
          name="GettingStarted" 
          component={GettingStarted} />
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
        /> 
      </Stack.Navigator>
    )
}

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  const { userRole } = useLogin();
  return isLoggedIn ? 
    (
      userRole == "CUSTOMER" ? <HomeCustomerNavigator /> : <HomeLabourNavigator />
    ) : <AuthNavigator />
}

export default MainNavigator;