import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform  } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInWithGoogle from '../../components/SignInWithGoogle' // signInWithGoogle component importerd.
import SignupHead from '../../components/SignUpHead';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

import { registerCustomer } from '../../services/AuthService';

const CustomerSignUpForm = () => {

  const navigation = useNavigation();


  const [name, setName] = useState(''); // state for name field.
  const [email, setEmail] = useState(''); // state for email field.
  const [password, setPassword] = useState(''); // state for password field.
  const [confirmPassword, setconfirmPassword] = useState(''); // state for confirm password field.
  const [passwordVisibility, setPasswordVisibility] = useState(true); // state for Toggle pasword visibility. 
  const [mobileNumber, setMobileNumber] = useState(''); // state for mobile number field.
  const [address, setAddress] = useState(''); // state for address field. 
  const [rightIcon, setRightIcon] = useState('eye-slash'); // Toggle eye icon.
  const [errors, setErrors] = useState({});
  const [regError, setRegError] = useState();



  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Please enter valid name')
      .required("Your name is required"),
    email: yup
      .string()
      .email("This is not a valid email")
      .required('Email is required'),
    password: yup
      .string()
      .min(5, "Password can't be less than 5 letters")
      .required("Password can't be empty"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required("Please confirm your password"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Please enter valid mobile number')
      .required("Mobile number is required"),
    address: yup
      .string()
      .required('Address is required')
    
  });

  // Password Show/Hide eye button toggle function.
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
        setRightIcon('eye-slash');
        setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-slash') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
    }}

    // Default theme color changed for the forms, but need to check whether it's correct or not.
    const theme = {
      colors: {
        primary: 'white', 
      },
    };

    const handleSignUp = async () => {
      // Try block for validate the user inputs.
      try {
        await schema.validate({ email, password, confirmPassword, name, mobileNumber, address }, { abortEarly: false });
        setErrors({});
        
        try {
          const response = await registerCustomer(name, email, password, mobileNumber, address);
          
          setRegError("");
          console.log(response);
          console.log(response.data.accessToken);
          

          // Store the tokens in localStorage or secure cookie for later use
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
       
       
          navigation.navigate('AuthTestSignup')


        } catch (e) {
          console.log("The error is ", e);
          setRegError("An account with this email or mobile number already exist.");
        }
       
      } catch (error) {
        // Validation failed, set errors state
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    };
  return(
    <View style={styles.registerContainer}>
            <SignupHead userRole="customer"/>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null} // Adjust behavior for iOS and Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust vertical offset for iOS
      >
      <ScrollView>     
        <View style={styles.innerContainer}>
          
        {regError && <Text style={styles.error}>{regError}</Text>}
          
                {/* Name field */}
            <View style={styles.inputContainer}>
            <Text>Name</Text>
                <TextInput
                  theme={theme}
                  outlineColor='transparent'
                  underlineColor="transparent"
                  placeholder="Luxshan Thuraisingam"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>


          {/* Email field */}
          <View style={styles.inputContainer}>
            <Text>Email</Text>
              <TextInput
                theme={theme}
                outlineColor='transparent'
                underlineColor="transparent"
                placeholder="example@gmail.com"
                value={email}  // Need to change into email name.
                onChangeText={setEmail}
                style={styles.input}
              />
                   {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </View>

            
          {/* Password field */}
          <View style={styles.inputContainer}>
            <View style={styles.password}>
                <Text>Password</Text>
                <TextInput
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

                {/* Password visibility changing eye button */}
                  <TouchableOpacity
                    style={{
                        marginTop: -45,
                        marginLeft: 270,
                    }}
                    onPress={handlePasswordVisibility}
                  >
                  <Icon name={rightIcon} size={20} color="black" />
                </TouchableOpacity>  
                </View>
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}  
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.password}>
                
                  <Text>Confirm password</Text>
                  <TextInput
                      theme={theme}
                      underlineColor="transparent"
                      placeholder="Enter password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={confirmPassword}
                      onChangeText={setconfirmPassword}
                      secureTextEntry={passwordVisibility}
                      style={styles.input}
                  />
                    <TouchableOpacity
                      style={{
                          marginTop: -45,
                          marginLeft: 270,
                      }}
                      onPress={handlePasswordVisibility}
                    >
                      {/* eye icon  */}
                      <Icon name={rightIcon} size={20} color="black" />
                  </TouchableOpacity>
                </View>
                  {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
              </View>
              <View style={styles.inputContainer}>
                <Text>Mobile Number</Text>
                <TextInput
                  theme={theme}
                  outlineColor='transparent'
                  underlineColor="transparent"
                  placeholder="0763443542"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  style={styles.input}
                />
                   {errors.mobileNumber && <Text style={styles.error}>{errors.mobileNumber}</Text>}

              </View> 
              <View style={styles.inputContainer}>
                <Text>Address</Text>
                <TextInput
                  theme={theme}
                  outlineColor='transparent'
                  underlineColor="transparent"
                  placeholder="434 Deans Road, 10, Colombo"
                  value={address}
                  onChangeText={setAddress}
                  style={styles.input}
                />
                   {errors.address && <Text style={styles.error}>{errors.address}</Text>}

              </View>
              <View>

              
              </View>
              <Button mode="contained" buttonColor="#FB9741" onPress={handleSignUp} style={styles.button}>
                Sign Up
              </Button>
              {/* Props pass to Sign in with google component */}
              <SignInWithGoogle signText1="_or Sign up with_" signText2="Have an account?" signState="Log in" />
              
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
          
    </View>
  )
}

export default CustomerSignUpForm;

const styles = StyleSheet.create({
  //  style for whole container.
  registerContainer: {
    flex: 1,
    // marginTop:50,
    // marginBottom:10,
    backgroundColor:'white',
    width: '100%'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer:{
    marginTop:10,
    backgroundColor:'white',
    marginLeft: 40 ,
    // marginBottom:80,
    width: '80%', // Width set to make space for both sides.
    // height:'90%'
  },
  inputContainer:{
    marginVertical: 8,
  },
  input: {
    
    width: '100%',
    height: 50,
   
    backgroundColor: '#EDEDEC',
    // Set border radius 20 to all corners.
    borderRadius: 20, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20
  },
  password:{
    marginBottom: 20
  },
  error: {
    color: 'red',
    
  },
})