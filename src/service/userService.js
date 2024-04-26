import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/user";

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
    return axios.get(`http://localhost:8080/messages/${senderEmail}/${recipientEmail}`);
};

