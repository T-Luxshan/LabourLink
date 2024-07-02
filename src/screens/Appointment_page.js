import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Surface, Icon, Avatar } from "react-native-paper";
import {
  getBookingDetailsByLabourEmail,
  updateBookingStage,
} from "../services/BookingService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveNotifications } from "../services/NoificationSevice";

const Appointment_page = ({ route, navigation }) => {
  const { appointmentId, removeAppointment } = route.params;
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  // const labourEmail = "lehaan@example.com"; // Replace with dynamic value if needed


   const [labourEmail, setLabourEmail] = useState("");



   useEffect(() => {
     const fetchLabourEmail = async () => {
       try {
         const email = await AsyncStorage.getItem("userEmail");
         if (email) {
           setLabourEmail(email.toLowerCase());
         } else {
           console.log("No email found in AsyncStorage");
         }
       } catch (error) {
         console.log("Error fetching email from AsyncStorage:", error);
       }
     };

     fetchLabourEmail();
   }, []);



 

  useEffect(() => {
    if (labourEmail) {
      const fetchBookingDetails = async () => {
        try {
          const response = await getBookingDetailsByLabourEmail(labourEmail);
          console.log("API Response:", response);
          if (response) {
            const relevantAppointment = response.find(
              (appointment) => appointment.id === appointmentId
            );
            if (relevantAppointment) {
              setBookingDetails(relevantAppointment);
            } else {
              setError("No relevant appointment found.");
            }
          } else {
            setError("Empty response or missing data fields.");
          }
        } catch (error) {
          // console.log("Error fetching booking data:", error);
          setError("Error fetching booking data. Please try again.");
        }
      };

      fetchBookingDetails();
    }
  }, [labourEmail, appointmentId]); // Dependency array ensures useEffect runs when labourEmail or appointmentId changes

  const handleAccept = async () => {
    try {
      await updateBookingStage(appointmentId, "ACCEPTED");
      handleAcceptNotificationToLabour();
      handleAcceptNotificationToCustomer();
      removeAppointment(appointmentId);
      navigation.navigate("Appointment"); // Navigate back to Appointment screen
    } catch (error) {
      // console.log("Error accepting appointment:", error);
      // Handle error state or notify user accordingly
    }
  };

  const handleIgnore = async () => {
    try {
      await updateBookingStage(appointmentId, "DECLINED");
      handleIgnoreNotificationToLabour();
      handleIgnoreNotificationToCustomer();
      removeAppointment(appointmentId);
      navigation.navigate("Appointment"); // Navigate back to Appointment screen
    } catch (error) {
      // console.log("Error accepting appointment:", error);
      // Handle error state or notify user accordingly
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const handleAcceptNotificationToLabour = async () => {
    const notification = {
      title: `Request from ${bookingDetails.customerName} is accepted`,
      message: `You have successfully accepted ${bookingDetails.jobRole} request from ${bookingDetails.customerName}`,
      recipient: labourEmail,
      createdAt: new Date().toISOString(),
    };

    await fetch("https://app.nativenotify.com/api/indie/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer emBddOfJLNr511DDJxUMcI`,
      },
      body: JSON.stringify({
        appId: 22199,
      appToken: 'emBddOfJLNr511DDJxUMcI',
        title: notification.title,
        message: notification.message,
        // userId: notification.recipient,
        subID: labourEmail,
        date: notification.createdAt,
      }),
    });

    

    try {
      await saveNotifications(notification);
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

  const handleAcceptNotificationToCustomer = async () => {
    const notification = {
      title: `Your Request For ${bookingDetails.jobRole} is accepted By ${bookingDetails.labourName}`,
      message: `The hiring request you sent to ${bookingDetails.labourName} for ${bookingDetails.jobRole} has been successfully accepted by him`,
      recipient: `${bookingDetails.customerEmail}`,
      createdAt: new Date().toISOString(),
    };

    await fetch("https://app.nativenotify.com/api/indie/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer emBddOfJLNr511DDJxUMcI`,
      },
      body: JSON.stringify({
        appId: 22199,
        appToken: 'emBddOfJLNr511DDJxUMcI',
        title: notification.title,
        message: notification.message,
        // userId: notification.recipient,
        subID: `${bookingDetails.customerEmail}`,
        date: notification.createdAt,
      }),
    });

    try {
      await saveNotifications(notification);
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

  const handleIgnoreNotificationToLabour = async () => {
    const notification = {
      title: `Request from ${bookingDetails.customerName} is rejected`,
      message: `You have successfully rejected ${bookingDetails.jobRole} request from ${bookingDetails.customerName}`,
      recipient: labourEmail,
      createdAt: new Date().toISOString(),
    };

    await fetch("https://app.nativenotify.com/api/indie/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer emBddOfJLNr511DDJxUMcI`,
      },
      body: JSON.stringify({
        appId: 22199,
        appToken: 'emBddOfJLNr511DDJxUMcI',
        title: notification.title,
        message: notification.message,
        // userId: notification.recipient,
        subID: labourEmail,
        date: notification.createdAt,
      }),
    });

    try {
      await saveNotifications(notification);
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

  const handleIgnoreNotificationToCustomer = async () => {
    const notification = {
      title: `${bookingDetails.jobRole} Request is rejected By ${bookingDetails.labourName}`,
      message: `The hiring request you sent to ${bookingDetails.labourName} for ${bookingDetails.jobRole} has been rejected by him`,
      recipient: `${bookingDetails.customerEmail}`,
      createdAt: new Date().toISOString(),
    };

    await fetch("https://app.nativenotify.com/api/indie/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer emBddOfJLNr511DDJxUMcI`,
      },
      body: JSON.stringify({
        appId: 22199,
        appToken: 'emBddOfJLNr511DDJxUMcI',
        title: notification.title,
        message: notification.message,
        // userId: notification.recipient,
        subID: `${bookingDetails.customerEmail}`,
        date: notification.createdAt,
      }),
    });

    try {
      await saveNotifications(notification);
    } catch (error) {
      console.error("Error saving notification", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo and app name */}
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Avatar.Image
            size={50}
            source={require("../assets/Images/icon1.jpg")}
            style={{ marginLeft: 0, marginTop: 30 }}
          />
          <Text style={{ fontSize: 30, fontWeight: "700", marginTop: 10 }}>
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
        {bookingDetails && (
          <>
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
                {formatDate(bookingDetails.date)}
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
                {bookingDetails.startTime}
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
                  height: "auto",
                  width: 345,
                  alignItems: "flexStart",
                  justifyContent: "flexStart",
                  marginBottom: 10,
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
                  <Text style={{ color: "#0A090A" }}>
                    {" "}
                    {bookingDetails.customerName}
                  </Text>
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
                  {bookingDetails.jobDescription}
                </Text>
              </Surface>
            </View>
          </>
        )}

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
              onPress={handleAccept}
              style={{
                backgroundColor: "#0066CC",
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
              onPress={handleIgnore}
              style={{
                backgroundColor: "#0066CC",
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

        {/* Error handling
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Appointment_page;
