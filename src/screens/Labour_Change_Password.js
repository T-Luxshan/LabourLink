import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { updateLabourPassword, getLabourById } from "../services/LabourService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Labour_Change_Password = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [labourEmail, setLabourEmail] = useState("");



  useEffect(() => {
    const fetchLabourEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          setLabourEmail(email.toLowerCase());
        } else {
          console.log("No email found in AsyncStorage");
        }
      } catch (error) {
        console.log("Error fetching email from AsyncStorage:", error);
      }
    };

    fetchLabourEmail();
  }, []);

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

   updateLabourPassword(labourEmail, newPassword)
     .then((response) => {
       console.log("Password updated successfully:", response.data);
       Alert.alert(
         "Password Updated",
         "Your password has been updated successfully."
       );

       // Fetch the updated user data to confirm password update
       getLabourById(labourEmail)
         .then((response) => {
           console.log("Updated user data:", response.data);
         })
         .catch((error) => {
           console.error("Error fetching updated user data:", error);
         });

       setCurrentPassword("");
       setNewPassword("");
       setConfirmPassword("");
       setErrorMessage("");
       navigation.navigate("Labour_profile_page"); // Navigate to desired screen
     })
     .catch((error) => {
       console.error("Error updating password:", error);
       Alert.alert(
         "Error",
         "Failed to update password. Please try again later."
       );
     });
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

export default Labour_Change_Password;
