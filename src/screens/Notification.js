import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import registerNNPushToken from 'native-notify';
import { saveNotifications, findNotifications, updateNotificationReadStatus } from '../services/NoificationSevice';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from '../services/BASE_IP';

const Notification = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  let stompClient = null;

  registerNNPushToken(21639, 'dwb6dAoCmrQD8faaLyciTU');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
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

  useEffect(() => {
    if (email) {
      const fetchNotifications = async () => {
        try {
          console.log("Fetching notifications for email: " + email);
          const response = await findNotifications(email);
          const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setNotifications(sortedNotifications);
        } catch (error) {
          console.error("Error fetching notifications", error);
        }
      };

      fetchNotifications();

      // WebSocket connection
      const socket = new SockJS(`http://${IP}:8080/ws`);
      stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
          login: 'guest',
          passcode: 'guest',
        },
        debug: (str) => {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/notifications', (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        });
      };

      stompClient.activate();

      const foregroundSubscription = Notifications.addNotificationReceivedListener((notification) => {
        console.log('Received notification:', notification);
        if (notification && notification.request && notification.request.content) {
          const { title, body } = notification.request.content;
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            { title, message: body, createdAt: new Date().toISOString(), read: false },
          ]);
        }
      });

      return () => {
        foregroundSubscription.remove();
        if (stompClient) {
          stompClient.deactivate();
        }
      };
    }
  }, [email]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (email) {
        setRefreshing(true);
        try {
          const response = await findNotifications(email);
          const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setNotifications(sortedNotifications);
        } catch (error) {
          console.error('Error refreshing notifications', error);
        } finally {
          setRefreshing(false);
        }
      }
    }, 1000); // Refresh every 1 second

    return () => clearInterval(interval);
  }, [email]);

  const handleNotification = async () => {
    const notification = {
      title: 'First Notification',
      message: 'This is the first notification testing',
      recipient: email,
      createdAt: new Date().toISOString(),
    };

    await fetch('https://app.nativenotify.com/api/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer dwb6dAoCmrQD8faaLyciTU`,
      },
      body: JSON.stringify({
        appId: 21639,
        appToken: 'dwb6dAoCmrQD8faaLyciTU',
        title: notification.title,
        message: notification.message,
        userId: notification.recipient,
        date: notification.createdAt,
      }),
    });

    try {
      await saveNotifications(notification);
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    } catch (error) {
      console.error('Error saving notification', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await updateNotificationReadStatus(id, true);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Click to Notify" onPress={handleNotification} />
        <Text style={styles.heading}>Notifications</Text>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {notifications.map((notification, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => {
              markAsRead(notification.id);
              navigation.navigate('NotificationDetail', { notification });
            }}
          >
            <View style={[styles.notification, notification.read && styles.readNotification]}>
              <Text style={styles.title}>{notification.title || 'No Title'}</Text>
              <Text style={styles.date}>{new Date(notification.createdAt).toLocaleString()}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#00204A',
  },
  buttonContainer: {
    marginVertical: 20,
    width: '80%',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#F8F5E4',
    padding: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F5E4',
  },
  scrollContainer: {
    width: '100%',
    // Added height and flexGrow to enable scrolling
    maxHeight: '80%',
    flexGrow: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  notification: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  readNotification: {
    backgroundColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00204A',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  accent: {
    color: '#F97300',
  },
});

export default Notification;
