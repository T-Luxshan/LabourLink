import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";

const Appointment = ({ navigation }) => {
  const appointmentDetails = [
    { name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { name: "Mrs.Shaar", job: "I need a Driver on 2024-07-23" },
    { name: "Mrs.Kulam", job: "I need a Driver on 2024-07-23" },
    { name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { name: "Mrs.Shaar", job: "I need a Driver on 2024-07-23" },
    { name: "Mrs.Kulam", job: "I need a Driver on 2024-07-23" },
    { name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
    { name: "Mrs.Shaar", job: "I need a Driver on 2024-07-23" },
    { name: "Mrs.Kulam", job: "I need a Driver on 2024-07-23" },
    { name: "Mr.Shanthan", job: "I need a Driver on 2024-07-23" },
  ];

  const handleViewAppointment = () => {
    navigation.navigate("Appointment_page");
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 10 }}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Appointments</Text>
        </View> */}

        {appointmentDetails.map((appointment, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.appointmentDetail}>{appointment.name}</Text>
              <Text style={styles.appointmentJob}>{appointment.job}</Text>
              <TouchableOpacity
                style={styles.viewTextContainer}
                onPress={handleViewAppointment}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    marginBottom: 30,
    color: "#FF7600",
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 10,
  },
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
