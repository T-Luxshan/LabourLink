import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TextInput, Headline, Button } from 'react-native-paper';
import * as yup from 'yup';
import { getUserRole, sendOTP } from '../../services/AuthService';
import { useNavigation, useRoute  } from '@react-navigation/native';


const ForgotPassword = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  
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
    const lowercasedEmail = email.toLowerCase();
    try {
        await schema.validate({ lowercasedEmail }, { abortEarly: false });
        setError('');

        try {
          let response = await getUserRole(lowercasedEmail);

          sendOTP(response.data, lowercasedEmail)
            .then(res =>{
              console.log(res);
            })
            .catch(error =>{
              setError("Error sending Email, Please try again in a few minutes")
              console.log('Error sending Email:', error.message);
            })
          navigation.navigate('OTPVerification', {
            email: lowercasedEmail,
            role: response.data
          })
        
        } catch (error) {
          setError("Email does not exist")
          console.log('Email does not exist:', error.message);
        }
         
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
    backgroundColor: 'white',
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
