import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TextInput, Headline, Button } from 'react-native-paper';
import * as yup from 'yup';
import { getUserRole, sendOTP } from '../../services/AuthService';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState('');
  
  const theme = {
    colors: {
      primary: 'white', 
    },
  };

  const schema = yup.object().shape({
      email: yup
        .string()
        .email("This is not a valid email")
        .required('Email is required'),

  })

  const handleOTP = async () =>{
    try {
        await schema.validate({ email }, { abortEarly: false });
        setError('');
        getUserRole(email)
          .then(response =>{
            console.log(response.data);
            sendOTP(response.data, email);
          })
        
    } catch (error) {
        setError(error.message);
        console.log(error.message)
       
    }
  }

  return (
    <View style={styles.forgotPasswordContainer}>
        
        <Image
            source={require('../../assets/Images/Ellipse3.png')}
            resizeMode="contain"
            style={styles.topImage}
            />
        <View style={styles.foreground}>
            <Headline style={{fontWeight: 'bold'}}>Forgot Password? {'\n\n'}</Headline>
            
            <Text>No Problem! Enter your email below and we will send you an email 
                with the OTP to reset your password.</Text>
            <TextInput
                theme={theme}
                outlineColor='transparent'
                underlineColor="transparent"
                placeholder="example@gmail.com"
                value={email}
                onChangeText={setEmail} 
                style={styles.input}
            />
            {error && <Text style={{color:'red'}}>{error}</Text>}
            <Button mode="contained" buttonColor="#FB9741"  onPress={handleOTP} 
                style={styles.btn}  labelStyle={styles.buttonText}>
                Send OTP
            </Button>
      </View>
      
    <Image
      source={require('../../assets/Images/Letter.png')}
      resizeMode="cover"
       style={styles.bottomImage}
    />
    </View>
  )
}

export default ForgotPassword;

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    marginRight: 10,
    width: '100%', 
    height: 200,
    position: 'absolute', 
    top: -45, 
    left: 0,  
    zIndex: 0,
    transform: [{ rotate: '-2deg' }]
  },
  foreground: {
    width: '80%',
    marginRight: 0,
    marginBottom:120,
    zIndex: 1,
  },
  input: {
    marginTop: 20,
    backgroundColor: '#F2F4F7',
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10,  
  },
  btn:{
      height:50,
      marginTop:10,
      borderRadius: 10, 
      fontSize: 40,
    },
buttonText: {
    fontSize: 18,
    lineHeight: 30
    },
bottomImage:{
    // marginTop: 90,
    marginRight: 10,
    width: '100%', 
    height: 540,
    position: 'absolute', 
    top: 330, 
    left: 45, 
    zIndex: 0,
},
});
