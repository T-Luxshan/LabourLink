import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const SignInWithGoogle = (props) => {
  const navigation = useNavigation(); //  to navigate between pages.  

  // Function for when google icon is pressed
  const handleImageButtonPress = () => {
      console.log('Image button pressed');
      // Add your logic here
      };

      // Funtion to navigate to appropriate screens.
      const handleSignUp_In = () => {
        // If the text is signup, it should redirect to "ChooseRole" screen.
        if(props.signState === "Sign up")
          {
          navigation.navigate('ChooseRole')
        // If the text is Login, it should redirect to "Login" screen.
        }else 
        {
          navigation.navigate('Login')
        }
        console.log('signup pressed'); // remove this after completing the logic.
        };

  return (
    <View style={styles.signInContainer}>
        {/* Text tittle for sign in/sign up */}
        <Text style={styles.signInText }>{props.signText1}</Text>
        {/* Make the image as a pressable button. */}
        <TouchableRipple onPress={handleImageButtonPress} style={styles.signInButton}>
          <View style={styles.imageContainer}>
            {/* Google logo png */}
            <Image
              source={require('../assets/Images/google-logo3.png')}

              style={styles.image}
            />
        </View>
      </TouchableRipple>
      <View style={styles.signUpContainer}>
        {/* bottom txt for sign in/sign up */}
          <Text style={styles.dontHaveAccountText}>{props.signText2}</Text>
          {/* Pressable text to navigate to appropriate screen */}
          <TouchableRipple onPress={handleSignUp_In}>
            {/* sign up/ sing in text */}
              <Text style={styles.signUpLink}>{props.signState}</Text>
          </TouchableRipple>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  signInContainer:{
    alignItems: 'center',
    
  },

  signInText: {
    textAlign:'center',
    marginVertical: 10,
  },
  signInButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    marginVertical: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  image: {
    width: '80%',
    height: '80%',
    
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dontHaveAccountText: {
    marginRight: 5, // Adjust spacing between text and link.
  },
  signUpLink: {
    fontWeight: '600',
    color: '#F97300',
    textDecorationLine: 'underline',
  },
 

});

export default SignInWithGoogle;
