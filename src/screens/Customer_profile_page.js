import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Surface, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { deleteCustomer } from "../services/CustomerService";



const Customer_profile_page = ({ navigation, route }) => {
  // Function to handle press event for the "Languages" section
  const [customer, setCustomer] = useState("");
 
 const handleDeleteAccount = () => {
   // Show confirmation alert
   Alert.alert(
     "Delete Account",
     "Are you sure you want to delete your account?",
     [
       {
         text: "No",
         style: "cancel",
       },
       {
         text: "Yes",
         onPress: () => {
           // Call deleteCustomer API
           deleteCustomer("aruran@example.com")
             .then((response) => {
               console.log("Account deleted successfully:", response.data);
               // Handle navigation or other actions after deletion
               navigation.navigate("Login");
             })
             .catch((error) => {
               console.error("Error deleting account:", error);
               // Handle error gracefully
               Alert.alert(
                 "Error",
                 "Failed to delete account. Please try again later."
               );
             });
         },
       },
     ]
   );
 };

  

  const handleAboutUs = () => {
    navigation.navigate("About_Us");
  };

  const handleLogout = async () => {
    try {
      // Log current AsyncStorage values
      const tokenValue = await AsyncStorage.getItem("token");
      const refreshTokenValue = await AsyncStorage.getItem("refreshToken");
      console.log(
        "Before logout - token:",
        tokenValue,
        "refreshToken:",
        refreshTokenValue
      );

      // Clear tokens from AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshToken");

      // Log to confirm removal
      console.log("After logout - tokens removed");

      // Navigate to Login screen
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error gracefully
    }
  };

  const handlePersonalDetails = () => {
    navigation.navigate("Customer_Personal_Details");
  };

  const handlePassword = () => {
    navigation.navigate("Change_Password");
  };

  return (
    <View>
      <ScrollView>
        {/* Profile section */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Profile title */}
          <Text
            style={{
              width: 320,
              height: 44,
              marginLeft: 15,
              marginTop: 28,
              fontWeight: "bold",
              fontSize: 24,
              color: "#101828",
            }}
          >
            My Profile
          </Text>
        </View>

       
        

        <Surface style={styles.surface} elevation={1}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 0,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                padding: 10,
                color: "#222222",
              }}
            >
              Personal Details
            </Text>
            <TouchableOpacity onPress={handlePersonalDetails}>
              {/* Button to navigate to language settings */}
              {/* <View style={{ flex: 1, alignItems: "flex-end" }}> */}
              <FontAwesomeIcon
                icon={faChevronRight}
                size={18}
                style={{ marginLeft: 135 }}
              />
            </TouchableOpacity>
          </View>
        </Surface>

        {/* Surface for settings */}
        <Surface style={styles.surface} elevation={1}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              padding: 10,
              color: "#222222",
            }}
          >
            Settings
          </Text>

         
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              <Icon
                name="lock"
                size={20}
                color="#505151"
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontSize: 16, padding: 10, color: "#888888" }}>
                Change Password
              </Text>
            </View>
            <TouchableOpacity onPress={handlePassword}>
              {/* Button to navigate to language settings */}
              {/* <View style={{ flex: 1, alignItems: "flex-end" }}> */}
              <FontAwesomeIcon
                icon={faChevronRight}
                size={18}
                style={{ marginLeft: 97 }}
              />
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </Surface>

        {/* Surface for other settings */}
        <Surface style={styles.thirdSurface} elevation={1}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              padding: 10,
              color: "#222222",
            }}
          >
            Others
          </Text>
          {/* About Us option */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              <Icon
                name="info-circle"
                size={20}
                color="#505151"
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontSize: 16, padding: 10, color: "#888888" }}>
                About Us
              </Text>
            </View>
            <TouchableOpacity onPress={handleAboutUs}>
              {/* Button to navigate to About Us section */}
              {/* <View style={{ flex: 1, alignItems: "flex-end" }}> */}
              <FontAwesomeIcon
                icon={faChevronRight}
                size={18}
                style={{ marginLeft: 154 }}
              />
            </TouchableOpacity>
            {/* </View> */}
          </View>

          {/* Logout option */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              <Icon
                name="sign-out"
                size={20}
                color="#F15C5C"
                style={{ marginRight: 10 }}
              />
              <TouchableOpacity onPress={handleLogout}>
                <Text style={{ fontSize: 16, padding: 10, color: "#888888" }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              <Icon
                name="trash"
                size={20}
                color="#F15C5C"
                style={{ marginRight: 10 }}
              />
              <TouchableOpacity onPress={handleDeleteAccount}>
                <Text style={{ fontSize: 16, padding: 10, color: "#888888" }}>
                  Delete Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default Customer_profile_page;

// Styles for different surfaces
const styles = StyleSheet.create({
  surface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 30,
    padding: 5,
    height: "auto",
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
    backgroundColor: "#fff",
  },

  thirdSurface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 25,
    padding: 5,
    height: "auto",
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
    marginBottom: 30,
    backgroundColor: "#fff",
  },
});

