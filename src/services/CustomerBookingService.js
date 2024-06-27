// services/CustomerBookingService.js

import axios from "axios";

const BASE_URL = "http://172.20.10.3:8080/api/bookings";




export const getCompletedBookings = (email) => {
  return axios.get(`${BASE_URL}/completed-bookings/${email}`);
};

export const getAcceptedBookings = (email) => {
  return axios
    .get(`${BASE_URL}/customer/${email}`)
    .then((response) => {
      // Filter bookings where bookingStage is ACCEPTED
      const acceptedBookings = response.data.filter(
        (booking) => booking.bookingStage === "ACCEPTED"
      );
      return acceptedBookings;
    })
    .catch((error) => {
      console.error("Error fetching accepted bookings:", error);
      throw error; // Rethrow the error to handle it in the component
    });
};