// import axios from "axios";
import axiosAuthInstance from "./AuthService";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/v1/labourReview";
// const BASE_URL = "http://192.168.1.56:8080/api/v1/labourReview";

// API for getting all reviews
export const getAllReviews = () => {
  return axiosAuthInstance.get(`${BASE_URL}/getAllReview`);
};

export const getRating = async (email) => {
  try {
    const response = await axiosAuthInstance.get(`${BASE_URL}/rating/${email}`);
    return response.data; // Return the rating data
  } catch (error) {
    throw error; // Throw the error for handling in the component
  }
};