// import React, { useState, useEffect, useRef } from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import { List, Avatar } from "react-native-paper";
// import { findConnectedUsers } from "../services/userService";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {unreadMessageCount} from "../services/ChatService";

// const OnlineUsersScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     const fetchEmail = async () => {
//       try {
//         const storedEmail = await AsyncStorage.getItem("userEmail");
//         setEmail(storedEmail);
//         console.log("Fetched Email: " + storedEmail);
//       } catch (error) {
//         console.error("Failed to fetch email from storage", error);
//       }
//     };

//     fetchEmail();
//   }, []);

//   useEffect(() => {
//     if (email) {
//       const fetchConnectedUsers = async () => {
//         try {
//           const response = await findConnectedUsers(email);
//           setConnectedUsers(response.data);
//         } catch (error) {
//           console.log("Error fetching connected users:", error);
//         }
//       };
//       fetchConnectedUsers();
//     }
//   }, [connectedUsers]);

//   useEffect(() => {
//     connectedUsers.forEach(user => {
//       getUnreadCount(user.email, email);
//     });
//   }, [connectedUsers, email]);

//   async function getUnreadCount(receiverEmail, senderEmail) {
//     try {
//       const count = await unreadMessageCount(receiverEmail, senderEmail);
//       console.log('Unread Messages for ' + receiverEmail + ': ' + count.data);
//       setReceivedMessagesCount(prevState => ({
//         ...prevState,
//         [receiverEmail]: count.data
//       }));
//     } catch (error) {
//       console.error("Failed to get unread messages count", error);
//     }
//   }

//   const handleUserClick = (user) => {
//     navigation.navigate("ChatAreaScreen", {
//       SelectedUserName: user.name,
//       SelectedUserEmail: user.email,
//     });
//     console.log("user selected: " + user.name);
//     setSelectedUser(user);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Connected Users</Text>
//       <ScrollView>
//         {connectedUsers.map((user, index) => (
//           <List.Item
//             key={user.email}
//             onPress={() => handleUserClick(user)}
//             style={styles.userItem}
//             title={user.name}
//             titleStyle={styles.userItemTitle}
//             left={() => (
//               <Avatar.Icon size={40} icon="account" style={styles.avatar} />
//             )}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 70,
//     paddingHorizontal: 20,
//     backgroundColor: "#FFFFFF", // Background color for the entire screen
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 26,
//     marginBottom: 20,
//     color: "#00204A",
//     fontWeight: "bold",
//     // fontFamily: "Roboto", // Updated font for a more professional look
//     textShadowColor: "rgba(0, 0, 0, 0.2)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 1,
//   },
//   userItem: {
//     backgroundColor: "#F1F1F1",
//     marginBottom: 10,
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     elevation: 1, // Adds a subtle shadow for a cleaner look
//   },
//   userItemTitle: {
//     color: "#00204A",
//     fontSize: 18,
//     fontWeight: "500",
//   },
//   avatar: {
//     marginLeft: 10,
//     backgroundColor: "#FF7D29", // Avatar background color
//   },
// });

// export default OnlineUsersScreen;


import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { List, Avatar } from "react-native-paper";
import { findConnectedUsers } from "../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { unreadMessageCount } from "../services/ChatService";


const OnlineUsersScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [receivedMessagesCount, setReceivedMessagesCount] = useState({});
  const [refreshing, setRefreshing] = useState(false);

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
    if (email) {
      const fetchConnectedUsers = async () => {
        try {
          const response = await findConnectedUsers(email);
          if (response.data) {
            setConnectedUsers(response.data);
          }
        } catch (error) {
          console.log("Error fetching connected users:", error);
        }
      };
      fetchConnectedUsers();
    }
  }, [email]);

  useEffect(() => {
    const interval = setInterval(async () => {
    if (connectedUsers.length > 0 && email) {
      setRefreshing(true);
      try{
      connectedUsers.forEach(user => {
        getUnreadCount(user.email, email);
      })}catch (error) {
        console.error('Error refreshing notifications', error);
      } finally {
        setRefreshing(false);
      }}
    }, 1000); // Refresh every 1 second

    return () => clearInterval(interval);
  }, [connectedUsers,email]);

  async function getUnreadCount(receiverEmail, senderEmail) {
    try {
      const count = await unreadMessageCount(receiverEmail, senderEmail);
      // console.log('Unread Messages for ' + receiverEmail + ': ' + count.data);
      setReceivedMessagesCount(prevState => ({
        ...prevState,
        [receiverEmail]: count.data
      }));
    } catch (error) {
      console.error(`Failed to get unread messages count for ${receiverEmail}:`, error);
    }
  }

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
        {connectedUsers.map((user) => (
          <List.Item
            key={user.email}
            onPress={() => handleUserClick(user)}
            style={styles.userItem}
            title={user.name}
            titleStyle={styles.userItemTitle}
            left={() => (
              <Avatar.Icon size={40} icon="account" style={styles.avatar} />
            )}
            right={() => (
              <Text style={styles.unreadCount}>
                {receivedMessagesCount[user.email] || 0}
              </Text>
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
  unreadCount: {
    marginTop: 10,
    marginRight: 10,
    fontSize: 16,
    color: "#FF0000", // Unread count color
  },
});

export default OnlineUsersScreen;
