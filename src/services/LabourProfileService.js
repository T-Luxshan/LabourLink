import axios from "axios";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/labour-profiles";


// export const getLabourProfileById = async (labourEmail) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/getLabourProfileById/${labourEmail}`
//     );
//     return response.data;
//   } catch (error) {
   
//     throw error;
//   }
// };



// // API for updating the profile of a specific labour
// export const updateLabourProfile = async (
//   aboutMe,
//   gender,
//   languages,
//   labourEmail
// ) => {
//   try {
//     const response = await axios.put(
//       `${BASE_URL}/update/${labourEmail}`,
//       {
//         aboutMe,
//         gender,
//         languages,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };



export const getLabourProfileById = async (labourEmail) => {
  try {
    console.log(`Fetching Labour Profile for: ${labourEmail}`);
    const response = await axios.get(
      `${BASE_URL}/getLabourProfileById/${labourEmail}`
    );
    console.log("Labour Profile Response:", response.data);
    return response.data; // Ensure this is correctly returning the data
  } catch (error) {
    console.error("Error fetching Labour Profile:", error);
    throw error;
  }
};

// API for updating the profile of a specific labour
// export const updateLabourProfile = async (
//   aboutMe,
//   gender,
//   languages,
//   labourEmail
// ) => {
//   try {
//     console.log(`Updating Labour Profile for: ${labourEmail}`);
//     const response = await axios.put(`${BASE_URL}/update/${labourEmail}`, {
//       aboutMe,
//       gender,
//       languages,
//     });
//     console.log("Update Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating Labour Profile:", error);
//     throw error;
//   }
// };

export const updateLabourProfile = (
  aboutMe,
  gender,
  languages,
  labourEmail
) => {
 
    // console.log(`Updating Labour Profile for: ${labourEmail}`);
  return axios.put(`${BASE_URL}/update/${labourEmail}`, {
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
    const response = await axios.post(`${BASE_URL}/create`, {
      aboutMe,
      gender,
      languages,
      labourEmail,
    });
    console.log("Create Labour Profile Response:", response.data);
    return response.data; // Assuming backend returns the created labour profile data
  } catch (error) {
    console.error("Error creating Labour Profile:", error);
    throw error;
  }
};

export const deleteLabourProfile = (labourEmail) => {
  return axios.delete(`${BASE_URL}/delete/${labourEmail}`);
};






