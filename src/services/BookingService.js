// BookingService.js

import axios from "axios";

const BASE_URL = "http://172.20.10.3:8080/api/bookings";


export const getPendingAppointments = async (labourEmail) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/labour/${labourEmail}/PENDING`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pending appointments:", error);
    throw error; // Ensure the error is re-thrown for the caller to handle
  }
};

export const getAcceptedAppointments = async (labourEmail) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/labour/${labourEmail}/ACCEPTED`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching accepted appointments:", error);
    throw error; // Ensure the error is re-thrown for the caller to handle
  }
};

export const getDeclinedAppointments = async (labourEmail) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/labour/${labourEmail}/DECLINED`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching declined appointments:", error);
    throw error; // Ensure the error is re-thrown for the caller to handle
  }
};




export const getCompletedAppointments = async (labourEmail) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/labour/${labourEmail}/COMPLETED`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching completed appointments:", error);
    throw error; // Ensure the error is re-thrown for the caller to handle
  }
};

export const getBookingDetailsByLabourEmail = async (labourEmail) => {
  try {
    const response = await axios.get(`${BASE_URL}/labour/${labourEmail}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw error; // Ensure the error is re-thrown for the caller to handle
  }
};
