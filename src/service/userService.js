import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/user";

export const getUserByEmail = (email) => {
  return axios.get(REST_API_BASE_URL + "/" + email);
};

export const findConnectedLabours = () => {
  return axios.get(REST_API_BASE_URL + "/connectedLabours");
};

export const findConnectedCustomers = () => {
  return axios.get(REST_API_BASE_URL + "/connectedCustomers");
};

export const updateUserStatus = (email, newUser) => {
  return axios.put(`${REST_API_BASE_URL}/${email}`, newUser);
};

export const findChatMessages = (senderEmail, recipientEmail) => {
  return axios.get(
    `http://localhost:8080/messages/${senderEmail}/${recipientEmail}`
  );
};

export const saveChatMessage = async (message) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/saveMessage",
      message
    );
    return response.data;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
};
