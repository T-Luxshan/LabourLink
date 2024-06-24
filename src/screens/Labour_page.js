import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Surface, Avatar, Icon } from "react-native-paper";
import { getLabourProfileById } from "../services/LabourProfileService";
import { getLabourById } from "../services/LabourService";
import { getRating } from "../services/LabourReviewService";
import {
  getCompletedAppointments,
  getAcceptedAppointments,
  updateBookingStage,
} from "../services/BookingService";

// Functional component definition
const Labour_page = ({ navigation, route }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");
  const [labour, setLabour] = useState( "" );
  const [labourProfile, setLabourProfile] = useState("");
  const [rating, setRating] = useState(0);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  const email = "lehaan@example.com"; // Replace with dynamic value if needed
  const labourEmail = "lehaan@example.com";

  // useEffect(() => {
  //   getLabourById(email)
  //     .then((response) => {
  //       const data = response.data;
  //       setLabour(data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching labour data:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   getLabourProfileById(labourEmail)
  //     .then((response) => {
  //       const data = response.data;
  //       setLabourProfile(data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching labourProfile data:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   const fetchRating = async () => {
  //     try {
  //       const ratingData = await getRating(email);
  //       setRating(ratingData); // Set the rating state with the fetched data
  //     } catch (error) {
  //       console.error("Error fetching rating:", error);
  //     }
  //   };

  //   fetchRating();
  // }, []);

  // useEffect(() => {
  //   const fetchCompletedAppointments = async () => {
  //     try {
  //       const completedAppointments = await getCompletedAppointments(
  //         labourEmail
  //       );

  //       setCompletedBookings(completedAppointments);
  //     } catch (error) {
  //       console.error("Error fetching completed appointments:", error);
  //     }
  //   };

  //   fetchCompletedAppointments();
  // }, []);

  // useEffect(() => {
  //   const fetchAcceptedAppointments = async () => {
  //     try {
  //       const acceptedAppointments = await getAcceptedAppointments(labourEmail);

  //       setAcceptedAppointments(acceptedAppointments);
  //       //  console.log("Accepted appointments:", acceptedAppointmentsData);
  //     } catch (error) {
  //       console.error("Error fetching accepted appointments:", error);
  //     }
  //   };

  //   fetchAcceptedAppointments();
  // }, []);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const labourResponse = await getLabourById(labourEmail);
         console.log("Labour Data:", labourResponse.data);
         setLabour(labourResponse.data);
       } catch (error) {
         console.error("Error fetching labour data:", error);
       }

       try {
         const labourProfileResponse = await getLabourProfileById(labourEmail);
         console.log("Labour Profile Data:", labourProfileResponse.data);
         setLabourProfile(labourProfileResponse.data);
       } catch (error) {
         console.error("Error fetching labour profile data:", error);
       }

       try {
         const ratingData = await getRating(labourEmail);
         console.log("Rating Data:", ratingData);
         setRating(ratingData);
       } catch (error) {
         console.error("Error fetching rating:", error);
       }

       try {
         const completedAppointments = await getCompletedAppointments(
           labourEmail
         );
         console.log("Completed Appointments:", completedAppointments);
         setCompletedBookings(completedAppointments);
       } catch (error) {
         console.error("Error fetching completed appointments:", error);
       }

       try {
         const acceptedAppointments = await getAcceptedAppointments(
           labourEmail
         );
         console.log("Accepted Appointments:", acceptedAppointments);
         setAcceptedAppointments(acceptedAppointments);
       } catch (error) {
         console.error("Error fetching accepted appointments:", error);
       }
     };

     fetchData();
   }, []);

  const totalServices = completedBookings.length;

  const handleMarkAsCompleted = async (appointmentId) => {
    try {
      await updateBookingStage(appointmentId, "COMPLETED");

      // Update acceptedAppointments state after marking appointment as completed
      setAcceptedAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );

      const updatedCompletedAppointments = await getCompletedAppointments(
        labourEmail
      );
      setCompletedBookings(updatedCompletedAppointments); // Ensure it defaults to [] if undefined
    } catch (error) {
      console.error("Error marking appointment as completed:", error);
    }
  };

  // Function to handle languages press
  const handleLanguagesPress = () => {
    console.log("Languages section pressed");
  };

  const handleViewAllPress = () => {
    navigation.navigate("Previous_Work_History", {
      completedBookings: completedBookings,
    });
  };

  const handleAppointmentPress = () => {
    navigation.navigate("Appointment", {
      acceptedAppointments: acceptedAppointments,
      setAcceptedAppointments: setAcceptedAppointments,
    });
  };

  const removeAppointment = (appointmentId) => {
    const updatedAcceptedAppointments = acceptedAppointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAcceptedAppointments(updatedAcceptedAppointments);
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
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Avatar.Image
              size={150}
              source={require("../assets/Images/boy.png")}
              style={{
              
                marginTop: 35,
              }}
            />

            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                marginTop: 5,
                justifyContent: "center",
              }}
            >
              {labour.name}
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: 200,
                marginLeft: 50,
                justifyContent: "center",
              }}
            >
              {labour && labour.jobRole ? `${labour.jobRole}\t` : " "}
              <Icon source="pencil-outline" size={20} />
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
                  {totalServices}
                </Text>
                <Text style={{ fontSize: 13 }}>Total Services</Text>
              </View>

              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: 500, color: "#464255" }}
                >
                  {rating}
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
              height: "auto",
              width: 345,
              alignItems: "flexStart",
              justifyContent: "flexStart",
              backgroundColor: "#fff",
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
              {labourProfile.aboutMe}
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
              {labourProfile.mobileNumber}
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
              height: "auto",
              width: 345,
              alignItems: "flexStart",
              justifyContent: "flexStart",
              backgroundColor: "#fff",
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

            {/* Render accepted appointments */}
            {acceptedAppointments.map((appointment, index) => (
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
                  Customer Name: {appointment.customerName}
                </Text>

                <Text
                  style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}
                >
                  @{appointment.date} | {appointment.startTime}
                </Text>
                <Button
                  mode="contained"
                  onPress={() => handleMarkAsCompleted(appointment.id)}
                  style={{
                    marginLeft: 30,
                    marginTop: 10,
                    backgroundColor: "#FF7600",
                    width: 200,
                  }}
                >
                  Completed
                </Button>
              </View>
            ))}
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
              height: "auto",
              width: 345,
              alignItems: "flexStart",
              justifyContent: "flexStart",
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
                Previous Work History
              </Text>
              {"\t"}
              <TouchableOpacity onPress={handleViewAllPress}>
                <Text
                  style={{ color: "blue" }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </Text>

            {/* Previous work details */}
            {completedBookings.slice(0, 3).map((booking, index) => (
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
                  Customer Name: {booking.customerName}
                </Text>

                <Text
                  style={{ marginLeft: 30, fontSize: 13, color: "#2F3239" }}
                >
                  @{booking.date} | {booking.startTime}
                </Text>
              </View>
            ))}
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
    alignItems: "center",
    justifyContent: "center",
   
  },

  surface: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Exporting the component as default
export default Labour_page;


