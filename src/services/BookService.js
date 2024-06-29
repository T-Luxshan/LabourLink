import axios from 'axios';
import { IP } from './BASE_IP';

const REST_API_BASE_URL_BOOK = `http://${IP}:8080/api/bookings`;

 // API for get customer
 export const customer = (customerEmail) => {
    return axios.get(`${REST_API_BASE_URL_BOOK}/getUserRole/${customerEmail}`)
  }

 // API for get labour
  export const labour = (labourEmail) => {
    return axios.get(`${REST_API_BASE_URL_BOOK}/getUserRole/${labourEmail}`)
  }
  
//  API for update updateStage
  export const updateStage = (id) =>{
    return axios.post(`${FORGOTPASSWORD_BASE_BOOK}/updateStage/${id}`)
    };
