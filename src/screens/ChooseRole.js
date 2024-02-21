import React, { useState } from 'react';
import { View } from "react-native";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';


const ChooseRole = () => {
    const navigation = useNavigation();
    const [role, setRole] = useState(null); // state for toggle user role.
    const [buttonTxt, setButtonTxt] = useState('Start!!'); // state for toggle button text according to the role.
    
    React.useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // This Function will be called when the role toggling button is pressed. 
    const handleRoleSelection = (selectedRole) => {
      setRole(selectedRole); // Set the appropriate role when the respected button in selected.
      // Set the button text according to the role.
      if (selectedRole === 'customer') {
          setButtonTxt('Hire!!'); // Set button text when customer btn is pressed.
      } else if (selectedRole === 'labour') {
          setButtonTxt('Work!!'); // Set button text when labour btn is pressed.
      }
  };

    // This Function will be called when the sign up button is pressed. 
    const handleSignUp = () => {
      if (role === 'customer') {
          navigation.navigate('CustomerSignUpForm'); // Navigate to customer signup form
          
      } else if (role === 'labour') {
          navigation.navigate('LabourSignUp'); // Navigate to labour signup form
      } else {
          console.log('Please select a role'); // Future use, remove if it doesn't needed.
      }
  };

    return(
        <View style={styles.toggleHeadContainer}>
            <View >
                {/* Tittle of the page */}
                  <Text  style={{ fontWeight: '600',
                         fontSize: 28, 
                         textAlign:'center', marginTop:300}}>Choose your role</Text>
            </View>
            
            <View style={styles.toggleButtonContainer}>
              {/* Customer button */}
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.cButton, role === 'customer' && styles.activeButton]}
                    onPress={() => handleRoleSelection('customer')}>
                    <Text style={[styles.toggleButtonText, styles.cButton, role === 'customer' && styles.activeButtonText]}>Customer</Text>
                  </TouchableOpacity>
                {/* Labour button */}
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.lButton, role === 'labour' && styles.activeButton]}
                    onPress={() => handleRoleSelection('labour')}>
                    <Text style={[styles.toggleButtonText, role === 'labour' && styles.activeButtonText]}>Labour</Text>
                  </TouchableOpacity>
            </View>
            <View>
              {/* Button for navigate to the appropriate sign up page based on selected role */}
                <Button mode="contained" fontSize='24' buttonColor="#01214A" onPress={handleSignUp} style={styles.nextButton}>
                  Let's {buttonTxt} 
                </Button>
            </View>
        </View>
)};

export default ChooseRole;


const styles = StyleSheet.create({
    
    toggleButtonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 60,
        marginLeft: 40,
        alignItems:'center',
        justifyContent: ''
      },
      toggleButton: {
       
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#F97300',
        // borderRadius: 5 ,
        marginRight: 10,
    
       
      },
      lButton:{
        textAlign: 'center',
        // paddingRight: 10,
        paddingHorizontal: 50,
        width: 160,
        borderTopLeftRadius: 0, 
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 10,
      },
      cButton: {
        width: 160,
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 0,
      },
      toggleButtonText: {
        fontSize: 16,
      },
      activeButton: {
        backgroundColor: '#F97300',
      },
      activeButtonText: {
        color: '#fff',
      },
      nextButton:{
        fontWeight:600,
        width:'60%',
        // height: 50,
        marginVertical: 30,
        marginHorizontal: 90
      }
})