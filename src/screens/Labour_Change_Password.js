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

  const validatePassword = (password) => {
    const minLength = /.{5,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /\d/;

     console.log("Password validation check:");
     console.log("minLength:", minLength.test(password));
     console.log("upperCase:", upperCase.test(password));
     console.log("lowerCase:", lowerCase.test(password));
     console.log("number:", number.test(password));

    return (
      minLength.test(password) &&
      upperCase.test(password) &&
      lowerCase.test(password) &&
      number.test(password)
    );
  };

 const handleChangePassword = () => {
   // Basic validation
   if (!currentPassword || !newPassword || !confirmPassword) {
     setErrorMessage("Please fill in all fields.");
     return;
   }

   if (!validatePassword(newPassword)) {
     setErrorMessage(
       "Password must be at least 5 characters long and include one uppercase letter, one lowercase letter, and one number."
     );
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
    <View style={styles.card}>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    alignSelf: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#0066CC",
    borderRadius: 5,
    height: 40,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 26,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Labour_Change_Password;
