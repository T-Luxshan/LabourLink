// import axios from "axios";

// const REST_API_BASE_URL = "http://172.20.10.3:8080/api/labour-profiles";

// export const createLabourProfile = async (labourProfileData) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/createLabour`,
//       labourProfileData
//     );
//     console.log("Create response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating labour profile:", error);
//     throw error; // Rethrow the error for handling in components
//   }
// };
// export const getLabourProfileByEmail = (email) => {
//   return axios.get(
//     REST_API_BASE_URL + "/getLabourProfileById/" + email
//   );
// };

// // // Function to get labour profile by email
// // export const getLabourProfileByEmail = async (email) => {
// //   try {
// //     const response = await axios.get(`${BASE_URL}/getLabourById/${email}`);
// //     console.log("Fetch response:", response);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching labour profile:", error);
// //     throw error;
// //   }
// // };

// // Function to update labour profile by email
// export const updateLabourProfileByEmail = async (email, updatedLabourData) => {
//   try {
//     const response = await axios.put(`${BASE_URL}/${email}`, updatedLabourData);
//     console.log("Update response:", response);
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
//     console.log("Delete response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting labour profile:", error);
//     throw error;
//   }
// };