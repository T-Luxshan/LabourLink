import axios from "axios";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/v1/labourReview";

// API for getting all reviews
export const getAllReviews = () => {
  return axios.get(`${BASE_URL}/getAllReview`);
};

