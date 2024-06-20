// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { Card } from "react-native-paper";
// import { getPendingAppointments } from "../services/BookingService";

// const Appointment = ({ navigation }) => {
//   const [pendingBookings, setPendingBookings] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const labourEmail = "lehaan@example.com"; // Replace with dynamic value if needed

//   useEffect(() => {
//     const fetchPendingAppointments = async () => {
//       try {
//         // Assuming your service function getPendingAppointments is correctly implemented
//         const response = await getPendingAppointments(labourEmail);
//         setPendingBookings(response); // Assuming response is an array of pending bookings
//         console.log("Pending Appointments:", response); // Log fetched data
//       } catch (error) {
//         console.error("Error fetching pending appointments:", error);
//         setPendingBookings([]); // Ensure state is updated even on error
//       }
//     };

//     fetchPendingAppointments();
//   }, [labourEmail]); // Dependency array ensures useEffect runs when labourEmail changes

//   const handleViewAppointment = (appointment) => {
//     navigation.navigate("Appointment_page", {
//       appointmentId: appointment.id,
//       removeAppointment: handleRemoveAppointment,
//     });
//   };

//   const handleRemoveAppointment = (id) => {
//     // Implement removal logic if needed
//     setAppointments(
//       appointments.filter((appointment) => appointment.id !== id)
//     );
//     console.log("Removing appointment with id:", id);
//   };

//   return (
//     <ScrollView>
//       <View style={{ marginTop: 10 }}>
//         {pendingBookings.map((appointment, index) => (
//           <Card key={index} style={styles.card}>
//             <Card.Content>
//               <Text style={styles.appointmentDetail}>{appointment.customerName}</Text>
//               <Text style={styles.appointmentJob}>{appointment.jobDescription}</Text>
//               <TouchableOpacity
//                 style={styles.viewTextContainer}
//                 onPress={() => handleViewAppointment(appointment)}
//               >
//                 <Text style={styles.viewText}>View</Text>
//               </TouchableOpacity>
//             </Card.Content>
//           </Card>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderRadius: 8,
//     padding: 10,
//     backgroundColor: "#fff",
//     elevation: 2,
//   },
//   appointmentDetail: {
//     fontSize: 15,
//     fontWeight: "500",
//     color: "#2F3239",
//   },
//   appointmentJob: {
//     fontSize: 13,
//     color: "#2F3239",
//     marginTop: 5,
//   },
//   viewTextContainer: {
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//   },
//   viewText: {
//     color: "blue",
//     fontSize: 14,
//   },
// });

// export default Appointment;





import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { getPendingAppointments } from "../services/BookingService";

const Appointment = ({ navigation }) => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const labourEmail = "lehaan@example.com"; // Replace with dynamic value if needed

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const response = await getPendingAppointments(labourEmail);
        setPendingBookings(response); // Assuming response is an array of pending bookings
        console.log("Pending Appointments:", response); // Log fetched data
      } catch (error) {
        console.error("Error fetching pending appointments:", error);
        setPendingBookings([]); // Ensure state is updated even on error
      }
    };

    fetchPendingAppointments();
  }, [labourEmail]); // Dependency array ensures useEffect runs when labourEmail changes

  const handleViewAppointment = (appointment) => {
    navigation.navigate("Appointment_page", {
      appointmentId: appointment.id,
      removeAppointment: handleRemoveAppointment,
    });
  };

  const handleRemoveAppointment = (id) => {
    setPendingBookings(
      pendingBookings.filter((appointment) => appointment.id !== id)
    );
    console.log("Removing appointment with id:", id);
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 10 }}>
        {pendingBookings.map((appointment, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.appointmentDetail}>
                {appointment.customerName}
              </Text>
              <Text style={styles.appointmentJob}>
                {appointment.jobDescription}
              </Text>
              <TouchableOpacity
                style={styles.viewTextContainer}
                onPress={() => handleViewAppointment(appointment)}
              >
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  appointmentDetail: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2F3239",
  },
  appointmentJob: {
    fontSize: 13,
    color: "#2F3239",
    marginTop: 5,
  },
  viewTextContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  viewText: {
    color: "blue",
    fontSize: 14,
  },
});

export default Appointment;
