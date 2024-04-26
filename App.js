import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './src/screens/authentication/Login';
import ChooseRole from './src/screens/ChooseRole';
import GettingStarted from './src/screens/GettingStarted'
import LabourSignUp from './src/screens/authentication/LabourSignUpForm';
import CustomerSignUpform from './src/screens/authentication/CustomerSignUpForm'
import SignInWithGoogle from './src/components/SignInWithGoogle';
import AuthTestSignup from './NotUsingComponents/AuthTestSignup'; // For testing. Remove later.
import AuthTestLogin from './NotUsingComponents/AuthTestLogin'; // For testing. Remove later.
import Home from './NotUsingComponents/Home';

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
        {/* For Validation testing purpose, remove later */}
        <Stack.Screen 
            name="AuthTestSignup" 
            component={AuthTestSignup}
            options={{ headerShown: false }} />

        <Stack.Screen 
            name="AuthTestLogin" 
            component={AuthTestLogin}
            options={{ headerShown: false }} />
            
          {/* TODO : remove above block  */}
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
            name="LabourSignUp" 
            component={LabourSignUp} 
            options={{ title: '' }} 
        />
        

      </Stack.Navigator>
    </NavigationContainer>

    // <SafeAreaProvider>
    //   <View style={styles.container}>
    //     <View style={{ flex: 1 }}>
    //       {/* <SignUp />  */}
    //     <ChooseRole />
    //      {/* <Login /> */}
    //     {/* <LabourSignUp /> */}
    //     {/* <CustomerSignUpform />   */}
          
    //     </View>  
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
