import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, ToggleButton, Checkbox, Image } from 'react-native-paper';
import { TouchableRipple, IconButton } from 'react-native-paper';
import SignInWithGoogle from '../../components/SignInWithGoogle'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as yup from 'yup';
import { getUserRole, loginCustomer, loginLabour } from '../../services/AuthService';
import { useLogin } from '../../context/LoginProvider';


const Login = () => {

    const navigation = useNavigation();
    const { setIsLoggedIn } = useLogin();
    const { setUserRole } = useLogin();

    const [email, setEmail] = useState(''); // Need to change the state named for email.
    const [password, setPassword] = useState(''); // state for password field.
    const [role, setRole] = useState(null); // state for save selected role.
    const [rememberMe, setRememberMe] = useState(false); // state for remember me button.
    const [errors, setErrors] = useState({});
    const [logError, setLogError] = useState('');

    // const [secureTextEntry, setSecureTextEntry] = useState(true);
    // const [hidePassword, setHidePassword] = useState(true); 

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-slash');
    

    const schema = yup.object().shape({
      role: yup
        .string()
        .required("Please select your role"),
      email: yup
        .string()
        .email("This is not a valid email")
        .required('Email is required'),
      password: yup
        .string()
        .min(5, "Password can't be less than 5 letters")
        .required("Password can't be empty"),
    });



    const handleLogin = () => {
      setIsLoggedIn(true);
      setUserRole("LABOUR");
      // try {
      //   await schema.validate({ email, password, role }, { abortEarly: false });
      //   const lowercasedEmail = email.toLowerCase();
      //   setErrors({});
       

      //   try {
      //     let response = null;
      //     let userRoleResponse = await getUserRole(lowercasedEmail);
      //     let userRole = userRoleResponse.data.role;
      //     let userRoleStatus = userRoleResponse.data.verified;
      //     console.log(userRoleResponse);
      //     console.log(userRole);
      //     console.log(userRoleStatus);

      
      //     if(role != userRole )
      //       throw new Error('Invalid email or password.');

      //     if(role == "CUSTOMER" ){
      //        response = await loginCustomer(role, lowercasedEmail, password); 
      //        AsyncStorage.setItem("token", response.data.accessToken);
      //        AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      //        AsyncStorage.setItem("userEmail", email);
      //        navigation.navigate('GettingStarted');
      //     }
      //     else{
      //       response = await loginLabour(role, lowercasedEmail, password);   
      //       AsyncStorage.setItem("token", response.data.accessToken);
      //       AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      //       AsyncStorage.setItem("userEmail", email);
      //       if(userRoleStatus)
      //         navigation.navigate('GettingStarted');
      //       else
      //         navigation.navigate('WaitingPage')
      //     }
          
      //     setLogError("");
      //     console.log(response);
      //     console.log(response.data.accessToken);
          
      //   } catch (e) {
      //     setLogError("Invalid email or password.");
      //   }

       
      // } catch (error) {
      //   // Validation failed, set errors state
      //   const validationErrors = {};
      //   error.inner.forEach(err => {
      //     validationErrors[err.path] = err.message;
      //   });
      //   setErrors(validationErrors);
      // }
    };

    
    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye') {
          setRightIcon('eye-slash');
          setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-slash') {
          setRightIcon('eye');
          setPasswordVisibility(!passwordVisibility);
      }
  };

    const handleGoogleSignIn = () => {
      // Handle Google sign-in logic here
    };

    const handleImageButtonPress = () => { // need to implement.
      // Handle button press logic here
      console.log('Image button pressed');
    };
    const handleForgotPassword = () => { 
      console.log('Forgot Password  pressed');
      navigation.navigate('ForgotPassword');
    };
    
    // customized default theme, need to finish later.
    const theme = {
      colors: {
        primary: 'white', 
      },
    };
    
    return (
              <View style={styles.container}>
                <View style={styles.innerContainer}>
                <View >
                  {/* App head tittle */}
                  <Text  style={{ fontWeight: '600', fontSize: 40, marginBottom: 0, textAlign:'center'}}>Labour <Text style={{ color: '#F97300' }}>LINK</Text></Text>
                </View>
                  {/* App head sub tittle */}
                <Text style={styles.PageTitle}>Login to your account</Text>

                {/* <ToggleRole /> */}
                <View style={styles.toggleButtonContainer}>
                  <View style={styles.innerToggleButtonContainer}>
                  {/* Button customer */}
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.cButton, role === 'CUSTOMER' && styles.activeButton]}
                    onPress={() => setRole('CUSTOMER')}>
                    <Text style={[styles.toggleButtonText, styles.cButton, role === 'CUSTOMER' && styles.activeButtonText]}>Customer</Text>
                  </TouchableOpacity>
                  {/* Button labour */}
                  {/* this button for handle when labour click the button neede to edit this commment later */}
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.lButton, role === 'LABOUR' && styles.activeButton]}
                    onPress={() => setRole('LABOUR')}>
                    <Text style={[styles.toggleButtonText, role === 'LABOUR' && styles.activeButtonText]}>Labour</Text>
                  </TouchableOpacity>
                </View>
                  {errors.role && <Text style={[styles.error, {marginLeft: 80, marginTop:5}]}>{errors.role}</Text>}
                </View>
              <View>
                {/* Login email field */}
                  <Text>Email</Text>
                  <TextInput
                    theme={theme}
                    outlineColor='transparent'
                    underlineColor="transparent"
                    placeholder="example@gmail.com"
                    value={email}
                    onChangeText={setEmail} // this function name needed to change later.
                    style={styles.input}
                  />
                   {errors.email && <Text style={styles.error}>{errors.email}</Text>}
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
                  // error={errors.password}
                />

              {/* eye icon button */}
                <TouchableOpacity
                    style={{
                        marginTop: -50,
                        marginLeft: 270,
                    }}
                    onPress={handlePasswordVisibility}
                >
                    <Icon name={rightIcon} size={20} color="black" />
                </TouchableOpacity> 
                {errors.password && <Text style={[styles.error, {marginTop: 25}]}>{errors.password}</Text>}
              </View>
                <View style={styles.linksContainer}>
                  {/* Forget password text button */}
                  <TouchableRipple onPress={handleForgotPassword}>
                    <Text style={styles.forgotPsw}>Forgot password?</Text>
                  </TouchableRipple>
                </View>
                {/* remember me checkbox */}
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => setRememberMe(!rememberMe)}
                    color="#F97300"/>
                  <Text>Remember me</Text>
                </View>
                {/* Login button */}
                {/* {errors.general && <Text style={styles.error}>{errors.general}</Text>}   */}
                {logError && <Text style={styles.error}>{logError}</Text>}
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
      marginTop:90,
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
    innerToggleButtonContainer: {
      flexDirection: 'row',
      // marginBottom: 20,
      marginTop: 20,
      marginLeft: 30
    },
    toggleButtonContainer: {
      marginBottom:20
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
    error: {
      color: 'red',
      
    },
  });
  