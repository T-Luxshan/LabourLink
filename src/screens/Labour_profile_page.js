import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Surface, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";


const Labour_profile_page = ({ navigation }) => {
    
  // Function to handle press event for the "Languages" section
 const [name, setName] = useState("");
 const [image, setImage] = useState(null);

useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const storedName = await AsyncStorage.getItem("name");
      const storedImage = await AsyncStorage.getItem("image");

      if (storedName !== null) {
        setName(storedName);
      }

      if (storedImage !== null) {
        setImage(storedImage);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  fetchProfileData();
}, []);



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
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refreshToken");
    navigation.navigate("Login");
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
            source={require("../assets/Images/boy.png")}
            style={{ marginLeft: 15 }}
          />
          {/* User details */}
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#222222" }}>
              Ayshmankura shan
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
                style={{ marginLeft: 150 }}
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
                style={{ marginLeft: 160 }}
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
    height: 120,
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
  },

  thirdSurface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 25,
    padding: 5,
    height: 150,
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
    marginBottom: 30,
  },
});
