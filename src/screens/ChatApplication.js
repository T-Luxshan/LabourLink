import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { TextInput, Button, Avatar, List } from "react-native-paper";
import {
  getUserByEmail,
  findConnectedUsers,
  updateUserStatus,
  findChatMessages,
} from "../service/userService";

const ChatApplication = () => {
  const [user, setUser] = useState({
    email: "",
    receiverEmail: "",
    status: "OFFLINE",
    message: "",
  });

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [receivedMessagesCount, setReceivedMessagesCount] = useState(0);

  const chatAreaRef = useRef(null);
  const webSocketRef = useRef(null);

  useEffect(() => {
    if (user.email && user.status === "ONLINE") {
      connect();
    }
  }, [user.email, user.status]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserByEmail(user.email);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching customer data:", error);
      }
    };
    fetchUserData();
  }, [user.email]);

  useEffect(() => {
    setReceivedMessagesCount(messages.length);
  }, [messages]);

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

  const sendMessage = () => {
    if (messageInput.trim() && selectedUser) {
      const chatMessage = {
        type: "CHAT",
        senderId: user.email,
        recipientId: selectedUser,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
      };

      webSocketRef.current.send(JSON.stringify(chatMessage));
      setMessageInput("");
    }
  };

  const handleUserClick = (selectedUserEmail) => {
    setSelectedUser(selectedUserEmail);
    fetchAndDisplayUserChat(selectedUserEmail);
  };

  const fetchAndDisplayUserChat = async (selectedUserEmail) => {
    try {
      const UserChatResponse = await findChatMessages(
        user.email,
        selectedUserEmail
      );
      const chatHistory = UserChatResponse.data;
      setMessages(chatHistory);
    } catch (error) {
      console.log("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleEmail = (email) => {
    setUser({ ...user, email });
  };

  const updateUserStatusToDB = async (user) => {
    try {
      const response = await updateUserStatus(user.email, { status: "ONLINE" });
      console.log(response);
      console.log("User status changed successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const registerUser = () => {
    setUser({ ...user, status: "ONLINE" });
    updateUserStatusToDB(user);
    console.log("user registered");
    connect();
  };

  return (
    <View style={{ marginTop: 70 }}>
      {user.status === "ONLINE" ? (
        <View style={{ marginVertical: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}>
            Chat with Labour
          </Text>
  
          <View
            style={{
              width: 800,
              height: 600,
              margin: 20,
              borderWidth: 1,
              borderColor: "#ccc",
              backgroundColor: "#fff",
              overflow: "hidden",
              borderRadius: 8,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                borderRightWidth: 1,
                borderColor: "#ccc",
                padding: 20,
                backgroundColor: "#3498db",
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Online Users
              </Text>
              <ScrollView>
                {connectedUsers.map((user, index) => (
                  <List.Item
                    key={user.email}
                    onPress={() => handleUserClick(user.email)}
                    style={{
                      backgroundColor:
                        selectedUser === user.email ? "red" : "lightblue",
                    }}
                    title={`${user.name} (${receivedMessagesCount})`}
                    left={() => <Avatar.Icon size={40} icon="account" />}
                  />
                ))}
              </ScrollView>
            </View>
  
            <View
              style={{
                flex: 3,
                padding: 20,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              <ScrollView ref={chatAreaRef}>
                {messages.map((message, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor:
                        message.senderId === user.email ? "#3498db" : "#ecf0f1",
                      borderRadius: 5,
                      padding: 8,
                      alignSelf:
                        message.senderId === user.email
                          ? "flex-end"
                          : "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          message.senderId === user.email ? "#fff" : "#333",
                      }}
                    >
                      {message.content}
                    </Text>
                  </View>
                ))}
              </ScrollView>
  
              <View style={{ flexDirection: "row", marginTop: "auto" }}>
                <TextInput
                  label="Type your message..."
                  style={{ flex: 1, marginRight: 10 }}
                  value={messageInput}
                  onChangeText={(text) => setMessageInput(text)}
                />
                <Button mode="contained" onPress={sendMessage}>
                  Send
                </Button>
              </View>
            </View>
          </View>
        </View>
      ) : 
      (
        <View style={{ marginVertical: 20 }}>
          <TextInput
            placeholder="Enter your email"
            value={user.email}
            onChangeText={(email) => handleEmail(email)}
          />
          <Button mode="contained" onPress={registerUser}>
            Connect
          </Button>
        </View>
      )}
    </View>
  );
};

export default ChatApplication;
