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
import UploadDocument from './src/components/UploadDocument';
import ForgotPassword from './src/screens/authentication/ForgotPassword';
import OTPVerification from './src/screens/authentication/OTPVerification';
import ChangePassword from './src/screens/authentication/ChangePassword';
import WaitingPage from './src/screens/authentication/WaitingPage';
//import SearchBar from './src/components/SearchBar';
import MapViewScreen from './src/screens/MapViewScreen';
import  BookAppointment from './src/screens/BookAppointment';
import LabourInfo from './src/screens/LabourInfo';
import PageButton from './src/components/PageButton';
 const Stack = createStackNavigator();
 

export default function App() {

  

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
         {/* <Stack.Screen 
            name="GettingStarted" 
            component={GettingStarted} />
        <Stack.Screen 
            name="Login" 
            component={Login}
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
        />  */}
         <Stack.Screen name="MapViewScreen" component={MapViewScreen} options={{ headerShown: false }}/> 
         <Stack.Screen name="LabourInfo" component={LabourInfo} options={{ headerShown: false }}/>  
         <Stack.Screen name="BookAppointment" component={BookAppointment} options={{ headerShown: false }}/>
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
