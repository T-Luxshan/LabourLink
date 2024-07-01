import axiosAuthInstance from './AuthService';
import { IP } from './BASE_IP';

const  baseURL = `http://${IP}:8080/api/v1/profile`;
// const baseURL = "http://172.20.10.3:8080/api/labour";

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

export const getLabourProfilePicture = (email) => {
    return axiosAuthInstance.get(`${baseURL}/${email}`)
}