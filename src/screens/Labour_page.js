import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Surface, Avatar, Icon } from "react-native-paper";
import LabourService from "../services/LabourService"


// Functional component definition
const Labour_page = ({ navigation }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");
  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [totalServices, setTotalServices] = useState(0);
  const [rating, setRating] = useState(0);
  const [aboutMe, setAboutMe] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");


  useEffect(() => {
    const email = "example@example.com"; // Replace with dynamic value if needed
    LabourService.getLabourById(email)
      .then((response) => {
        const data = response.data;
        setName(data.name);
        setJobRole(data.jobRole);
        setTotalServices(data.totalServices);
        setRating(data.rating);
        setAboutMe(data.aboutMe);
        setMobileNumber(data.mobileNumber);
      })
      .catch((error) => {
        console.error("Error fetching labour data:", error);
      });
  }, []);

  
  // Function to handle languages press
  const handleLanguagesPress = () => {
    console.log("Languages section pressed");
  };

  const handleViewAllPress = () => {
    navigation.navigate("Previous_Work_History");
  };

  const handleAppointmentPress = () => {
    navigation.navigate("Appointment");
  };

  // Component rendering
  return (
    <View style={styles.container}>
      {/* ScrollView for scrolling content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        stickyHeaderIndices={[0]} // Make the header sticky
      >
        {/* Header section with user information */}
        <View style={styles.fixedHeader}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Avatar.Image
              size={150}
              source={require("../assets/Images/boy.png")}
              style={{ marginLeft: 0, marginTop: 35 }}
            />

            <Text style={{ fontSize: 18, fontWeight: 500, marginTop: 5 }}>
              {name || "Ayshmankura Shan"}
            </Text>

            <Text style={{ fontSize: 20, fontWeight: 200, marginLeft: 20 }}>
              {jobRole || "Driver"} <Icon source="pencil-outline" size={20} />
            </Text>
          </View>
        </View>

        {/* Statistics section */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  marginRight: 20,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: 500, color: "#464255" }}
                >
                  {totalServices || 180}
                </Text>
                <Text style={{ fontSize: 13 }}>Total Services</Text>
              </View>

              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: 500, color: "#464255" }}
                >
                  {rating || 4.5}
                </Text>
                <Text style={{ fontSize: 13 }}>Rating</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Me section */}
        <View style={{ marginTop: 15 }}>
          <Surface
            style={{
              ...styles.surface,
              borderRadius: 20,
              marginLeft: 15,
              marginTop: 25,
              padding: 5,
              height: 250,
              width: 345,
              alignItems: "flexStart",
              justifyContent: "flexStart",
            }}
            elevation={1}
          >
            <Text
              style={{
                color: "#FF7600",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              About Me
              <Icon source="pencil-outline" size={20} />
            </Text>

            {/* Description */}
            <Text
              style={{
                paddingTop: 5,
                lineHeight: 20,
                marginLeft: 30,
                color: "#2F3239",
              }}
            >
              {aboutMe ||
                `Experienced Driver with over two decades of dedicated service
  since the year 2000. Possessing a strong track record of safe
  driving, punctuality, and excellent knowledge of local and
  regional routes.`}
            </Text>

            {/* Contact details */}
            <Text
              style={{
                color: "#FF7600",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Contact Detail
            </Text>

            <Text style={{ paddingTop: 5, marginLeft: 30, color: "#41434A" }}>
              <Icon source="phone-outline" size={20} />
              {mobileNumber || "+92 1234567890"}
            </Text>
          </Surface>
        </View>

        {/* Appointments section */}
        <View style={{ marginTop: 15 }}>
          <Surface
            style={{
              ...styles.surface,
              borderRadius: 20,
              marginLeft: 15,
              marginTop: 25,
              padding: 5,
              height: 150,
              width: 345,
              alignItems: "flexStart",
              justifyContent: "flexStart",
            }}
            elevation={1}
          >
            <Text
              style={{
                color: "#FF7600",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Appointments
            </Text>

            {/* Appointment details */}
            <Text
              style={{
                paddingTop: 10,
                marginLeft: 30,
                fontSize: 15,
                fontWeight: 500,
                color: "#2F3239",
              }}
            >
              Customer Name: Mr.Perera
            </Text>

            <Text style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}>
              @29.12.2023| 10 am-2 p.m
            </Text>

            <Text
              style={{
                paddingTop: 15,
                marginLeft: 30,
                fontSize: 15,
                fontWeight: 500,
                color: "#2F3239",
              }}
            >
              Customer Name: Mr.Haru
            </Text>

            <Text style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}>
              @02.01.2024| 8 am-1 p.m
            </Text>
          </Surface>
        </View>

        {/* Previous Work History section */}
        <View style={{ marginTop: 15 }}>
          <Surface
            style={{
              ...styles.surface,
              borderRadius: 20,
              marginLeft: 15,
              marginTop: 25,
              padding: 5,
              height: 250,
              width: 345,
              alignItems: "flexStart",
              justifyContent: "flexStart",
              marginBottom: 30,
            }}
            elevation={1}
          >
            <Text style={{ marginLeft: 20 }}>
              <Text
                style={{
                  color: "#FF7600",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 10,
                  marginLeft: 20,
                  paddingLeft: 20,
                }}
              >
                Previous Work History
              </Text>
              {"\t"}
              <TouchableOpacity onPress={handleViewAllPress}>
                <Text
                  style={{ color: "#25A9D2", textDecorationLine: "underline" }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </Text>

            {/* Previous work details */}
            <Text
              style={{
                paddingTop: 10,
                marginLeft: 30,
                fontSize: 15,
                fontWeight: 500,
                color: "#2F3239",
              }}
            >
              Customer Name: Mr.Shanthan
            </Text>

            <Text style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}>
              @20.12.2023| 10 am-2 p.m
            </Text>

            <Text
              style={{
                paddingTop: 15,
                marginLeft: 30,
                fontSize: 15,
                fontWeight: 500,
                color: "#2F3239",
              }}
            >
              Customer Name: Mrs.Shaar
            </Text>

            <Text style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}>
              @02.01.2023| 8 am-1 p.m
            </Text>

            <Text
              style={{
                paddingTop: 15,
                marginLeft: 30,
                fontSize: 15,
                fontWeight: 500,
                color: "#2F3239",
              }}
            >
              Customer Name: Mrs.Kulam
            </Text>

            <Text style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}>
              @01.12.2023| 02 pm-07 p.m
            </Text>

            <Text
              style={{
                paddingTop: 15,
                marginLeft: 30,
                fontSize: 15,
                fontWeight: 500,
                color: "#2F3239",
              }}
            >
              Customer Name: Mr.Shanthan
            </Text>

            <Text style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}>
              @11.11.2023| 11 am-03 p.m
            </Text>
          </Surface>
        </View>
      </ScrollView>

      {/* Button for appointment notification */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          paddingVertical: 0,
          borderTopWidth: 1,
          borderTopColor: "#EDEDED",
          zIndex: 1,
        }}
      >
        <Button
          icon="bell-badge-outline"
          mode="contained"
          onPress={handleAppointmentPress}
          style={{
            backgroundColor: "#FF7600",
            borderRadius: 30,
            height: 60,
            marginTop: 20,
            width: 345,
            marginLeft: 15,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
          contentStyle={{ flexDirection: "row-reverse" }}
          labelStyle={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Here's your appointment
        </Button>
      </TouchableOpacity>
    </View>
  );
};



// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  fixedHeader: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    zIndex: 10,
  },

  surface: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Exporting the component as default
export default Labour_page;