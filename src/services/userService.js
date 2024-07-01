import axios from "axios";
import { IP } from './BASE_IP';

const REST_API_BASE_URL = `http://${IP}:8080/api/user`;

export const getUserByEmail = (email) => {
  return axios.get(REST_API_BASE_URL + "/" + email);
};

// export const findConnectedLabours = () => {
//   return axios.get(REST_API_BASE_URL + "/connectedLabours");
// };

// export const findConnectedCustomers = () => {
//   return axios.get(REST_API_BASE_URL + "/connectedCustomers");
// };

export const findConnectedUsers = (email) => {
  return axios.get(REST_API_BASE_URL + "/connectedUsers/"+ email);
};

export const updateUserStatus = (email, newUser) => {
  return axios.put(`${REST_API_BASE_URL}/${email}`, newUser);
};

export const findChatMessages = (senderEmail, recipientEmail) => {
  return axios.get(
    `http://${IP}:8080/messages/${senderEmail}/${recipientEmail}`
  );
};

export const saveChatMessage = async (message) => {
  try {
    const response = await axios.post(
      `http://${IP}:8080/saveMessage`,
      message
    );
    return response.data;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
};
