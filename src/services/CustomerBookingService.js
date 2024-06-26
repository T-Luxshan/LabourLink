// services/CustomerBookingService.js

import axios from "axios";

const BASE_URL = "http://172.20.10.3:8080/api/bookings";




export const getCompletedBookings = (email) => {
  return axios.get(`${BASE_URL}/completed-bookings/${email}`);
};