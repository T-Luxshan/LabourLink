// ChangePassword.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Change_Password = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password must match.");
      return;
    }

    // Mock API call or logic to change password
    console.log("Changing password...");
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);

    // Clear form fields after successful password change
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");

    navigation.navigate("Labour_profile_page");

    // Optionally, you can navigate to another screen after successful password change
    // navigation.navigate('Home'); // Replace 'Home' with your desired screen name
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Current Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm New Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    height: 40,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default Change_Password;
