import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleRole = () => {
  const [role, setRole] = useState(null);

  return (
    <View style={styles.toggleRoleContainer}>
      
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
      {/* <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          if (role) {
            // Proceed with login based on selected role
            console.log('Selected role:', role);
          } else {
            // Display an error message indicating that a role must be selected
            console.log('Please select a role');
          }
        }}
        disabled={!role}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleRoleContainer: {
    flex: 1,
    // marginBottom:700,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
 
  toggleButtonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#F97300',
    // borderRadius: 5 ,
    marginRight: 10,

   
  },
  lButton:{
    width: 120,
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 10,
  },
  cButton: {
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
 
});

export default ToggleRole;
