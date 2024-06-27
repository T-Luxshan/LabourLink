import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet, TouchableOpacity,
  Alert,
} from "react-native";
import { getLabourById, updateLabour } from "../services/LabourService";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Personal_Details = ({ navigation }) => {
  const [nic, setNic] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  
  const [labourEmail, setLabourEmail] = useState("");
  // const email = "Vanaiyan@example.com";

 

   useEffect(() => {
     const fetchLabourEmail = async () => {
       try {
         const email = await AsyncStorage.getItem("userEmail");
         if (email) {
           setLabourEmail(email);
         } else {
           console.log("No email found in AsyncStorage");
         }
       } catch (error) {
         console.log("Error fetching email from AsyncStorage:", error);
       }
     };

     fetchLabourEmail();
   }, []);


  useEffect(() => {
    // Fetch existing Labour data when component mounts
    fetchLabourData();
  }, []);

  const fetchLabourData = async () => {
    try {
      const response = await getLabourById(labourEmail); // Replace with actual email or dynamic value
      const { name, mobileNumber, nic} = response.data;
      setName(name);
     setMobileNumber(mobileNumber);
     setNic(nic);
     
     
    } catch (error) {
      console.error("Error fetching Labour data:", error);
      Alert.alert("Error", "Failed to fetch Labour details.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateLabour(
        email,
        nic,
        mobileNumber,
        name,
       
      );
      console.log("Labour updated:", response.data);
      Alert.alert("Success", "Labour details updated successfully.");
      navigation.navigate("Labour_profile_page");
    } catch (error) {
      console.error("Error updating labour data:", error);
      Alert.alert("Error", "Failed to update labour details.");
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
          <Text style={styles.label}>NIC Number</Text>
          <TextInput
            style={styles.input}
            value={nic}
            onChangeText={setNic}
            placeholder="Enter NIC Number"
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

export default Personal_Details;