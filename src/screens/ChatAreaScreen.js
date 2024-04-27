import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";

const ChatAreaScreen = ({ route }) => {
  const { SelectedUserName, SelectedUserEmail } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatAreaRef = useRef(null);

  // Define the function to fetch and display user chat
  const fetchAndDisplayUserChat = async (userEmail) => {
    try {
      // Call the function to fetch chat messages for the selected user using userEmail
      const userChatResponse = await findChatMessages(
        user.email, // Assuming user is defined somewhere in the component
        userEmail
      );
      const chatHistory = userChatResponse.data;
      setMessages(chatHistory);
    } catch (error) {
      console.log("Error fetching chat history:", error);
    }
  };

  // Define the function to send a message
  const sendMessage = () => {
    // Check if the message input is not empty and a selected user is available
    if (messageInput.trim() && SelectedUserEmail) {
      const chatMessage = {
        type: "CHAT",
        senderId: user.email, // Assuming user is defined somewhere in the component
        recipientId: SelectedUserEmail,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
      };

      // Assuming webSocketRef.current is the WebSocket instance
      webSocketRef.current.send(JSON.stringify(chatMessage));
      setMessageInput("");
    }
  };

  // Scroll to the end of the chat area when messages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Fetch chat messages when the component mounts
  useEffect(() => {
    fetchAndDisplayUserChat(SelectedUserEmail);
  }, []);

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
              backgroundColor:
                message.senderId === SelectedUserEmail ? "#3498db" : "#ecf0f1",
              borderRadius: 5,
              padding: 8,
              alignSelf:
                message.senderId === SelectedUserEmail ? "flex-end" : "flex-start",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: message.senderId === SelectedUserEmail ? "#fff" : "#333",
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