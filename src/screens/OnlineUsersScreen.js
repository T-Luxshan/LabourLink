import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { List, Avatar } from "react-native-paper";
import { findConnectedLabours,findConnectedCustomers } from "../service/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnlineUsersScreen = ({ navigation }) => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem("userRole");
        setUserRole(storedRole);
        console.log("Fetched role: " + storedRole);
      } catch (error) {
        console.error("Failed to fetch user role from storage", error);
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    if (userRole) {
      const fetchConnectedUsers = async () => {
        if (userRole == "CUSTOMER") {
          try {
            const response = await findConnectedLabours();
            setConnectedUsers(response.data);
          } catch (error) {
            console.log("Error fetching connected users:", error);
          }
        } else {
          try {
            const response = await findConnectedLabours ();
            setConnectedUsers(response.data);
          } catch (error) {
            console.log("Error fetching connected users:", error);
          }
        }
      };
      fetchConnectedUsers();
    }
  }, [userRole]);

  const handleUserClick = (user) => {
    navigation.navigate("ChatAreaScreen", {
      SelectedUserName: user.name,
      SelectedUserEmail: user.email,
    });
    console.log("user selected: " + user.name);
    setSelectedUser(user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connected Users</Text>
      <ScrollView>
        {connectedUsers.map((user, index) => (
          <List.Item
            key={user.email}
            onPress={() => handleUserClick(user)}
            style={styles.userItem}
            title={user.name}
            titleStyle={styles.userItemTitle}
            left={() => (
              <Avatar.Icon size={40} icon="account" style={styles.avatar} />
            )}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF", // Background color for the entire screen
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    marginBottom: 20,
    color: "#00204A",
    fontWeight: "bold",
    // fontFamily: "Roboto", // Updated font for a more professional look
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  userItem: {
    backgroundColor: "#F1F1F1",
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 1, // Adds a subtle shadow for a cleaner look
  },
  userItemTitle: {
    color: "#00204A",
    fontSize: 18,
    fontWeight: "500",
  },
  avatar: {
    marginLeft: 10,
    backgroundColor: "#FF7D29", // Avatar background color
  },
});

export default OnlineUsersScreen;
