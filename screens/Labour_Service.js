// import axios from "axios";

// const BASE_URL = "http://172.20.10.3/api/labour"; // Update with your backend base URL

// // Function to create a new labour profile
// export const createLabourProfile = async (labourProfileData) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/createLabour`,
//       labourProfileData
//     );
//     return response.data;
//   } catch (error) {

//     console.error("Error creating labour profile:", error);
//     throw error; // Rethrow the error for handling in components
//   }
// };

// // Function to get labour profile by email
// export const getLabourProfileByEmail = async (email) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/getLabourById/${email}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching labour profile:", error);
//     throw error;
//   }
// };

// // Function to update labour profile by email
// export const updateLabourProfileByEmail = async (email, updatedLabourData) => {
//   try {
//     const response = await axios.put(`${BASE_URL}/${email}`, updatedLabourData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating labour profile:", error);
//     throw error;
//   }
// };

// // Function to delete labour profile by email
// export const deleteLabourProfileByEmail = async (email) => {
//   try {
//     const response = await axios.delete(`${BASE_URL}/${email}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting labour profile:", error);
//     throw error;
//   }
// };
