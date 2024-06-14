import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Surface, Icon, Avatar} from "react-native-paper";



  


const Labour_profile_page = ({ navigation }) => {
  
  
  // Function to handle press event for the "Languages" section
  const handleSelectLanguages = () => {
    navigation.navigate("Languages");
  };

   const handleAboutUs = () => {
     navigation.navigate("About_Us");
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
          {/* Icon for additional actions */}
          <Icon
            source="dots-horizontal-circle-outline"
            size={25}
            style={{ marginLeft: "auto" }}
          />
        </View>

        {/* User information section */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
        >
          {/* User avatar */}
          <Avatar.Image
            size={60}
            source={require("../assets/boy.png")}
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
          <TouchableOpacity>
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
          <TouchableOpacity onPress={handleSelectLanguages}>
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
                <Icon source="earth" size={20} color="#505151" />
                <Text style={{ fontSize: 16, padding: 10, color: "#888888" }}>
                  Languages
                </Text>
              </View>
              {/* Button to navigate to language settings */}
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Icon
                  source="chevron-right"
                  size={20}
                  style={{ paddingLeft: 80 }}
                />
              </View>
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={handleAboutUs}>
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
                <Icon source="alert-circle-outline" size={20} color="#505151" />
                <Text style={{ fontSize: 16, padding: 10, color: "#888888" }}>
                  About Us
                </Text>
              </View>
              {/* Button to navigate to About Us section */}
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Icon
                  source="chevron-right"
                  size={20}
                  style={{ paddingLeft: 50, color: "#555555" }}
                />
              </View>
            </View>
          </TouchableOpacity>

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
              <Icon source="logout" size={20} color="#F15C5C" />
              <TouchableOpacity>
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









