import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Customer_Personal_Details = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSave = () => {
    // Handle the save action here, e.g., form validation, API call, etc.
    console.log("Address:", address);
    console.log("Mobile Number:", mobileNumber);

    navigation.navigate("Customer_profile_page");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
        />
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Customer_Personal_Details;
