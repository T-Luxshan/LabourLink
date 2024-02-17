import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './src/screens/Login';
import ChooseRole from './src/screens/ChooseRole';
import SignUp from './src/screens/SignUp'
import CustomerSignUpform from './src/components/CustomerSignUpForm'
import GettingStarted from './src/screens/GettingStarted'
import LabourSignUp from './src/components/LabourSignUpForm';
import SignInWithGoogle from './src/components/SignInWithGoogle';

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
            options={{ title: 'back' }} />
        <Stack.Screen 
            name="LabourSignUp" 
            component={LabourSignUp} 
            options={{ title: 'back' }} />
        

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
