import axios from "axios";
import { IP } from './BASE_IP';

const BASE_URL = `http://${IP}:8080/api/notifications`;

export const findNotifications = (email) => {
  return axios.get(`${BASE_URL}/user/${email}`);
};

export const saveNotifications = (notification) => {
  return axios.post(`${BASE_URL}/send`, notification);
};

export const updateNotificationReadStatus = (id, read) => {
  return axios.patch(`${BASE_URL}/${id}/read`, { read });
};

export const deleteNotification = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};