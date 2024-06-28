// import axios from "axios";
import axiosAuthInstance from "./AuthService";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/labour";
// const BASE_URL = "http://192.168.1.56:8080/api/labour";





// API for fetching a specific labour by ID
export const getLabourById = (email) => {
  return axiosAuthInstance.get(`${BASE_URL}/getLabourById/${email}`);
};


// API for updating a labour's information
// export const updateLabour = ( nic, mobileNumber, email, name, documentUri, jobRole) => {
//   return axios.put(`${BASE_URL}/${email}`, {
//    name,
//     nic,
//     documentUri,
//     mobileNumber,
//     jobRole,
//   });
// };


export const updateLabour = (
  email,
  nic,
  mobileNumber,
  name,
  documentUri,
  jobRole
) => {
  return axiosAuthInstance.put(`${BASE_URL}/${email}`, {
    name,
    nic,
    documentUri,
    mobileNumber,
    jobRole,
  });
};
// API for deleting a labour
export const deleteLabour = (email) => {
  return axiosAuthInstance.delete(`${BASE_URL}/${email}`);
};

export const updateLabourPassword = (email, newPassword) => {
  return axiosAuthInstance.put(`${BASE_URL}/changePassword/${email}`, {newPassword});
};


