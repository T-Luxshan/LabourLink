import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { deleteNotification } from "../services/NoificationSevice";
import { useNavigation } from "@react-navigation/native";

const NotificationDetail = ({ route }) => {
  const { notification } = route.params;
  const navigation = useNavigation();

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(notification.id);
      navigation.navigate("Notification");
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.message}>{notification.message}</Text>
      <Text style={styles.date}>
        {new Date(notification.createdAt).toLocaleString()}
      </Text>
      <Button
        mode="contained"
        onPress={handleDeleteNotification}
        style={styles.button}
      >
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F5E4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00204A",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: "#444",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  button: {
    marginBottom: 10,
    marginTop:40,
    backgroundColor: "red",
    width: 350,
    height: 50,
    marginLeft: 10,
    borderRadius: 50,
    // Adjust the marginTop for spacing
  },
});

export default NotificationDetail;
