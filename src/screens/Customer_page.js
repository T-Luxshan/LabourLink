import React, { useState, useEffect, useCallback } from "react";
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
import {getCustomerById} from "../services/CustomerService";
import {getLabourById} from "../services/LabourService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllReviews } from "../services/LabourReviewService";
import {
  getCompletedBookings,
  getAcceptedBookings,
} from "../services/CustomerBookingService";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

// Functional component definition
const Customer_page = ({ navigation }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");
  const [customerName, setCustomerName] = useState("");
  const [labour, setLabour] = useState("");
  const [topRatedEmployee, setTopRatedEmployee] = useState(null);
   const [completedBookings, setCompletedBookings] = useState([]);
   const [upcomingServices, setUpcomingServices] = useState([]);

  // const email = AsyncStorage.getItem('userEmail')

  const email = "aruran@example.com"; // Replace with dynamic value if needed
  const email2 = "lehaan@example.com";
  

  // Updated useEffect with error handling
  useEffect(() => {
    const fetchCustomerAndLabourData = async () => {
      try {
        // Fetch customer data by email
        const customerResponse = await getCustomerById(email);
        const customerData = customerResponse.data;
        setCustomerName(customerData.name);

        // Fetch completed bookings
        const completedBookingsResponse = await getCompletedBookings(email);
        const completedBookingsData = completedBookingsResponse.data;
        setCompletedBookings(completedBookingsData);



         const acceptedBookingsResponse = await getAcceptedBookings(email);
         setUpcomingServices(acceptedBookingsResponse);


        // Fetch all reviews
        const reviewsResponse = await getAllReviews();
        const reviewsData = reviewsResponse.data;

        // Calculate total sum of ratings for each labour
        const labourRatings = reviewsData.reduce((acc, review) => {
          if (!acc[review.labourName]) {
            acc[review.labourName] = {
              totalRating: 0,
              reviewCount: 0,
              labourRole: review.labourRole, // Assuming the job role is available in review data
            };
          }
          acc[review.labourName].totalRating += review.rating;
          acc[review.labourName].reviewCount += 1;
          return acc;
        }, {});

        // Find the labour with the highest total sum of ratings
        const topRatedLabour = Object.entries(labourRatings).reduce(
          (topLabour, [labourName, currentLabour]) => {
            return currentLabour.totalRating > (topLabour.totalRating || 0)
              ? { labourName, ...currentLabour }
              : topLabour;
          },
          {}
        );

        setTopRatedEmployee(topRatedLabour);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle specific error scenarios, e.g., display error message to user
      }
    };

    fetchCustomerAndLabourData();
  }, []);

  // Function to handle languages press
  const handleLanguagesPress = () => {
    console.log("Languages section pressed");
  };

  const handleJobPress = (jobCategory) => {
    console.log(`Job category pressed: ${jobCategory}`);
  };

  const handleViewAllPress = () => {
    navigation.navigate("Work_History", {
      completedBookings: completedBookings,
    });
  };

  const handleViewPress = () => {
    navigation.navigate("Upcoming_Services", {
      upcomingServices: upcomingServices,
    });
   
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
              {customerName}
            </Text>
          </View>

          {/* <View style={{ marginLeft: 150, marginTop: 28 }}>
            <Icon source="bell-badge-outline" size={25} />
          </View> */}
        </View>

        {/* Employee of the month section */}
        <Text
          style={{
            fontWeight: 700,
            fontSize: 16,
            marginTop: 40,
            marginLeft: 15,
          }}
        >
          Top Rated Employee
        </Text>

        <View style={{ marginTop: 15, marginBottom: 30 }}>
          {topRatedEmployee && (
            <Surface
              style={{
                ...styles.surface,
                width: 350,
                marginLeft: 12,
                borderRadius: 20,
                height: 150,
                backgroundColor: "#fff",
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
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#1D1617",
                    }}
                  >
                    {topRatedEmployee.labourName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      color: "#7B6F72",
                    }}
                  >
                    {topRatedEmployee.labourRole}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <AntDesign
                        key={index}
                        name={
                          index <
                          topRatedEmployee.totalRating /
                            topRatedEmployee.reviewCount
                            ? "star"
                            : "staro"
                        }
                        size={24}
                        color="#FF7600"
                      />
                    ))}
                    <Text> {topRatedEmployee.totalRating}</Text>
                  </View>
                </View>

                <View style={{ marginRight: 15, marginTop: 50 }}>
                  <Icon source="heart" size={20} color="#FF0000" />
                </View>
              </View>
            </Surface>
          )}
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
              marginTop: 10,
              marginLeft: 15,
              color: "#101828",
            }}
          >
            Categories
          </Text>
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
                  () => handleJobPress()
                )}
                {renderImage(
                  "Electrician",
                  require("../assets/Images/electrician.png"),
                  () => handleJobPress()
                )}
                {renderImage(
                  "Carpenter",
                  require("../assets/Images/carpenter.png"),
                  () => handleJobPress()
                )}
                {renderImage(
                  "Painter",
                  require("../assets/Images/painter.png"),
                  () => handleJobPress()
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
                  () => handleJobPress()
                )}
                {renderImage(
                  "Plumber",
                  require("../assets/Images/plumber.png"),
                  () => handleJobPress()
                )}
                {renderImage(
                  "Mechanic",
                  require("../assets/Images/mechanic.png"),
                  () => handleJobPress()
                )}
                {renderImage(
                  "Welder",
                  require("../assets/Images/welder.png"),
                  () => handleJobPress()
                )}
              </View>
            </Surface>
          </LinearGradient>
        </View>

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
                Upcoming Services
              </Text>
              {"\t"}
              <TouchableOpacity onPress={handleViewPress}>
                <Text style={{ color: "blue" }}>View All</Text>
              </TouchableOpacity>
            </Text>


            {upcomingServices.length === 0 ? (
              <Text
                style={{
                  paddingTop: 10,
                  marginLeft: 30,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#2F3239",
                  opacity: 0.5,
                }}
              >
                No appointments found
              </Text>
            ) : (
            
            upcomingServices.slice(0, 3).map((booking, index) => (
              <View key={index}>
                <Text
                  style={{
                    paddingTop: 10,
                    marginLeft: 30,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#2F3239",
                  }}
                >
                  Labour Name: {booking.labourName}
                </Text>

                <Text
                  style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}
                >
                  {booking.jobRole} | @{booking.date} | {booking.startTime}
                </Text>
              </View>
            )))}
          </Surface>
        </View>

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
                Work History
              </Text>
              {"\t"}
              <TouchableOpacity onPress={handleViewAllPress}>
                <Text style={{ color: "blue" }}>View All</Text>
              </TouchableOpacity>
            </Text>

            {completedBookings.length === 0 ? (
              <Text
                style={{
                  paddingTop: 10,
                  marginLeft: 30,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#2F3239",
                  opacity: 0.5,
                }}
              >
                No previous work history found
              </Text>
            ) : (

           
            completedBookings.slice(0, 3).map((booking, index) => (
              <View key={index}>
                <Text
                  style={{
                    paddingTop: 10,
                    marginLeft: 30,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#2F3239",
                  }}
                >
                  Labour Name: {booking.labourName}
                </Text>

                <Text
                  style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}
                >
                  {booking.jobRole} | @{booking.appointmentDate} |
                  {booking.appointmentTime}
                </Text>
              </View>
            )))}
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
