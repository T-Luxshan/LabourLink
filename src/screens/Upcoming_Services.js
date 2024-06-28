import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Upcoming_Services = ({ route }) => {
  const { upcomingServices } = route.params;
  // const email = "aruran@example.com";
const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

   useEffect(() => {
     const fetchEmail = async () => {
       try {
         const email = await AsyncStorage.getItem("userEmail");
         if (email) {
           setEmail(email);
         } else {
           console.log("No email found in AsyncStorage");
         }
       } catch (error) {
         console.log("Error fetching email from AsyncStorage:", error);
       }
     };

     fetchEmail();
   }, []);


useEffect(() => {
  setBookings(upcomingServices);
}, [upcomingServices]);

    

 const renderBooking = (booking) => (
   <Card key={booking.id} style={styles.card}>
     <Card.Content>
       <Text style={styles.labourName}>Labour Name: {booking.labourName}</Text>
       <Text style={styles.bookingDetails}>
         {booking.jobRole} | @{booking.date} |
         {booking.startTime}
       </Text>
      
     </Card.Content>
   </Card>
 );
 
  return (
    <ScrollView>
      <View style={styles.container}>
       {bookings.length === 0 ? (
          <Text style={styles.noServicesText}>No Upcoming Services Found</Text>
        ) : (
        bookings.map((booking) => renderBooking(booking)))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFF",
    padding: 20,
    // minHeight: 1000,
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
  noServicesText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
    color: "#2F3239",
    opacity: 0.5,
  },
});

export default Upcoming_Services;
