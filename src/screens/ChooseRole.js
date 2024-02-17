import React, { useState } from 'react';
import { View } from "react-native";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';



const ChooseRole = () => {
    const navigation = useNavigation();
    const [role, setRole] = useState(null);
    const [buttonTxt, setButtonTxt] = useState('Start!!');

    React.useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // const handleCustomerSignup = () => {
    //   navigation.navigate('CustomerSignUpForm');
    // };
    // const handleLabourSignup = () => {
    //   navigation.navigate('LabourSignUp');
    // };

    // const handSignUp = () => {
    //   // navigation.navigate('CustomerSignUpForm');
    // };

    const handleRoleSelection = (selectedRole) => {
      setRole(selectedRole);
      if (selectedRole === 'customer') {
          setButtonTxt('Hire!!');
      } else if (selectedRole === 'labour') {
          setButtonTxt('Work!!');
      }
  };

    const handleSignUp = () => {
      if (role === 'customer') {
          navigation.navigate('CustomerSignUpForm');
          
      } else if (role === 'labour') {
          navigation.navigate('LabourSignUp');
      } else {
          console.log('Please select a role');
      }
  };


     

    return(
        <View style={styles.toggleHeadContainer}>
            
            <View >
                  <Text  style={{ fontWeight: '600',
                         fontSize: 28, 
                         textAlign:'center', marginTop:300}}>Choose your role</Text>
            </View>
            
            <View style={styles.toggleButtonContainer}>
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.cButton, role === 'customer' && styles.activeButton]}
                    onPress={() => handleRoleSelection('customer')}>
                    <Text style={[styles.toggleButtonText, styles.cButton, role === 'customer' && styles.activeButtonText]}>Customer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.lButton, role === 'labour' && styles.activeButton]}
                    onPress={() => handleRoleSelection('labour')}>
                    <Text style={[styles.toggleButtonText, role === 'labour' && styles.activeButtonText]}>Labour</Text>
                  </TouchableOpacity>
            </View>
            <View>
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