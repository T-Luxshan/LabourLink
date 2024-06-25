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
import {
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getLabourProfileById } from "../services/LabourProfileService";
import { getLabourById, deleteLabour } from "../services/LabourService";
import { useLogin } from "../context/LoginProvider";



const Labour_profile_page = ({ navigation, route }) => {
    
  // Function to handle press event for the "Languages" section
 const [labour, setLabour] = useState("");
 const [labourProfile, setLabourProfile] = useState("");
 const [image, setImage] = useState(null);
const [name, setName] = useState("");
 const { setIsLoggedIn } = useLogin();



const labourEmail = "aruran@example.com"; // Replace with dynamic value if needed
const email2 = "Vanaiyan@example.com";
useEffect(() => {
  getLabourProfileById(labourEmail)
    .then((response) => {
      const data = response.data;
      setLabourProfile(data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching labourProfile name data:", error);
    });

  getLabourById(email2)
    .then((response) => {
      const data = response.data;
      setLabour(data);
      // setJobRole(data.jobRole);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching labour profile data:", error);
    });
}, []);


useEffect(() => {
  if (route.params?.name) {
    setName(route.params.name);
  }
  if (route.params?.image) {
    setImage(route.params.image);
  }
}, [route.params?.name, route.params?.image]);

const handleEditProfile = () => {
  navigation.navigate("Edit_Profile", { name, image});
};


  const handleSelectLanguages = () => {
    navigation.navigate("Languages");
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

      setIsLoggedIn(false);
      // Navigate to Login screen
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error gracefully
    }
  };

   const handlePersonalDetails = () => {
  navigation.navigate("Personal_Details");
};

const handlePassword = () => {
  navigation.navigate("Labour_Change_Password");
};

    const deleteAccountConfirmed = async () => {
      try {
        // Delete account using service function
        await deleteLabour(email2);

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

        setIsLoggedIn(false);
        // Navigate to Login screen
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error deleting account:", error);
        // Handle error gracefully
        // You can add specific error handling based on different error scenarios here
        // For example, displaying an alert to the user or logging more details
        Alert.alert("Error", "Failed to delete account. Please try again.");
      }
    };

    const handleDeleteAccount = () => {
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
            onPress: deleteAccountConfirmed,
          },
        ]
      );
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

        {/* User information section */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
        >
          {/* User avatar */}
          <Avatar.Image
            size={60}
            source={
              image ? { uri: image } : require("../assets/Images/boy.png")
            }
            style={{ marginLeft: 15 }}
          />
          {/* User details */}
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#222222" }}>
              {labour.name}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#888888" }}>
              Joined since{" "}
              <Text style={{ fontWeight: "600", color: "#232323" }}>
                27 Dec 2020
              </Text>{" "}
            </Text>
          </View>
          {/* Button to edit profile */}
          <TouchableOpacity onPress={handleEditProfile}>
            <Button
              mode="contained"
              style={{ width: 90, marginLeft: 10, backgroundColor: "#00204A" }}
            >
              Edit
            </Button>
          </TouchableOpacity>
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

          {/* Languages option */}

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
                name="globe"
                size={20}
                color="#505151"
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontSize: 16, padding: 10, color: "#888888" }}>
                Languages
              </Text>
            </View>
            <TouchableOpacity onPress={handleSelectLanguages}>
              {/* Button to navigate to language settings */}
              {/* <View style={{ flex: 1, alignItems: "flex-end" }}> */}
              <FontAwesomeIcon
                icon={faChevronRight}
                size={18}
                style={{ marginLeft: 143 }}
              />
            </TouchableOpacity>
            {/* </View> */}
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

export default Labour_profile_page;

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
  },
});
