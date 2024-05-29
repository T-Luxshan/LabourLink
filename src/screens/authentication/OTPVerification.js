import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { sendOTP, verifyOTP } from '../../services/AuthService';
import { useNavigation, useRoute } from '@react-navigation/native';


const OTPVerification = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { email, role } = route.params;

  const [error, setError] = useState('');
  const [otp, setOTP] = useState('');

  // for testing purpose.
  // const email = "luckybraveboys@gmail.com";
  // const role = "CUSTOMER";  

  

  const handleOTP = async () => {

    verifyOTP(role, otp, email)
      .then(response =>{
        setError('');
        console.log(response);
        // Navigate
        navigation.navigate('ChangePassword', {
          email: email,
          role: role
        })
      })
      .catch(error =>{
        setError("Verification failed");
        console.log(error);
      })
  };

  const resendOTP = () =>{
    
    sendOTP(role, email)
      .then(response =>{
        // Navigate
        console.log(response);
      })
      .catch(error =>{
        console.log(role);
        console.log(email);
        setError("Error sending Email, Please try again in few minutes")
        console.log('Error sending Email:', error.message);
      })
  }

  return (
    <View style={styles.forgotPasswordContainer}>
      <Image
        source={require('../../assets/Images/Ellipse3.png')}
        resizeMode="contain"
        style={styles.topImage}
      />
      <View style={styles.foreground}>
        <Text style={styles.foregroundText}>OTP has been sent to {email}</Text>
        <View style={styles.otpContainer}>
          <OTPInputView
            style={{ width: '100%', height: 70 }}
            pinCount={6}
            // autoFocusOnLoad // Removed this line
            codeInputFieldStyle={styles.blockStyleBase}
            // codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => setOTP(code)}
          />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
        
        <Button
          mode="contained"
          buttonColor="#FB9741"
          onPress={handleOTP}
          style={styles.btn}
          labelStyle={styles.buttonText}
        >
          Verify OTP
        </Button>
        <View style={styles.resendOTPContainer}>
          <View style={styles.resendOTP}>
            <Text>Didn't receive OTP?</Text>
            <Button textColor="#FB9741" mode="text" onPress={resendOTP}>
              Resend 
            </Button>
          </View>
        </View>
      </View>
      <Image
        source={require('../../assets/Images/otp.png')}
        resizeMode="cover"
        style={styles.bottomImage}
      />
    </View>
  );
};

export default OTPVerification;

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
    // left: 0,
    zIndex: 0,
    transform: [{ rotate: '-2deg' }],
  },
  foreground: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '90%',
    marginRight: 0,
    marginBottom: 120,
    zIndex: 1,
  },
  foregroundText: {
    marginBottom:40,
    textAlign: 'center',
    fontSize: 18,
  },
  otpContainer: {
    marginTop: 0,
  },
  btn: {
    height: 50,
    marginTop: 40,
    borderRadius: 10,
    fontSize: 40,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 30,
  },
  resendOTPContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  resendOTP: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomImage: {
    marginRight: 10,
    width: '100%',
    height: 380,
    position: 'absolute',
    top: 450,
    left: 45,
    zIndex: 0,
  },
  blockStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderRadius: 5,
    // borderBottomWidth: 0,
    // borderBottomColor: 'white',
    color: 'black', // Text color
    backgroundColor: '#F2F4F7',
  },
  // underlineStyleHighLighted: {
  //   borderBottomColor: 'white',
  //   // color: 'black', // Text color
  // },
});
