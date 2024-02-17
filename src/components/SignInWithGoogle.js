import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const SignInWithGoogle = (props) => {
  const navigation = useNavigation();
  const handleImageButtonPress = () => {
      console.log('Image button pressed');
      // Add your logic here
      };

      const handleSignUp = () => {
        if(props.signState === "Sign up")
          {
          navigation.navigate('ChooseRole')
        }else
        {
          navigation.navigate('Login')
        }
        console.log('signup pressed');
        // Add your logic here
        };
  return (
    <View style={styles.signInContainer}>
        <Text style={styles.signInText }>{props.signText1}</Text>
        <TouchableRipple onPress={handleImageButtonPress} style={styles.signInButton}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Images/google-logo3.png')}

              style={styles.image}
            />
        </View>
      </TouchableRipple>
      <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccountText}>{props.signText2}</Text>
          <TouchableRipple onPress={handleSignUp}>
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
    // padding: '180',
    
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dontHaveAccountText: {
    marginRight: 5, // Adjust spacing between text and link
  },
  signUpLink: {
    fontWeight: '600',
    color: '#F97300',
    textDecorationLine: 'underline',
  },
 

});

export default SignInWithGoogle;
