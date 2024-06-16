import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Surface, Icon, Searchbar, Avatar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

// Functional component definition
const Customer_page = ({ navigation }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");

  // Function to handle languages press
  const handleLanguagesPress = () => {
    console.log("Languages section pressed");
  };

  const handleJobPressDriver = (job) => {
    navigation.navigate("Driver", { job });
  };
  const handleJobPressElectrician = (job) => {
    navigation.navigate("Electrician", { job });
  };
  const handleJobPressPlumber = (job) => {
    navigation.navigate("Plumber", { job });
  };
  const handleJobPressMechanic = (job) => {
    navigation.navigate("Mechanic", { job });
  };
  const handleJobPressMason = (job) => {
    navigation.navigate("Mason", { job });
  };
  const handleJobPressPainter = (job) => {
    navigation.navigate("Painter", { job });
  };
  const handleJobPressCarpenter = (job) => {
    navigation.navigate("Carpenter", { job });
  };
  const handleJobPressWelder = (job) => {
    navigation.navigate("Welder", { job });
  };




  // Component rendering
  return (
    <ScrollView>
      <View>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar.Image
            size={50}
            source={require("../assets/Images/girl1.jpeg")}
            style={{ marginLeft: 10, marginTop: 35 }}
          />
          <View style={{ marginLeft: 15, marginTop: 28 }}>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#ADA4A5" }}>
              Welcome Back,
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#1D1617" }}>
              Stefani Wong
            </Text>
          </View>

          <View style={{ marginLeft: 150, marginTop: 28 }}>
            <Icon source="bell-badge-outline" size={25} />
          </View>
        </View>

        {/* Special offer section */}
        <View style={{ marginTop: 30 }}>
          <Surface
            style={{
              ...styles.surface,
              width: 350,
              marginLeft: 12,
              borderRadius: 20,
              backgroundColor: "#FEE0C5",
              height: 150,
              flexDirection: "row",
            }}
            elevation={4}
          >
            <View
              style={{
                alignSelf: "flex-start",
                paddingLeft: 10,
                paddingTop: 20,
              }}
            >
              <Text>
                <Text style={{ fontSize: 18, fontWeight: 700 }}>
                  Get{" "}
                  <Text style={{ color: "#F30A49", fontSize: 26 }}>25% </Text>
                  Off on all
                </Text>
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 700 }}>Car rides</Text>
              <TouchableOpacity onPress={handleLanguagesPress}>
                <LinearGradient
                  colors={["#F41650", "#FB9E9F"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={{
                    borderRadius: 30,
                    marginTop: 10,
                    marginLeft: 0,
                    width: 150,
                  }}
                ></LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ alignSelf: "flex-end", flex: 1 }}>
              <View
                style={{
                  marginBottom: 20,
                  marginLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/Images/vehicle.png")}
                  style={{ width: 160, height: 140 }}
                />
              </View>
            </View>
          </Surface>
        </View>

        {/* Categories */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: 700,
              fontSize: 16,
              marginTop: 35,
              marginLeft: 15,
              color: "#101828",
            }}
          >
            Categories
          </Text>
          <TouchableOpacity onPress={handleLanguagesPress}>
            <Text
              style={{
                marginTop: 35,
                fontSize: 12,
                color: "#25A9D2",
                fontWeight: 500,
                marginRight: 15,
              }}
            >
              SEE ALL
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Images */}
        <View style={{ marginTop: 15 }}>
          <LinearGradient
            colors={["#FEE0C5", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              ...styles.surface,
              width: 350,
              marginLeft: 12,
              borderRadius: 20,
              padding: 5,
              height: 220,
              paddingLeft: 20,
            }}
          >
            <Surface
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              elevation={4}
            >
              {/* First row */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: -10,
                }}
              >
                {renderImage(
                  "Driver",
                  require("../assets/Images/driver.png"),
                  () => handleJobPressDriver("Driver")
                )}
                {renderImage(
                  "Electrician",
                  require("../assets/Images/electrician.png"),
                  () => handleJobPressElectrician("Electrician")
                )}
                {renderImage(
                  "Carpenter",
                  require("../assets/Images/carpenter.png"),
                  () => handleJobPressCarpenter("Carpenter")
                )}
                {renderImage(
                  "Painter",
                  require("../assets/Images/painter.png"),
                  () => handleJobPressPainter("Painter")
                )}
              </View>

              {/* Second row */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: -10,
                }}
              >
                {renderImage(
                  "Mason",
                  require("../assets/Images/mason.png"),
                  () => handleJobPressMason("Mason")
                )}
                {renderImage(
                  "Plumber",
                  require("../assets/Images/plumber.png"),
                  () => handleJobPressPlumber("Plumber")
                )}
                {renderImage(
                  "Mechanic",
                  require("../assets/Images/mechanic.png"),
                  () => handleJobPressMechanic("Mechanic")
                )}
                {renderImage(
                  "Welder",
                  require("../assets/Images/welder.png"),
                  () => handleJobPressWelder("Welder")
                )}
              </View>
            </Surface>
          </LinearGradient>
        </View>

        {/* Employee of the month section */}
        <Text
          style={{
            fontWeight: 700,
            fontSize: 16,
            marginTop: 25,
            marginLeft: 15,
          }}
        >
          Employee of the month
        </Text>

        <View style={{ marginTop: 15, marginBottom: 30 }}>
          <Surface
            style={{
              ...styles.surface,
              width: 350,
              marginLeft: 12,
              borderRadius: 20,
              height: 150,
              backgroundColor: "#FFFFFF",
            }}
            elevation={4}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar.Image
                size={90}
                source={require("../assets/Images/boy.png")}
                style={{ marginLeft: 25 }}
              />

              <View
                style={{
                  marginLeft: 35,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: "#1D1617" }}
                >
                  Williem Smith
                </Text>
                <Text
                  style={{ fontSize: 13, fontWeight: "400", color: "#7B6F72" }}
                >
                  Driver
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon source="star" size={20} color="#EEB854" />
                  <Icon source="star" size={20} color="#EEB854" />
                  <Icon source="star" size={20} color="#EEB854" />
                  <Icon source="star" size={20} color="#EEB854" />
                  <Icon source="star" size={20} color="#D9D9D9" />
                  <Text> 4.8</Text>
                </View>
              </View>
              <View style={{ marginTop: 20, marginLeft: 20 }}>
                <View style={{ marginLeft: 30 }}>
                  <Icon source="heart" size={20} color="#FF0000" />
                </View>
                <TouchableOpacity onPress={handleLanguagesPress}>
                  <Text
                    style={{
                      paddingTop: 40,
                      color: "#25A9D2",
                      marginRight: 30,
                    }}
                  >
                    View all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Surface>
        </View>
      </View>
    </ScrollView>
  );
};

export default Customer_page;

// Function to render individual category images
const renderImage = (text, source, onPress) => (

  <TouchableOpacity
    style={{
      width: "24%",
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center",
    }}
    onPress={onPress}
  >
    {/* Image */}
    <View style={{ marginTop: text === "Drivers" ? -15 : 0 }}>
      <Image source={source} style={styles.image} />
    </View>

    {/* Text */}
    <View>
      <Text
        style={{
          textAlign: "center",
          transform: [{ translateY: text === "Drivers" ? 10 : 5 }],
        }}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);


// Styles
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 25,
  },
});
