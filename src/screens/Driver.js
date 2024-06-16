import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Surface, Avatar, Icon } from "react-native-paper";

const Driver = ({ route }) => {
  const handleLanguagesPress = () => {
    console.log("Languages section pressed");
  };

  // Function to handle booking action
  const handleBookNow = () => {
    console.log("Book Now pressed");
    // Add navigation or booking logic here
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 15, marginBottom: 30 }}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Surface
            key={index}
            style={{
              ...styles.surface,
              width: 350,
              marginLeft: 12,
              borderRadius: 20,
              height: 150,
              backgroundColor: "#FFFFFF",
              marginTop: index === 0 ? 0 : 30,
            }}
            elevation={4}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar.Image
                size={90}
                source={require("../assets/Images/boy.png")}
                style={{ marginLeft: 25 }}
              />
              <View style={{ marginLeft: 35, marginTop: 20 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: "#1D1617" }}
                >
                  Williem Smith
                </Text>
                <View>
                  <Text
                    style={{ fontSize: 13, fontWeight: "400", color: "black" }}
                  >
                    Job Services:
                    <Text
                      style={{ fontSize: 13, fontWeight: 500, color: "black" }}
                    >
                      180
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {[...Array(4)].map((_, starIndex) => (
                    <Icon
                      key={starIndex}
                      source="star"
                      size={20}
                      color="#EEB854"
                    />
                  ))}
                  <Icon source="star" size={20} color="#D9D9D9" />
                  <Text> 4.8</Text>
                </View>
              </View>
            </View>
            {/* Book Now Button */}
            <TouchableOpacity
              onPress={handleBookNow}
              style={styles.bookNowButton}
            >
              <Text style={{ color: "#25A9D2", fontSize: 16 }}>Book Now</Text>
            </TouchableOpacity>
          </Surface>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    width: 350,
    marginLeft: 12,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  bookNowButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#25A9D2",
  },
});

export default Driver;
