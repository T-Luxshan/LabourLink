import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationDetail = ({ route }) => {
  const { notification } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.message}>{notification.message}</Text>
      <Text style={styles.date}>{new Date(notification.createdAt).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F5E4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00204A',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#444',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
});

export default NotificationDetail;
