import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";

const Appointment = ({ navigation }) => {
  const [appointments, setAppointments] = useState([
    { id: 1, name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { id: 2, name: "Mrs.Shaar", job: "I need a Driver on 2024-07-23" },
    { id: 3, name: "Mrs.Kulam", job: "I need a Driver on 2024-07-23" },
    { id: 4, name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { id: 5, name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { id: 6, name: "Mrs.Shaar", job: "I need a Driver on 2024-07-23" },
    { id: 7, name: "Mrs.Kulam", job: "I need a Driver on 2024-07-23" },
    { id: 8, name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { id: 9, name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { id: 10, name: "Mrs.Shaar", job: "I need a Driver on 2024-07-23" },
    { id: 11, name: "Mrs.Kulam", job: "I need a Driver on 2024-07-23" },
    { id: 12, name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
  ]);

  const handleViewAppointment = (appointment) => {
    navigation.navigate("Appointment_page", {
      appointment: appointment,
      removeAppointment: handleRemoveAppointment,
    });
  };

  const handleRemoveAppointment = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 10 }}>
        {appointments.map((appointment, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.appointmentDetail}>{appointment.name}</Text>
              <Text style={styles.appointmentJob}>{appointment.job}</Text>
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
    position: "relative",
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




