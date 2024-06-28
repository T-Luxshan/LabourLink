import axiosAuthInstance from './AuthService';

// const  baseURL = 'http://192.168.1.56:8080/api/v1/profile';
const baseURL = "http://172.20.10.3:8080/api/labour";

export const addProfilePicture = (profileUri) => {
    return axiosAuthInstance.post(`${baseURL}`, {
        profileUri
    })
}

export const deleteProfilePicture = () => {
    return axiosAuthInstance.delete(`${baseURL}`)
}

export const getProfilePicture = () => {
    return axiosAuthInstance.get(`${baseURL}`)
}