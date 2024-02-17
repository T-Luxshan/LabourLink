import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Title, ToggleButton, Checkbox, Image } from 'react-native-paper';
import { TouchableRipple, IconButton } from 'react-native-paper';
import SignInWithGoogle from '../components/SignInWithGoogle'
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [hidePassword, setHidePassword] = useState(true);

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    
    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye') {
          setRightIcon('eye-slash');
          setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-slash') {
          setRightIcon('eye');
          setPasswordVisibility(!passwordVisibility);
      }
  };

    const togglePasswordVisibility = () => {
      setHidePassword(!hidePassword);
    };


    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };

    const handleLogin = () => {
      // Implement login logic here
      console.log('Username:', username);
      console.log('Password:', password);
    };

    const handleGoogleSignIn = () => {
      // Handle Google sign-in logic here
    };

    const handleImageButtonPress = () => {
      // Handle button press logic here
      console.log('Image button pressed');
    };
    const handleForgotPassword = () => {
      // Handle button press logic here
      console.log('Forgot Password  pressed');
    };
    
    const theme = {
      colors: {
        primary: 'white', 
      },
    };
    
    return (
              <View style={styles.container}>
                <View style={styles.innerContainer}>

                

                {/* toggle between customer and labour */}
                {/* <Title>Login to your account</Title> */}
                <View >
       
                  <Text  style={{ fontWeight: '600', fontSize: 40, marginBottom: 0, textAlign:'center'}}>Labour <Text style={{ color: '#F97300' }}>LINK</Text></Text>
                </View>
                
                <Text style={styles.PageTitle}>Login to your account</Text>
                <ToggleButton.Row style={styles.ToggleContainer}
                  onValueChange={newValue => setRole(newValue)}
                  value={role}>
                  <ToggleButton value="customer">Customer</ToggleButton>
                  <ToggleButton value="labour">Labour</ToggleButton>
                </ToggleButton.Row>

                {/* Toggle handleling button needed */}



                {/* <Button
                    mode="contained"
                    onPress={() => {
                      if (role) {
                        // Proceed with login based on selected role
                        console.log('Selected role:', role);
                      } else {
                        // Display an error message indicating that a role must be selected
                        console.log('Please select a role');
                      }
                    }}
                    disabled={!role} // Disable the button if no role is selected
                    style={{ marginTop: 20 }}>
                    Login
              </Button> */}


              <View>
                  <Text>Email</Text>
                  <TextInput
                  //   label="Username"
                  // mode="outlined"
                  // editable={false}
                theme={theme}
                  outlineColor='transparent'
                    underlineColor="transparent"
                    placeholder="example@gmail.com"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                  />
              </View>
              <View>
                <Text>Password</Text>
                <TextInput
                //   label="Psw"
                  theme={theme}
                  underlineColor="transparent"
                  value={password}
                  onChangeText={setPassword}

                  secureTextEntry={hidePassword}
                  right={
                    <TextInput.Icon
                      name={hidePassword ? 'eye-off' : 'eye'}
                      onPress={togglePasswordVisibility}
                      
                    />}
                          style={styles.input}
                        />
         </View>
                <View style={styles.linksContainer}>
                  <TouchableRipple onPress={handleForgotPassword}>
                    <Text style={styles.forgotPsw}>Forgot password?</Text>
                  </TouchableRipple>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => setRememberMe(!rememberMe)}
                    color="#F97300"/>
                  <Text>Remember me</Text>
                </View>
                
                <Button mode="contained" buttonColor="#FB9741" onPress={handleLogin} style={styles.button}>
                  Login
                </Button>
                <SignInWithGoogle />
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
    ToggleContainer:{
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'center',
     
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
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
    },
    link: {
      // marginBottom: 10 ,
      color: 'blue', // Change color to match hyperlink style
    },
  });
  