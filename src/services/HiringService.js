import axiosAuthInstance from "./AuthService";
import axios from "axios";

// const REST_API_BASE_URL_BOOKING = "http://192.168.1.56:8080/api/bookings";
const REST_API_BASE_URL_BOOKING = "http://172.20.10.3:8080/api/labour";

export const getBookingDetailsByLabourId = (email) => {
    return axiosAuthInstance.get(`${REST_API_BASE_URL_BOOKING}/labour/${email}`)
}
