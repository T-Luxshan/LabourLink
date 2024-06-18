import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { List, Avatar } from "react-native-paper";
import { findConnectedLabours } from "../service/userService";

const OnlineUsersScreen = ({ navigation }) => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchConnectedUsers = async () => {
      try {
        const response = await findConnectedLabours();
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
    console.log("user selected: " + user.name);
    setSelectedUser(user);
  };

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
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
    color: "#00204A",
  },
  userItem: {
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 8,
  },
  userItemTitle: {
    color: "#00204A",
  },
  avatar: {
    marginLeft: 10,
  },
});

export default OnlineUsersScreen;
