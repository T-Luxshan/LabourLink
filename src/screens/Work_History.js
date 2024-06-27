import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";


const Work_History = ({ route }) => {
  const { completedBookings } = route.params;
  const email = "aruran@example.com";

  const [bookings, setBookings] = useState([]);

 
  useEffect(() => {
    setBookings(completedBookings);
  }, [completedBookings]);



  const handleReportReview = (booking) => {
    // Handle the report and review action here
    console.log(`Report and Review for booking ID: ${booking.id}`);
  };

  const renderBooking = (booking) => (
    <Card key={booking.id} style={styles.card}>
      <Card.Content>
        <Text style={styles.labourName}>Labour Name: {booking.labourName}</Text>
        <Text style={styles.bookingDetails}>
          {booking.jobRole} | @{booking.appointmentDate} |
          {booking.appointmentTime}
        </Text>
        <View style={styles.reportReviewContainer}>
          <TouchableOpacity onPress={() => handleReportReview(booking)}>
            <Text style={styles.reportReviewText}>Report and Review</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
      {bookings.length === 0 ? (
          <Text style={styles.noBookingsText}>No Completed Bookings Found</Text>
        ) : (
        bookings.map((booking) => renderBooking(booking))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFF",
    padding: 20,
  },
  // header: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 20,
  //   color: "#FF7600",
  // },
  // bookingContainer: {
  //   marginBottom: 15,
  //   padding: 15,
  //   backgroundColor: "#F8F8F8",
  //   borderRadius: 10,
  // },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  customerName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2F3239",
  },
  bookingDetails: {
    fontSize: 16,
    color: "#2F3239",
  },
  reportReviewContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  reportReviewText: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  noBookingsText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
    color: "#2F3239",
    opacity: 0.5,
  },
});

export default Work_History;
