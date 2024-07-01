import axios from "axios";
import { IP } from './BASE_IP';

const REST_API_BASE_URL = `http://${IP}:8080`;

export const findChatMessages = (senderEmail, recipientEmail) => {
  return axios.get(
    REST_API_BASE_URL + `/messages/${senderEmail}/${recipientEmail}`
  );
};

export const markAsRead = (senderEmail, recipientEmail) => {
  return axios.post(
    `${REST_API_BASE_URL}/markAsRead/${senderEmail}/${recipientEmail}`
  );
};

export const unreadMessageCount = (senderEmail, recipientEmail) => {
  return axios.get(
    REST_API_BASE_URL + `/unreadMessageCount/${senderEmail}/${recipientEmail}`
  );
};

export const totalUnreadMessageCount = (recipientEmail) => {
  return axios.get(
    REST_API_BASE_URL + `/totalUnreadMessageCount/${recipientEmail}`
  );
};
