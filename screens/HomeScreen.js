import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Surface, Icon, Switch, Avatar } from "react-native-paper";

const HomeScreen = () => {
  // State for managing the switch toggle
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // Function to toggle the switch state
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // Function to handle press event for the "Languages" section
  const handleLanguagesPress = () => {
    console.log(" Languages section pressed ");
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
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          {/* User avatar */}
          <Avatar.Image
            size={60}
            source={require("../assets/boy.png")}
            style={{ marginLeft: 15 }}
          />
          {/* User details */}
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#222222" }}>
              Ayshmankura shan
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "400", color: "#888888" }}>
              Joined since{" "}
              <Text style={{ fontWeight: "600", color: "#232323" }}>
                27 Dec 2020
              </Text>{" "}
            </Text>
          </View>
          {/* Button to edit profile */}
          <TouchableOpacity onPress={handleLanguagesPress}>
            <Button
              mode="contained"
              onPress={() => console.log("Pressed")}
              style={{ width: 90, marginLeft: 20, backgroundColor: "#00204A" }}
            >
              Edit
            </Button>
          </TouchableOpacity>
        </View>

        {/* Surface for settings */}
        <Surface style={styles.surface} elevation={1}>
          <Text
            style={{
              fontSize: 15,
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
              <Icon source="earth" size={20} color="#505151" />
              <Text style={{ fontSize: 14, padding: 10, color: "#888888" }}>
                Languages
              </Text>
            </View>
            {/* Button to navigate to language settings */}
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={handleLanguagesPress}>
                <Icon
                  source="chevron-right"
                  size={20}
                  style={{ paddingLeft: 80 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Location option */}
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
              <Icon source="heart-outline" size={20} color="#505151" />
              <Text style={{ fontSize: 14, padding: 10, color: "#888888" }}>
                Location
              </Text>
            </View>

            {/* Button to navigate to location settings */}
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={handleLanguagesPress}>
                <Icon
                  source="chevron-right"
                  size={20}
                  style={{ paddingLeft: 50, color: "#555555" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Surface>

        {/* Surface for notification settings */}
        <Surface style={styles.secondSurface} elevation={1}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              padding: 10,
              color: "#222222",
            }}
          >
            Notification
          </Text>
          {/* Pop-up notification option */}
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
              <Icon source="bell-outline" size={20} color="#505151" />
              <Text style={{ fontSize: 14, padding: 10, color: "#888888" }}>
                Pop-up Notification
              </Text>
            </View>
            {/* Switch for toggling pop-up notifications */}
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              trackColor={{ false: "#D9D9D9", true: "#00204A" }}
              thumbColor={isSwitchOn ? "#FFFFFF" : "#FFFFFF"}
              style={{ transform: [{ scale: 0.7 }], marginLeft: 100 }}
            />
          </View>
        </Surface>
        {/* Surface for other settings */}
        <Surface style={styles.thirdSurface} elevation={1}>
          <Text
            style={{
              fontSize: 15,
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
              <Icon source="alert-circle-outline" size={20} color="#505151" />
              <Text style={{ fontSize: 14, padding: 10, color: "#888888" }}>
                About Us
              </Text>
            </View>
            {/* Button to navigate to About Us section */}
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={handleLanguagesPress}>
                <Icon
                  source="chevron-right"
                  size={20}
                  style={{ paddingLeft: 50, color: "#555555" }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Customer Service option */}
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
              <Icon source="headset" size={20} color="#505151" />
              <Text style={{ fontSize: 14, padding: 10, color: "#888888" }}>
                Customer Service
              </Text>
            </View>
            {/* Button to navigate to Customer Service section */}
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={handleLanguagesPress}>
                <Icon
                  source="chevron-right"
                  size={20}
                  style={{ paddingLeft: 50, color: "#555555" }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Invite Others option */}
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
              <Icon source="email-open-outline" size={20} color="#505151" />
              <Text style={{ fontSize: 14, padding: 10, color: "#888888" }}>
                Invite Others
              </Text>
            </View>

            {/* Button to invite others */}
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={handleLanguagesPress}>
                <Icon
                  source="chevron-right"
                  size={20}
                  style={{ paddingLeft: 50, color: "#555555" }}
                />
              </TouchableOpacity>
            </View>
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
              <Icon source="logout" size={20} color="#F15C5C" />
              <TouchableOpacity onPress={handleLanguagesPress}>
                <Text style={{ fontSize: 14, padding: 10, color: "#888888" }}>
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

export default HomeScreen;

// Styles for different surfaces
const styles = StyleSheet.create({
  surface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 30,
    padding: 5,
    height: 140,
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
  },

  secondSurface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 25,
    padding: 5,
    height: 100,
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
  },

  thirdSurface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 25,
    padding: 5,
    height: 200,
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
    marginBottom: 30,
  },
});
