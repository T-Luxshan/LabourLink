import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { GiftedChat } from 'react-native-gifted-chat';
import findChatMessages from '../service/userService'; // Make sure this function is properly imported
import findConnectedUsers from '../service/userService'; // Assuming there's a function to find connected users

const ChatAreaScreen = ({ route }) => {
  const { SelectedUserName, SelectedUserEmail } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatAreaRef = useRef(null);
  const webSocketRef = useRef(null);

  const [user, setUser] = useState({
    email: "johndoe@example.com",
    receiverEmail: "",
    status: "OFFLINE",
    message: "",
  });

  const connect = () => {
    console.log("connect function called");
    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
      onConnected();
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage.type === "CHAT") {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    webSocketRef.current = ws;
  };

  const onConnected = () => {
    if (!user || !user.email) {
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
      const connectedUsersData = connectedUserResponse.data;
      const filteredUsers = connectedUsersData.filter(
        (u) => u.email !== user.email
      );
      setConnectedUsers(filteredUsers); // Assuming you have a state to hold connected users
    } catch (error) {
      console.log("Error fetching connected users:", error);
    }
  };

  useEffect(() => {
    connect();
    fetchAndDisplayUserChat(SelectedUserEmail);

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [SelectedUserEmail]);

  const fetchAndDisplayUserChat = async (SelectedUserEmail) => {
    try {
      const userChatResponse = await findChatMessages(user.email, SelectedUserEmail);
      const chatHistory = userChatResponse.data;
      setMessages(chatHistory);
    } catch (error) {
      console.log("Error fetching chat history:", error);
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() && SelectedUserEmail) {
      const chatMessage = {
        type: "CHAT",
        senderId: user.email,
        recipientId: SelectedUserEmail,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
      };

      webSocketRef.current.send(JSON.stringify(chatMessage));
      console.log('message sent');
      setMessages((prevMessages) => GiftedChat.append(prevMessages, chatMessage)); // Update messages state to include the new message
      setMessageInput("");
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={{ flex: 1, marginTop: 70 }}>
      <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}>
        Chat with {SelectedUserName}
      </Text>
      <ScrollView ref={chatAreaRef}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={{
              backgroundColor: message.senderId === user.email ? "#3498db" : "#ecf0f1",
              borderRadius: 5,
              padding: 8,
              alignSelf: message.senderId === user.email ? "flex-end" : "flex-start",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: message.senderId === user.email ? "#fff" : "#333",
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
  );
};

export default ChatAreaScreen;
