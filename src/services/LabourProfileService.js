// import axios from "axios";
import axiosAuthInstance from "./AuthService";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/labour-profiles";
// const BASE_URL = "http://192.168.1.56:8080/api/labour-profiles";



export const getLabourProfileById = (labourEmail) => {
  return axiosAuthInstance.get(`${BASE_URL}/getLabourProfileById/${labourEmail}`);
  }


export const updateLabourProfile = (
  aboutMe,
  gender,
  languages,
  labourEmail
) => {
 
    // console.log(`Updating Labour Profile for: ${labourEmail}`);
  return axiosAuthInstance.put(`${BASE_URL}/update/${labourEmail}`, {
      aboutMe,
      gender,
      languages,
    });
   


};


export const createLabourProfile = async (
  aboutMe,
  gender,
  languages,
  labourEmail
) => {
  try {
    console.log("Creating Labour Profile...");
    const response = await axiosAuthInstance.post(`${BASE_URL}/create`, {
      aboutMe,
      gender,
      languages,
      labourEmail,
    });
    console.log("Create Labour Profile Response:", response.data);
    return response.data; // Assuming backend returns the created labour profile data
  } catch (error) {
    // console.error("Error creating Labour Profile:", error);
    throw error;
  }
};

export const deleteLabourProfile = (labourEmail) => {
  return axiosAuthInstance.delete(`${BASE_URL}/delete/${labourEmail}`);
};






