import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { findChatMessages, saveChatMessage } from "../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from '../services/BASE_IP';

const ChatAreaScreen = ({ route }) => {
  const { SelectedUserName, SelectedUserEmail } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatAreaRef = useRef(null);
  const webSocketRef = useRef(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        setEmail(storedEmail);
        console.log("Fetched Email: " + storedEmail);
      } catch (error) {
        console.error("Failed to fetch email from storage", error);
      }
    };

    fetchEmail();
  }, []);

  useEffect(() => {
    console.log("State Email after setting: " + email); // Log whenever the email state changes
  }, [email]);

  const connect = () => {
    console.log("connect function called");
    const ws = new WebSocket(`ws://${IP}:8080/ws`);

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
      onConnected();
    };

    ws.onmessage = async (event) => {
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage.type === "CHAT") {
        await fetchAndDisplayUserChat(SelectedUserEmail);
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
    if (!email) {
      console.error("User information is incomplete.");
      return;
    }
    console.log("onConnected called");

    webSocketRef.current.send(
      JSON.stringify({ type: "JOIN", email })
    );
  };

  useEffect(() => {
    if (email) {
      connect();
      fetchAndDisplayUserChat(SelectedUserEmail);
    }

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [email]);

  const fetchAndDisplayUserChat = async (selectedUserEmail) => {
    try {
      const userChatResponse = await findChatMessages(
        email,
        selectedUserEmail
      );
      setMessages(userChatResponse.data);
    } catch (error) {
      console.log("Error fetching chat history:", error);
    }
  };

  const sendMessage = async () => {
    if (messageInput.trim() && SelectedUserEmail) {
      const chatMessage = {
        type: "CHAT",
        senderId: email,
        recipientId: SelectedUserEmail,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
      };

      try {
        // Save the chat message to the database
        await saveChatMessage(chatMessage);

        // Send the chat message over WebSocket
        webSocketRef.current.send(JSON.stringify(chatMessage));
        console.log("Message sent");

        // Update the local state to include the new message
        setMessages((prevMessages) => [...prevMessages, chatMessage]);
        setMessageInput("");
      } catch (error) {
        console.log("Error sending chat message:", error);
      }
      fetchAndDisplayUserChat(SelectedUserEmail);
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {SelectedUserName}</Text>
      <ScrollView ref={chatAreaRef} style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.senderId === email
                ? styles.myMessage
                : styles.theirMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          label="Type your message..."
          style={styles.textInput}
          value={messageInput}
          onChangeText={setMessageInput}
        />
        <Button
          mode="contained"
          onPress={sendMessage}
          style={styles.sendButton}
        >
          Send
        </Button>
      </View>
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
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: "#3498db",
    alignSelf: "flex-end",
  },
  theirMessage: {
    backgroundColor: "#102C57",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    alignSelf: "center",
  },
});

export default ChatAreaScreen;
