import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";


const Upcoming_Services = ({ navigation }) => {
  const [pendingBookings, setPendingBookings] = useState([]);
  
    
  const handleViewAppointment = () => {
    navigation.navigate("Report_Review", {
      
    });
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 10 }}>
       
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.appointmentDetail}>
                {appointment.labourName}
              </Text>
              <Text style={styles.appointmentJob}>
                {appointment.jobDescription}
              </Text>
              <TouchableOpacity
                style={styles.viewTextContainer}
                onPress={() => handleViewAppointment(appointment)}
              >
                <Text style={styles.viewText}>Add Report and Review</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
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

export default Upcoming_Services;
