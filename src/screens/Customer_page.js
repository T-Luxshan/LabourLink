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
import { getProfilePicture } from "../services/ProfilePhotoService";
import { FontAwesome5 } from "@expo/vector-icons";
import { getLabourProfilePicture } from "../services/ProfilePhotoService";

// Functional component definition
const Customer_page = ({ navigation }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");
  const [customerName, setCustomerName] = useState("");
  const [labour, setLabour] = useState("");
  const [topRatedEmployee, setTopRatedEmployee] = useState(null);
   const [completedBookings, setCompletedBookings] = useState([]);
   const [upcomingServices, setUpcomingServices] = useState([]);
   const [profilePic, setProfilePic] = useState("");

   const[email, setEmail] = useState(""); 

  // const email = AsyncStorage.getItem('userEmail')

  // const email = "aruran@example.com"; // Replace with dynamic value if needed
  // const email2 = "lehaan@example.com";
  

   useEffect(() => {
     const fetchEmail = async () => {
       try {
         const email = await AsyncStorage.getItem("userEmail");
         if (email) {
           setEmail(email.toLowerCase());
         } else {
           console.log("No email found in AsyncStorage");
         }
       } catch (error) {
         console.log("Error fetching email from AsyncStorage:", error);
       }
     };

     fetchEmail();
   }, []);


  // Updated useEffect with error handling
  useFocusEffect(
     useCallback(() => {
    if (email) {
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

    const labourRatings = reviewsData.reduce((acc, review) => {
              if (!acc[review.labourName]) {
                acc[review.labourName] = {
                  totalRating: 0,
                  reviewCount: 0,
                  labourRole: review.labourRole, // Assuming the job role is available in review data
                  labourId: review.labourId,
                };
              }
              acc[review.labourName].totalRating += review.rating;
              acc[review.labourName].reviewCount += 1;
              return acc;
            }, {});

            // Calculate average rating and find the labour with the highest average rating
            const topRatedLabour = Object.entries(labourRatings).reduce(
              (topLabour, [labourName, currentLabour]) => {
                const averageRating =
                  currentLabour.totalRating / currentLabour.reviewCount;
                if (!topLabour || averageRating > topLabour.averageRating) {
                  return {
                    labourName,
                    averageRating,
                    totalRating: currentLabour.totalRating,
                    reviewCount: currentLabour.reviewCount,
                    labourRole: currentLabour.labourRole,
                    labourId: currentLabour.labourId
                  };
                }
                return topLabour;
              },
              null
            );

            setTopRatedEmployee(topRatedLabour);
            fetchProfilePhoto(topRatedLabour.labourId);
        // console.log(topRatedLabour);
        // console.log(topRatedEmployee);
          // }
        //  catch (error) {
        //   console.log("Error fetching data:", error);
        //   // Handle specific error scenarios, e.g., display error message to user
        // }
       
      getLabourProfilePicture()
        .then((res) => {
          setProfilePic(res.data.profileUri);
          console.log(res.data.profileUri);
        })
        .catch((error) => {
          console.log("Failed to fetch profile photo", error);
        });
      
      } catch (error) {
            console.log("Error fetching data:", error);
          }
        };

    fetchCustomerAndLabourData();
}}, [email]));



  // Function to handle languages press
  const handleLanguagesPress = () => {
    console.log("Languages section pressed");
  };

  const fetchProfilePhoto = (email) => {
    console.log('this is the email :',email);
    getLabourProfilePicture(email)
    .then(res=>{
      setProfilePic(res.data.profileUri)})
    .catch(err=>console.log("Failed to fetch profile pic"));
  }

  const handleJobPress = (jobCategory) => {
    console.log(`Job category pressed: ${jobCategory}`);
    navigation.navigate("MapViewScreen" ,{
        jobRole : jobCategory,
    });
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

 const renderStars = (rating) => {
   const fullStars = Math.floor(rating); // Full stars
   const decimalPart = rating - fullStars; // Decimal part of rating

   let halfStar = false;
   let emptyStars = 5 - Math.ceil(rating); // Remaining empty stars

   // Determine if there should be a half-star
   if (decimalPart >= 0.25 && decimalPart < 0.75) {
     halfStar = true;
   } else if (decimalPart >= 0.75) {
     halfStar = true;
     emptyStars -= 1;
   }

   // Render stars based on calculated values
   return (
     <View style={{ flexDirection: "row", alignItems: "center" }}>
       {[...Array(fullStars)].map((_, index) => (
         <FontAwesome5
           key={`full-${index}`}
           name="star"
           solid
           size={24}
           color="#FF7600"
         />
       ))}
       {halfStar && (
         <FontAwesome5
           key="half"
           name="star-half-alt"
           size={24}
           color="#FF7600"
         />
       )}
       {[...Array(emptyStars)].map((_, index) => (
         <FontAwesome5
           key={`empty-${index}`}
           name="star"
           size={24}
           color="#D3D3D3"
         />
       ))}
     </View>
   );
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
                  source={profilePic? { uri: profilePic }: require("../assets/Images/boy.png")}
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
                    {renderStars(
                      topRatedEmployee.averageRating
                    )}
                    <Text>
                      {(
                        topRatedEmployee.totalRating /
                        topRatedEmployee.reviewCount
                      ).toFixed(1)}
                    </Text>
                  </View>
                </View>

                <View style={{ marginRight: 15, marginTop: 0 }}>
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
                  () => handleJobPress("DRIVER")
                )}
                {renderImage(
                  "Electrician",
                  require("../assets/Images/electrician.png"),
                  () => handleJobPress("ELECTRICIAN")
                )}
                {renderImage(
                  "Carpenter",
                  require("../assets/Images/carpenter.png"),
                  () => handleJobPress("CARPENTER")
                )}
                {renderImage(
                  "Painter",
                  require("../assets/Images/painter.png"),
                  () => handleJobPress("PAINTER")
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
                  () => handleJobPress("MASON")
                )}
                {renderImage(
                  "Plumber",
                  require("../assets/Images/plumber.png"),
                  () => handleJobPress("PLUMBER")
                )}
                {renderImage(
                  "Mechanic",
                  require("../assets/Images/mechanic.png"),
                  () => handleJobPress("MECHANIC")
                )}
                {renderImage(
                  "Welder",
                  require("../assets/Images/welder.png"),
                  () => handleJobPress("WELDER")
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
              padding: 10,
              minHeight: 50,
              height: "auto",
              width: 345,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginBottom: 30,
              backgroundColor: "#fff",
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
                <Text style={{ color: "#0066CC" }}>View All</Text>
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
              ))
            )}
          </Surface>
        </View>

        <View style={{ marginTop: 15 }}>
          <Surface
            style={{
              ...styles.surface,
              borderRadius: 20,
              marginLeft: 15,
              marginTop: 25,
              padding: 10,
              height: "auto",
              minHeight: 50,
              width: 345,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginBottom: 30,
              backgroundColor: "#fff",
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
                <Text style={{ color: "#0066CC" }}>View All</Text>
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
              ))
            )}
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


