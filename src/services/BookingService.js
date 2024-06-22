// BookingService.js

import axios from "axios";

const BASE_URL = "http://172.20.10.3:8080/api/bookings";


export const updateBookingStage = async (id, bookingStage) => {
  try {
    const response = await axios.patch(`${BASE_URL}/updateStage/${id}`, {
      bookingStage: bookingStage,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking stage:", error);
    throw error; // Ensure the error is re-thrown for the caller to handle
  }
};



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

// export const getCompletedAppointments = (labourEmail) => {
//   return axios.get(`${BASE_URL}/labour/${labourEmail}/COMPLETED`)
// };


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
