import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Surface, Icon, Avatar } from "react-native-paper";

// Functional component definition
const Worker = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");

  // Function to handle languages press
  const handleLanguagesPress = () => {
    console.log("Languages section pressed");
  };

  // Component rendering
  return (
    <View style={styles.container}>
      {/* ScrollView for scrolling content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo and app name */}
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Avatar.Image
            size={50}
            source={require("../assets/icon.jpg")}
            style={{ marginLeft: 0, marginTop: 30 }}
          />
          <Text style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>
            <Text style={{ color: "#0A0909" }}>Lab</Text>
            <Text style={{ color: "#FF7600" }}> App</Text>
          </Text>
        </View>

        {/* Schedule Appointment */}
        <View>
          <Text
            style={{
              color: "#FF7600",
              marginTop: 40,
              marginLeft: 20,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Schedule Appointment
          </Text>
        </View>
        {/* Appointment details */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
            marginTop: 10,
          }}
        >
          <Icon source="calendar" size={20} />
          <Text style={{ fontSize: 14, padding: 10, color: "#344154" }}>
            Monday December 31, 2023
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <Icon source="clock-outline" size={20} />
          <Text style={{ fontSize: 14, padding: 10, color: "#344154" }}>
            11:00 AM
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <Icon source="map-marker-outline" size={20} />
            <Text style={{ fontSize: 14, padding: 10, color: "#0D0D0D" }}>
              Kollupitiya, Colombo
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 40,
              fontSize: 12,
              color: "#25A9D2",
              textDecorationLine: "underline",
            }}
          >
            View map
          </Text>
        </View>

        {/* Client information */}
        <View style={{ marginTop: 15 }}>
          <Surface
            style={{
              ...styles.surface,
              borderRadius: 20,
              marginLeft: 15,
              marginTop: 25,
              padding: 5,
              height: 310,
              width: 345,
              alignItems: "flexStart",
              justifyContent: "flexStart",
              marginBottom: 10,
            }}
            elevation={1}
          >
            <Text
              style={{
                color: "#FF7600",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              Client Information
            </Text>
            {/* Client details */}
            <Text style={{ paddingTop: 15, paddingLeft: 10 }}>
              <Text style={{ fontWeight: 600, color: "#0A090A" }}>
                Full Name :
              </Text>
              <Text style={{ color: "#0A090A" }}> Samata Shin</Text>
            </Text>

            <Text
              style={{
                fontWeight: 600,
                paddingTop: 10,
                color: "#0A090A",
                paddingLeft: 10,
              }}
            >
              Job Description :
            </Text>
            <Text
              style={{
                paddingTop: 5,
                lineHeight: 20,
                color: "#2F3239",
                paddingLeft: 10,
              }}
            >
              I have a commitment in Colombo on the 31st of December and am
              seeking a professional driver for my personal vehicle on that day.
              The responsibilities will include picking me up and dropping me
              off in Colombo. I will need to be ready by 11 a.m. on the 30th of
              December. If you're available on that day and can assist, please
              let me know at your earliest convenience. I look forward to your
              prompt response.
            </Text>
          </Surface>
        </View>

        {/* Action buttons */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 50,
            }}
          >
            {/* Accept button */}
            <Button
              icon="phone-outline"
              mode="contained"
              onPress={() => console.log("Pressed")}
              style={{
                backgroundColor: "#00204A",
                borderRadius: 10,
                height: 40,
                marginTop: 10,
                width: 160,
                marginLeft: 15,
              }}
              contentStyle={{ flexDirection: "row-reverse" }}
              textColor="#FFFFFF"
              fontWeight="600"
              fontSize="13"
            >
              Accept
            </Button>

            {/* Ignore button */}
            <Button
              icon="comment-outline"
              mode="contained"
              onPress={() => console.log("Pressed")}
              style={{
                backgroundColor: "#00204A",
                borderRadius: 10,
                height: 40,
                marginTop: 10,
                width: 160,
                marginRight: 15,
              }}
              contentStyle={{ flexDirection: "row-reverse" }}
              textColor="#FFFFFF"
              fontWeight="600"
              fontSize="13"
            >
              Ignore
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Exporting the component as default
export default Worker;

// Styles for the component
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
