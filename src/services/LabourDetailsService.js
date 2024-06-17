import axios from "axios";

const BASE_URL = "http://192.168.1.207:8080/api/labour";
const REVIEW_BASE_URL = "http://192.168.1.207:8080/api/v1/labourReview";
const ABOUT_BASE_URL = "http://192.168.1.207:8080/api/labour-profiles";
const TATAL_SERVICE_URL ="http://192.168.1.207:8080/api/bookings"



export const getLabourByEmail = (email) => {
    return axios.get(`${BASE_URL}/getLabourById/${email}`)
}

export const getLabourByReview = (email, jobRole) => {
     return axios.get(`${REVIEW_BASE_URL}/getReviews/${email}/${jobRole}`)
 }
 
export const getLabourByRating = (email) => {
    return axios.get(`${REVIEW_BASE_URL}/rating/${email}`)
}


 export const getLabourByAbout = (email) => {
    return axios.get(`${ABOUT_BASE_URL}/getLabourProfileById/${email}`)
} 

export const getLabourByTotalservice = (labourEmail, stage) => {
    return axios.get(`${REVIEW_BASE_URL}/getReviews/${labourEmail}/${stage}`)
}

export const BookingLabour = (labourId,customerId,date,startTime, bookingStage,jobDescription,jobRole) => {
    return axios.post(`${TATAL_SERVICE_URL}`, {
        labourId,customerId,date,startTime, bookingStage,jobDescription,jobRole
    });
  };
 

 
