import axios from "axios";

// Base URL for your API
const BASE_URL = "http://172.20.10.3:8080/api/labour-profiles";

// API for fetching the profile of a specific labour
// export const getLabourProfileById = (labourEmail) => {
//   return axios.get(`${BASE_URL}/getLabourProfileById/${labourEmail}`);
// };

export const getLabourProfileById = async (labourEmail) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/getLabourProfileById/${labourEmail}`
    );
    return response.data;
  } catch (error) {
   
    throw error;
  }
};



// API for updating the profile of a specific labour
export const updateLabourProfile = async (
  aboutMe,
  gender,
  languages,
  labourEmail
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/update/${labourEmail}`,
      {
        aboutMe,
        gender,
        languages,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createLabourProfile = (aboutMe, gender, languages, labourEmail) => {
  return axios.post(`${BASE_URL}/create`, {
    aboutMe,
    gender,
    languages,
    labourEmail,
  });
};

export const deleteLabourProfile = (labourEmail) => {
  return axios.delete(`${BASE_URL}/delete/${labourEmail}`);
};

export const searchByAboutMe = (aboutMe, gender, languages, labourEmail) => {
  return axios.get(`${BASE_URL}/search/aboutMe/${aboutMe}`, {
    aboutMe,
    gender,
    languages,
    labourEmail,
  });
};

export const searchByGender = (aboutMe, gender, languages, labourEmail) => {
  return axios.get(
    `${BASE_URL}/search/gender/${gender}`,
    aboutMe,
    gender,
    languages,
    labourEmail
  );
};

export const searchByLanguages = (aboutMe, gender, languages, labourEmail) => {
  return axios.get(
    `${BASE_URL}/search/languages/${languages}`,
    aboutMe,
    gender,
    languages,
    labourEmail
  );
};






