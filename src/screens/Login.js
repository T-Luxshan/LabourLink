import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, ToggleButton, Checkbox, Image } from 'react-native-paper';
import { TouchableRipple, IconButton } from 'react-native-paper';
import SignInWithGoogle from '../components/SignInWithGoogle'
import ToggleRole from '../components/ToggleRole';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [hidePassword, setHidePassword] = useState(true);

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-slash');
    
    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye') {
          setRightIcon('eye-slash');
          setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-slash') {
          setRightIcon('eye');
          setPasswordVisibility(!passwordVisibility);
      }
  };

    const togglePasswordVisibility = () => {
      setHidePassword(!hidePassword);
    };


    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };

    const handleLogin = () => {
      // Implement login logic here
      if (role) {
        // Proceed with login based on selected role
        console.log('Selected role:', role);
      } else {
        // Display an error message indicating that a role must be selected
        console.log('Please select a role');
      }
    
    
      console.log('Username:', username);
      console.log('Password:', password);
    };

    const handleGoogleSignIn = () => {
      // Handle Google sign-in logic here
    };

    const handleImageButtonPress = () => {
      // Handle button press logic here
      console.log('Image button pressed');
    };
    const handleForgotPassword = () => {
      // Handle button press logic here
      console.log('Forgot Password  pressed');
    };
    
    const theme = {
      colors: {
        primary: 'white', 
      },
    };
    
    return (
              <View style={styles.container}>
                <View style={styles.innerContainer}>
                <View >
                  <Text  style={{ fontWeight: '600', fontSize: 40, marginBottom: 0, textAlign:'center'}}>Labour <Text style={{ color: '#F97300' }}>LINK</Text></Text>
                </View>
                
                <Text style={styles.PageTitle}>Login to your account</Text>

                
                {/* <ToggleRole /> */}
                <View style={styles.toggleButtonContainer}>
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.cButton, role === 'customer' && styles.activeButton]}
                    onPress={() => setRole('customer')}>
                    <Text style={[styles.toggleButtonText, styles.cButton, role === 'customer' && styles.activeButtonText]}>Customer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.lButton, role === 'labour' && styles.activeButton]}
                    onPress={() => setRole('labour')}>
                    <Text style={[styles.toggleButtonText, role === 'labour' && styles.activeButtonText]}>Labour</Text>
                  </TouchableOpacity>
                </View>
              <View>
                  <Text>Email</Text>
                  <TextInput
                 
                theme={theme}
                  outlineColor='transparent'
                    underlineColor="transparent"
                    placeholder="example@gmail.com"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                  />
              </View>
              <View>
                <Text>Password</Text>
                <TextInput
                //   label="Psw"
                  theme={theme}
                  underlineColor="transparent"
                  placeholder="Enter password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={passwordVisibility}
                  style={styles.input}
                        />


                     <TouchableOpacity
                    style={{
                        marginTop: -50,
                        marginLeft: 280,
                    }}
                    onPress={handlePasswordVisibility}
                >
                    <Icon name={rightIcon} size={20} color="black" />
                </TouchableOpacity>   
              </View>
                <View style={styles.linksContainer}>
                  <TouchableRipple onPress={handleForgotPassword}>
                    <Text style={styles.forgotPsw}>Forgot password?</Text>
                  </TouchableRipple>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => setRememberMe(!rememberMe)}
                    color="#F97300"/>
                  <Text>Remember me</Text>
                </View>
                
                <Button mode="contained" buttonColor="#FB9741" onPress={handleLogin} style={styles.button}>
                  Login
                </Button>
                <SignInWithGoogle signText1="_or Sign in with_" signText2="Don't Have an account?" signState="Sign up" />
                </View>
              </View>
            );
  };
  
  export default Login;
  
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
      
      justifyContent: 'center',
    //   alignItems: 'center',
      paddingLeft: 50,
      width: '100%'
    },
    innerContainer:{
      width: '90%'
    },
    input: {
      width: '100%',
      marginVertical: 10,
      backgroundColor: '#EDEDEC',
      borderRadius: 20, 
      // borderColor: "transparent",
      borderTopLeftRadius: 20, 
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20, 
      borderBottomRightRadius: 20
      
    },
    button: {
      width: '100%',
      color: '#F97300',
      marginVertical: 10,
    },
    PageTitle : {
      textAlign: 'center',
      marginVertical: 10,
      fontWeight: '400',
      fontSize: 15,
      // alignItems: 'center',
      width: '200',
      
    },
    toggleRoleContainer: {
      flex: 1,
      // marginBottom:700,
      justifyContent: 'center',
      alignItems: 'center',
      
    },





   
    toggleButtonContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      marginTop: 20,
      marginLeft: 30
    },
    toggleButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#F97300',
      // borderRadius: 5 ,
      marginRight: 10,
  
     
    },
    lButton:{
      width: 120,
      borderTopLeftRadius: 0, 
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 0, 
      borderBottomRightRadius: 10,
    },
    cButton: {
      borderTopLeftRadius: 10, 
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 0,
    },
    toggleButtonText: {
      fontSize: 16,
    },
    activeButton: {
      backgroundColor: '#F97300',
    },
    activeButtonText: {
      color: '#fff',
    },
  
   






    forgotPsw: {
      // fontWeight: '600',
      fontSize: 12,
      color: 'blue',
      // textDecorationLine: 'underline',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    linksContainer: {
      marginTop:20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
    },
    link: {
      // marginBottom: 10 ,
      color: 'blue', // Change color to match hyperlink style
    },
  });
  