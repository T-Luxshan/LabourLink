import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { List, Avatar } from "react-native-paper";
import { findConnectedUsers } from "../service/userService";

const OnlineUsersScreen = ({ navigation }) => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState();
  const [user, setUser] = useState({
    email: "",
    receiverEmail: "",
    status: "OFFLINE",
    message: "",
  });
  const webSocketRef = useRef(null); // Create a ref for the WebSocket instance

  // Fetch connected users on component mount
  useEffect(() => {
    const fetchConnectedUsers = async () => {
      try {
        const response = await findConnectedUsers();
        setConnectedUsers(response.data);
      } catch (error) {
        console.log("Error fetching connected users:", error);
      }
    };
    fetchConnectedUsers();
  }, []);

  const handleUserClick = (user) => {
    navigation.navigate("ChatAreaScreen", {
      SelectedUserName: user.name,
      SelectedUserEmail: user.email,
    });
    console.log("user selected : " + user.name);
    setSelectedUsers(user);
    console.log(selectedUsers);
  };

  const connect = () => {
    console.log("connect function called");
    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
      onConnected();
    };

    webSocketRef.current = ws;
  };

  const onConnected = () => {
    if (!user || !user.email || !user.name) {
      console.error("User information is incomplete.");
      return;
    }
    console.log("onConnected called");

    webSocketRef.current.send(
      JSON.stringify({ type: "JOIN", email: user.email })
    );
    findAndDisplayConnectedUsers();
  };

  const findAndDisplayConnectedUsers = async () => {
    try {
      const connectedUserResponse = await findConnectedUsers();
      const connectedUsersData = await connectedUserResponse.data;
      const filteredUsers = connectedUsersData.filter(
        (u) => u.email !== user.email
      );
      setConnectedUsers(filteredUsers);
    } catch (error) {
      console.log("Error fetching connected users:", error);
    }
  };

  // Call the connect function when the component mounts
  useEffect(() => {
    connect();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Online Users</Text>
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
            )} // Add styles.avatar
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
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
    color: "#00204A", // Text color
  },
  userItem: {
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 8,
  },
  userItemTitle: {
    color: "#00204A", // Text color
  },
  avatar: {
    marginLeft: 10, // Add left padding to the avatar
  },
});

export default OnlineUsersScreen;
