import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInWithGoogle from '../components/SignInWithGoogle'

import RegisterToggleHead from "../components/RegisterToggleHead"

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-slash');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
        setRightIcon('eye-slash');
        setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-slash') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
    }}

    const handleLogin = () => {
      // Implement login logic here
      // if (role) {
      //   // Proceed with login based on selected role
      //   console.log('Selected role:', role);
      // } else {
      //   // Display an error message indicating that a role must be selected
      //   console.log('Please select a role');
      // }
      // console.log('Username:', username);
      // console.log('Password:', password);
    };
  return(
    <View style={styles.registerCcontainer}>
      <RegisterToggleHead />
      <View style={styles.innerContainer}>
          <Text>Email</Text>
          <TextInput
          
        // theme={theme}
          outlineColor='transparent'
            underlineColor="transparent"
            placeholder="example@gmail.com"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />

          <View>
              <Text>Password</Text>
              <TextInput
              
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

            <View style={styles.confirmPassword}>
              <Text>Confirm password</Text>
              <TextInput
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
            <View>
              <Text>Mobile Number</Text>
              <TextInput
            // theme={theme}
                outlineColor='transparent'
                underlineColor="transparent"
                placeholder="0763443542"
                // value={username}
                // onChangeText={setUsername}
                style={styles.input}
              />
            </View>
            <View>
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
            <Button mode="contained" buttonColor="#FB9741" onPress={handleLogin} style={styles.button}>
              Login
            </Button>
            <SignInWithGoogle signText1="_or Sign up with_" signText2="Have an account" signState="Log in"/>
                
          </View>
      
    </View>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  registerCcontainer: {
    flex: 1,
    backgroundColor:'white',
    width: '100%'
    
  },
  innerContainer:{
    marginLeft: 40 ,
    width: '80%'
  },
  input: {
    width: '100%',
    height:45,
    marginVertical: 10,
    backgroundColor: '#EDEDEC',
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