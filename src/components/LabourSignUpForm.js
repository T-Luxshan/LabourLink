import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInWithGoogle from './SignInWithGoogle'


const CustomerSignUpForm = () => {
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

    const theme = {
      colors: {
        primary: 'white', 
      },
    };

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
    <View>
      <Text>Labour sign up</Text>
    </View>
  )
}

export default CustomerSignUpForm;

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    // marginTop:230,
    backgroundColor:'white',
    width: '100%'
  },
  innerContainer:{
    marginLeft: 40 ,
    width: '80%'
  },
  input: {
    
    width: '100%',
    height: 50,
    marginVertical: 8,
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