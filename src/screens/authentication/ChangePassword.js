import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import PasswordModel from '../../components/PasswordModel';
import { changePassword } from '../../services/AuthService';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChangePassword = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { email, role } = route.params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true); 
  const [rightIcon, setRightIcon] = useState('eye-slash'); 
  const [errors, setErrors] = useState({});
  const [mState, setMState] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  // const email = "luckybraveboys@gmail.com";
  // const role = "CUSTOMER";  


  const theme = {
    colors: {
      primary: 'white', 
    },
  };

  const handleModel = (mState) => setMState(mState);
  
  // const hideDialogBox = () => {
  //   setDialogVisible(false) 
  //   setMState(false);
  // }

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password can't be empty"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required("Please confirm your password"),
  });

  const handlePasswordVisibility = () => {
    setRightIcon((prevState) => (prevState === 'eye' ? 'eye-slash' : 'eye'));
    setPasswordVisibility(!passwordVisibility);
  };

  const handleChangePassword = async () => {
    try {
      await schema.validate({ password, confirmPassword }, { abortEarly: false });
      setErrors({});

      changePassword(role, email, password, confirmPassword)
        .then(response =>{
          console.log(response);
          setDialogVisible(true);
          setMState(true);
        })
      // setDialogVisible(true);
      // setMState(true);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const handleOK = () => {
    navigation.navigate('Login')
  }

  return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView contentContainerStyle={[styles.forgotPasswordContainer, mState && { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <Image
            source={require('../../assets/Images/Ellipse3.png')}
            resizeMode="contain"
            style={styles.topImage}
          />
          <View style={styles.foreground}>
            <PasswordModel onMStateChange={handleModel} marginTop={250} Password={"Change Password"} />
            <View style={styles.inputContainer}>
              <View style={styles.password}>
                <TextInput
                  theme={theme}
                  underlineColor="transparent"
                  selectionColor="black"
                  placeholder="Password"
                  placeholderTextColor="#797979"  
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={passwordVisibility}
                  style={[styles.input, mState && { backgroundColor: '#797979'} ]} 
                />
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handlePasswordVisibility}
                >
                  <Icon name={rightIcon} size={20} color="black" />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.password}>
                <TextInput
                  theme={theme}
                  underlineColor="transparent"
                  placeholder="Confirm password"
                  placeholderTextColor="#797979"  
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={passwordVisibility}
                  style={[styles.input, mState && { backgroundColor: '#797979'} ]} 
                />
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handlePasswordVisibility}
                >
                  <Icon name={rightIcon} size={20} color="black" />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
            </View>

            {!mState && (
              <Button
                mode="contained"
                buttonColor={mState ? '#6D6D6D' : "#FB9741"}
                textColor={mState ? '#797979' : "white"}
                onPress={handleChangePassword}
                style={styles.btn}
                labelStyle={styles.buttonText}
              >
                Change Password
              </Button>
            )}
          </View>

          <Image
            source={require('../../assets/Images/Reset.png')}
            resizeMode="contain"
            style={[styles.bottomImage, mState && { opacity: 0.5 }]}
          />
        <PaperProvider>
          <Portal>
            <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}
            style={styles.DialogBox}>
              <Dialog.Title style={{color:'green', fontSize: 30, fontWeight:'bold',  marginTop: 30}}>Done :)</Dialog.Title>
              <Dialog.Content >
                <Text style={{ fontSize: 17, fontWeight:700, marginTop: 15, marginBottom:-10}}>Now you will be redirected to log in.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button labelStyle={{fontSize:21, fontWeight:'bold'}} textColor='#FB9741' onPress={handleOK}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          </PaperProvider>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotPasswordContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
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
    marginTop: 250,
    zIndex: 1,
  },
  inputContainer: {
    zIndex: -1,
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    backgroundColor: '#F2F4F7',
    color: 'red',
    borderRadius: 10,
    zIndex: 3,
  },
  btn: {
    zIndex: -1,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 30,
    zIndex: -1,
  },
  bottomImage: {
    width: 500,
    height: 500,
    position: 'absolute',
    top: 400,
    left: 0,
    zIndex: 0,
  },
  password: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: 15,
    top: 25,
    zIndex: 999,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  DialogBox:{
    backgroundColor:'white',
    position: 'absolute',
    right: -200,
    top: 15,
    // zIndex: 999,
    // height:180,
    width:350,
    zIndex: 800,
  }
});

export default ChangePassword;
