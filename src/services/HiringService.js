import axiosAuthInstance from "./AuthService";
import axios from "axios";

const REST_API_BASE_URL_BOOKING = "http://192.168.1.56:8080/api/bookings";

export const getBookingDetailsByLabourId = (email) => {
    return axios.get(`${REST_API_BASE_URL_BOOKING}/labour/${email}`)
}
