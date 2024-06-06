import { StatusBar } from 'expo-status-bar';
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
import AuthTestSignup from './NotUsingComponents/AuthTestSignup'; // For testing. Remove later.
import AuthTestLogin from './NotUsingComponents/AuthTestLogin'; // For testing. Remove later.
import Home from './NotUsingComponents/Home';
import UploadDocument from './src/components/UploadDocument';
import Test from './NotUsingComponents/Test';
import ForgotPassword from './src/screens/authentication/ForgotPassword';
import OTPVerification from './src/screens/authentication/OTPVerification';
import ChangePassword from './src/screens/authentication/ChangePassword';
import WaitingPage from './src/screens/authentication/WaitingPage';
import ReviewModel from './src/components/ReviewModel';
import ReportModel from './src/components/ReportModel';

const Stack = createStackNavigator();

export default function App() {

  

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            name="GettingStarted" 
            component={GettingStarted} />
        <Stack.Screen 
            name="Login" 
            component={Login}
            options={{ headerShown: false }} />

         <Stack.Screen 
            name="Home" 
            component={Home}
            options={{ headerShown: false }} />
        <Stack.Screen 
            name="AuthTestSignup" 
            component={AuthTestSignup}
            options={{ headerShown: false }} />

        <Stack.Screen 
            name="AuthTestLogin" 
            component={AuthTestLogin}
            options={{ headerShown: false }} />  
        <Stack.Screen 
            name="SignInWithGoogle" 
            component={SignInWithGoogle}
            options={{ headerShown: false }} />
        <Stack.Screen 
            name="ChooseRole" 
            component={ChooseRole} 
            options={{ headerShown: false }} />
        <Stack.Screen 
            name="CustomerSignUpForm" 
            component={CustomerSignUpform}
            options={{ title: '' } } />
        <Stack.Screen 
            name="LabourSignUpForm" 
            component={LabourSignUpForm} 
            options={{ title: '' }} 
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
        <Stack.Screen 
            name="ReviewModel" 
            component={ReviewModel} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="ReportModel" 
            component={ReportModel} 
            options={{ headerShown: false }} 
        />
       </Stack.Navigator>
     </NavigationContainer>   
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
