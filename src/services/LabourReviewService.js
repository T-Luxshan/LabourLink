import axios from "axios";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/v1/labourReview";

// API for getting all reviews
export const getAllReviews = () => {
  return axios.get(`${BASE_URL}/getAllReview`);
};

export const getRating = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/rating/${email}`);
    return response.data; // Return the rating data
  } catch (error) {
    throw error; // Throw the error for handling in the component
  }
};