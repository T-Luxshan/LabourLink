import React, { useState } from 'react';
import { View } from "react-native";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';


const RegisterToggleHead = () => {
    const [role, setRole] = useState(null);

    const handleRoleSelection = () => {
        // Implement login logic here
        if (role === 'customer') {
            // <CustomerSignUpForm/>
          // Proceed with login based on selected role
          console.log('Selected role:', role);
        } else {
          // <LabourSignUpForm/>
          // Display an error message indicating that a role must be selected
          console.log('Please select a role');
        }
    }


  

    return(
        <View style={styles.toggleHeadContainer}>
            
            <View >
                  <Text  style={{ fontWeight: '600',
                         fontSize: 32, 
                         textAlign:'center', marginTop:60}}>Labour <Text style={{ color: '#F97300',textAlign:'center', marginTop:10 }}>LINK</Text></Text>
            </View>
            <View>
                <Text style={{fontWeight: '500',fontSize: 20,
                        marginTop:0, textAlign:'center'}}>Create your own account</Text>
            </View>
            <View style={styles.toggleButtonContainer}>
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.cButton, role === 'customer' && styles.activeButton]}
                    onPress={() => setRole('customer')}>
                    <Text style={[styles.toggleButtonText, styles.cButton, role === 'customer' && styles.activeButtonText]}>Customer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleButton, styles.lButton, role === 'labour' && styles.activeButton]}
                    onPress={() => setRole('labour')}>
                    <Text style={[styles.toggleButtonText, role === 'labour' && styles.activeButtonText]}>Labour</Text>
                  </TouchableOpacity>
                </View>
                
               
        </View>
)};

export default RegisterToggleHead;


const styles = StyleSheet.create({
    
    toggleButtonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 40
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
})