import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInWithGoogle from '../../components/SignInWithGoogle' // signInWithGoogle component importerd.
import SignupHead from '../../components/SignUpHead';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as yup from 'yup';
import { registerLabour } from '../../services/AuthService';
import UploadDocument from '../../components/UploadDocument';

const LabourSignUpForm = () => {

  const navigation = useNavigation(); 

  const [name, setName] = useState(''); // state for name field.
  const [email, setEmail] = useState(''); // state for email field.
  const [password, setPassword] = useState(''); // state for password field.
  const [confirmPassword, setconfirmPassword] = useState(''); // state for confirm password field.
  const [mobileNumber, setMobileNumber] = useState(''); // state for mobile number field.
  const [nic, setNic] = useState(''); // state for confirm password field.
  const [passwordVisibility, setPasswordVisibility] = useState(true); // state for Toggle pasword visibility. 
  const [rightIcon, setRightIcon] = useState('eye-slash'); // Toggle eye icon.
  const [errors, setErrors] = useState({});
  const [regError, setRegError] = useState();
  const [fileURI, setFileURI] = useState(null);

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
      .matches(/^[0-9]{10}$/, 'Pleace enter valid mobile number')
      .required("Mobile number is required"),
    nic: yup
      .string()
      .matches(/^[0-9]{12}$|^[0-9]{9}[v|V]$/, 'Pleace enter valid NIC number')
      .required('Your NIC number is required')
    
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

    const theme = {
      colors: {
        primary: 'white', 
      },
    };

    const handleFileURI = (fileUri) => {
      
      setFileURI(fileUri);
      console.log("File uri retrivied: ", fileUri);
    }

    const handleSignUp = async () => {
      // Implement login logic here
      try {
        await schema.validate({ email, password, confirmPassword, name, mobileNumber, nic }, { abortEarly: false });
        setErrors({});
        
        try {
          const response = await registerLabour(name, email, password, mobileNumber, nic);
          
          setRegError("");
          console.log(response);
          console.log(response.data.accessToken);
          

          // Store the tokens in localStorage or secure cookie for later use
          // localStorage.setItem('token', response.data.accessToken);
          // localStorage.setItem('refreshToken', response.data.refreshToken);
          AsyncStorage.setItem("token", response.data.accessToken);
          AsyncStorage.setItem("refreshToken", response.data.refreshToken);
       
       
          //  Navigate to the next page to the sign up.
          // navigation.navigate('AuthTestSignup')


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
      <SignupHead userRole="labour"/>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null} // Adjust behavior for iOS and Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust vertical offset for iOS
      >
      <ScrollView>
        <View style={styles.innerContainer}>
        {regError && <Text style={styles.error}>{regError}</Text>}

           
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

          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
              theme={theme}
              outlineColor='transparent'
              underlineColor="transparent"
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </View>
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
                <Text>NIC</Text>
                <TextInput
                  theme={theme}
                  outlineColor='transparent'
                  underlineColor="transparent"
                  placeholder="2000344335343"
                  value={nic}
                  onChangeText={setNic}
                  style={styles.input}
                />
                {errors.nic && <Text style={styles.error}>{errors.nic}</Text>}

                {/* upload document component here */}
                <View  style={styles.inputContainer}>
                  <UploadDocument nic={nic} onFileUpload={handleFileURI}/>
                </View>

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

export default LabourSignUpForm;

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    // marginBottom:10,
    backgroundColor:'white',
    width: '100%'
  },
  innerContainer:{
    // marginTop:20,
    paddingBottom:40,

    marginLeft: 40 ,
    width: '80%',
    // height:'70%'
  },
   scrollContainer: {
    flexGrow: 1,
  },
  inputContainer:{
    marginVertical: 8,
  },
  input: {
    
    width: '100%',
    height: 50,
    // marginVertical: 8,
    backgroundColor: '#EDEDEC',
     
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