// import axios from "axios";
import axiosAuthInstance from "./AuthService";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/customer";
// const BASE_URL = "http://192.168.1.56:8080/api/customer";


// API for fetching a specific labour by ID
export const getCustomerById = (email) => {    
  return axiosAuthInstance.get(`${BASE_URL}/${email}`);
};

// API for updating a labour's information
export const updateCustomer = (
  name,
  address,
  email,
  mobileNumber,      
) => {
  return axiosAuthInstance.put(`${BASE_URL}/${email}`, {
    name,
    address,
    mobileNumber,   
  });
};


// API for deleting a labour
export const deleteCustomer = (email) => {
  return axiosAuthInstance.delete(`${BASE_URL}/deleteCustomer/${email}`);
};

export const updateCustomerPassword = (email, newPassword) => {
  return axiosAuthInstance.put(`${BASE_URL}/changePassword/${email}`, { newPassword });
};

