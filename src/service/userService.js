import axios from "axios";

const REST_API_BASE_URL = "http://172.20.10.7:8080/api/user";

export const getUserByEmail = (email) => {
    return axios.get(REST_API_BASE_URL + "/" + email);
  };

export const findConnectedUsers = () =>{
    return axios.get(REST_API_BASE_URL + "/users")
  };
  

export const updateUserStatus = (email, newUser) => {
    return axios.put(`${REST_API_BASE_URL}/${email}`, newUser);
};

export const findChatMessages = (senderEmail, recipientEmail) => {
    return axios.get(`http://172.20.10.7:8080/messages/${senderEmail}/${recipientEmail}`);
};

export const saveChatMessage = async (message) => {
  try {
    const response = await axios.post('http://172.20.10.7:8080/saveMessage', message);
    return response.data;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
};

