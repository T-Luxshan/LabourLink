import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { Card } from "react-native-paper";


const Previous_Work_History = ({route}) => {
   const { completedBookings } = route.params;
   const labourEmail = "lehaan@example.com"; // Replace with dynamic value if needed

   const [bookings, setBookings] = useState([]);

   useEffect(() => {
     setBookings(completedBookings);
   }, [completedBookings]);

   const renderBooking = ({ item }) => (
     <View style={styles.bookingContainer}>
       <Text style={styles.customerName}>
         Customer Name: {item.customerName}
       </Text>
       <Text style={styles.bookingDetails}>
         @{item.date} | {item.startTime}
       </Text>
     </View>
   );
 
 

    
  

  return (
    
      
   <View style={styles.container}>
      {/* <Text style={styles.header}>Previous Work History</Text> */}
      <FlatList
        data={completedBookings}
        renderItem={renderBooking}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
      
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7600",
  },
  bookingContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F3239",
  },
  bookingDetails: {
    fontSize: 16,
    color: "#2F3239",
  },
});

export default Previous_Work_History;
