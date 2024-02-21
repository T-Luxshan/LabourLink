import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInWithGoogle from '../../components/SignInWithGoogle' // signInWithGoogle component importerd.
import SignupHead from '../../components/SignUpHead';

const CustomerSignUpForm = () => {
  const [username, setUsername] = useState(''); // Need to change the state named for email.
  const [password, setPassword] = useState(''); // state for password field.
  const [confirmPassword, setconfirmPassword] = useState(''); // state for confirm password field.
  const [passwordVisibility, setPasswordVisibility] = useState(true); // state for Toggle pasword visibility. 
  const [rightIcon, setRightIcon] = useState('eye-slash'); // Toggle eye icon.


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

    const handleSignUp = () => {
      // Implement login logic here
    };
  return(
    <View style={styles.registerContainer}>
            <SignupHead userRole="customer"/>
            
      <View style={styles.innerContainer}>
        {/* Email field */}
          <Text>Email</Text>
            <TextInput
              theme={theme}
              outlineColor='transparent'
              underlineColor="transparent"
              placeholder="example@gmail.com"
              value={username}  // Need to change into email name.
              onChangeText={setUsername}
              style={styles.input}
            />

          <View>
        {/* Password field */}
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

            <View style={styles.confirmPassword}>
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
            <View>
              <Text>Mobile Number</Text>
              <TextInput
            
                outlineColor='transparent'
                underlineColor="transparent"
                placeholder="0763443542"
                
              
                style={styles.input}
              />
            </View>
            <View>
              {/* NIC field */}

              <Text>NIC</Text>
              <TextInput
            // theme={theme}
                outlineColor='transparent'
                underlineColor="transparent"
                placeholder="2000344335343"
                // value={username}
                // onChangeText={setUsername}
                style={styles.input}
              />
            </View>
            <Button mode="contained" buttonColor="#FB9741" onPress={handleSignUp} style={styles.button}>
              Sign Up
            </Button>
            {/* Props pass to Sign in with google component */}
            <SignInWithGoogle signText1="_or Sign up with_" signText2="Have an account?" signState="Log in" />
                
          </View>
      
    </View>
  )
}

export default CustomerSignUpForm;

const styles = StyleSheet.create({
  //  style for whole container.
  registerContainer: {
    flex: 1,
    marginBottom:10,
    backgroundColor:'white',
    width: '100%'
  },
  innerContainer:{
    marginLeft: 40 ,
    width: '80%' // Width set to make space for both sides.
  },
  input: {
    
    width: '100%',
    height: 50,
    marginVertical: 8,
    backgroundColor: '#EDEDEC',
    // Set border radius 20 to all corners.
    borderRadius: 20, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20
  },
  confirmPassword:{
    marginVertical: 30
  },
})