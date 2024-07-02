import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { getCustomerById, updateCustomer } from "../services/CustomerService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Customer_Personal_Details = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  // const email =  "aruran@example.com";

   useEffect(() => {
     const fetchEmail = async () => {
       try {
         const email = await AsyncStorage.getItem("userEmail");
         if (email) {
           setEmail(email.toLowerCase());
         } else {
           console.log("No email found in AsyncStorage");
         }
       } catch (error) {
         console.log("Error fetching email from AsyncStorage:", error);
       }
     };

     fetchEmail();
   }, []);


  useEffect(() => {
    if (email) {
    // Fetch existing Labour data when component mounts
    fetchCustomerData();
    }
  }, [email]);

  const fetchCustomerData = async () => {
    try {
      const response = await getCustomerById(email); // Replace with actual email or dynamic value
      const { name, mobileNumber, address } = response.data;
      setName(name);
      setMobileNumber(mobileNumber);
      setAddress(address);
    } catch (error) {
      // console.error("Error fetching Customer data:", error);
      Alert.alert("Error", "Failed to fetch Customer details.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateCustomer(name, address, email, mobileNumber);
      console.log("Customer updated:", response.data);
      Alert.alert("Success", "Customer details updated successfully.");
      navigation.navigate("Customer_profile_page");
    } catch (error) {
      // console.error("Error updating customer data:", error);
      Alert.alert("Error", "Failed to update customer details.");
    }
  };
  




  

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
          />
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
    </ScrollView>
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
    marginTop: 110,
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
    backgroundColor: "#0066CC",
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
