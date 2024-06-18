import axios from "axios";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/labour";




// API for fetching a specific labour by ID
export const getLabourById = (email) => {
  return axios.get(`${BASE_URL}/getLabourById/${email}`);
};


// API for updating a labour's information
export const updateLabour = (name, nic, documentUri, mobileNumber, jobRole, email) => {
  return axios.put(`${BASE_URL}/${email}`, {
    name,
    nic,
    documentUri,
    mobileNumber,
    jobRole,
  });
};

// API for deleting a labour
export const deleteLabour = (email) => {
  return axios.delete(`${BASE_URL}/${email}`);
};

export const updateLabourPassword = (email, newPassword) => {
  return axios.put(`${BASE_URL}/changePassword/${email}`, {newPassword});
};


export default {
  getLabourById,
  updateLabour,
  deleteLabour,
  updateLabourPassword,
};
