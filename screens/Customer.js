import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Surface, Icon, Searchbar, Avatar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

// Functional component definition
const Customer = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");

  // Function to handle languages press
  const handleLanguagesPress = () => {
    console.log("Languages section pressed");
  };

  // Component rendering
  return (
    <View>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image
          size={50}
          source={require("../assets/girl1.jpeg")}
          style={{ marginLeft: 10, marginTop: 28 }}
        />
        <View style={{ marginLeft: 15, marginTop: 28 }}>
          <Text style={{ fontSize: 13, fontWeight: "400", color: "#ADA4A5" }}>
            Welcome Back,
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#1D1617" }}>
            Stefani Wong
          </Text>
        </View>

        <View style={{ marginLeft: 100, marginTop: 28 }}>
          <Icon source="bell-outline" size={25} />
        </View>
        <View style={{ marginTop: 28, marginLeft: 20 }}>
          <Icon source="heart-outline" size={25} />
        </View>
      </View>

      {/* Search bar */}
      <View style={{ marginTop: 15 }}>
        <Searchbar
          style={{
            opacity: 0.5,
            borderRadius: 20,
            width: 350,
            marginLeft: 12,
          }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      {/* Booking details */}
      <View style={{ marginTop: 25 }}>
        {/* Surface for first booking */}
        <Surface
          style={{
            ...styles.surface,
            width: 350,
            marginLeft: 12,
            borderRadius: 20,
            height: 130,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          elevation={4}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <Avatar.Image
              size={90}
              source={require("../assets/boy.png")}
              style={{ marginTop: 0 }}
            />

            <View
              style={{
                marginLeft: 45,
                marginTop: 10,
              }}
            >
              {/* Customer name and role */}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#1D1617" }}
              >
                Williem Smith
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "400",
                  color: "#7B6F72",
                  marginTop: 3,
                }}
              >
                Driver
              </Text>
              {/* Button to accept booking */}
              <Button
                mode="contained"
                onPress={() => console.log("Pressed")}
                style={{
                  backgroundColor: "#E8F8EC",
                  borderRadius: 10,
                  marginTop: 5,
                }}
                textColor="#18B23C"
                fontWeight="600"
                fontSize="13"
              >
                Accept
              </Button>
            </View>
          </View>
        </Surface>
      </View>

      {/* Surface for second booking */}
      <View style={{ marginTop: 15 }}>
        <Surface
          style={{
            ...styles.surface,
            width: 350,
            marginLeft: 12,
            borderRadius: 20,
            height: 190,
            backgroundColor: "#FFFFFF",
            position: "relative",
          }}
          elevation={4}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              left: 25,
            }}
          >
            <Avatar.Image
              size={90}
              source={require("../assets/boy1.jpeg")}
              style={{ marginTop: -55 }}
            />

            <View
              style={{
                marginLeft: 45,
                marginTop: -45,
              }}
            >
              {/* Customer name and role */}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#1D1617" }}
              >
                Luther King
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "400",
                  color: "#7B6F72",
                  marginTop: 3,
                }}
              >
                Plumber
              </Text>
              <View>
                {/* Button to view pending booking */}
                <Button
                  mode="contained"
                  onPress={() => console.log("Pending Pressed")}
                  style={{
                    backgroundColor: "#FEEEF2",
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                  textColor="#F5295B"
                  fontWeight="600"
                  fontSize="13"
                >
                  Pending
                </Button>
              </View>
            </View>
          </View>

          {/* Buttons to cancel or reschedule booking */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* Button to cancel booking */}
            <Button
              mode="contained"
              onPress={() => console.log("Pressed")}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 30,
                borderColor: "#F5295B",
                borderWidth: 2,
                marginTop: 110,
              }}
              textColor="#F5295B"
              fontWeight="600"
              fontSize="13"
            >
              Cancel Booking
            </Button>

            {/* Button to reschedule booking */}
            <TouchableOpacity onPress={handleLanguagesPress}>
              <LinearGradient
                colors={["#FF841A", "#FDCA9E"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  borderRadius: 30,
                  marginTop: 110,
                  marginLeft: 20,
                  width: 160,
                  height: 40,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    paddingTop: 10,
                  }}
                >
                  Reschedule
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Surface>
      </View>
    </View>
  );
};

// Exporting the component as default
export default Customer;

// Styles for the component
const styles = StyleSheet.create({
  surface: {
    padding: 8,

    alignItems: "center",
    justifyContent: "center",
  },
});
