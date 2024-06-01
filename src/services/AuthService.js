import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  For mobile, use IP address instead of localhost
const REST_API_BASE_URL_AUTH = "http://192.168.1.56:8080/api/v1/auth";
const  baseURL = 'http://192.168.1.56:8080/api';
const FORGOTPASSWORD_BASE_URL = "http://192.168.1.56:8080/forgotPassword";
// const REST_API_BASE_URL_AUTH = "http://172.20.10.2:8080/api/v1/auth";
// const  baseURL = 'http://172.20.10.2:8080/api';

// const REST_API_BASE_URL_AUTH = "http://localhost:8080/api/v1/auth";
// const  baseURL = 'http://localhost:8080/api';
// const FORGOTPASSWORD_BASE_URL = "http://localhost:8080/forgotPassword";


// API for register customer
export const registerCustomer = (name, email, password, mobileNumber, address) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/register/customer`, {
        name, email, password, mobileNumber, address
    });
  };

  // API for register labour
export const registerLabour = (name, email, password, mobileNumber, nic, documentUri, jobRole) => {
  return axios.post(`${REST_API_BASE_URL_AUTH}/register/labour`, {
      name, email, password, mobileNumber, nic, documentUri, jobRole
  });
};


  // API for get user role 
 export const getUserRole = (email) => {
   return axios.get(`${REST_API_BASE_URL_AUTH}/getUserRole/${email}`)
 }

 // API for get the job roles for the labour.
 export const getLabourJobRoles = () => {
   return axios.get(`${REST_API_BASE_URL_AUTH}/getJobRoles`)
 } 

  // API for login customer
  export const loginCustomer = (role, email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/customer`, {
        role, email, password
    });
  };

   // API for login labour
   export const loginLabour = (role, email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/labour`, {
        role, email, password
    });
  };

  // API to check whether a NIC already exist in the DB or not.
  export const isNICExist = (nic) => {
    return axios.get(`${REST_API_BASE_URL_AUTH}/nicExist/${nic}`)
  }

  // API to send email with an OTP when forgot password.
  export const sendOTP = (role, email) => {
    return axios.post(`${FORGOTPASSWORD_BASE_URL}/verifyMail/${role}/${email}`)
  } 

  // API for verify OTP.
  export const verifyOTP = (role, otp, email) => {
    return axios.post(`${FORGOTPASSWORD_BASE_URL}/verifyOtp/${role}/${otp}/${email}`)
  }

  //API for Change password.
  export const changePassword = (role, email, password, repeatPassword) =>{
    return axios.post(`${FORGOTPASSWORD_BASE_URL}/changePassword/${role}/${email}`,{
      password, repeatPassword
    });
  };


// axios instance and interceptors for get the token and set to headers

const axiosAuthInstance = axios.create({
  baseURL,
  
})

axiosAuthInstance.interceptors.request.use(
  async (config) => {
    // Get the token from AsyncStorage (or wherever you store it)
     token = await AsyncStorage.getItem('token');
    // Set the authorization header if a token exists
    if (token) {
      const user = jwtDecode(token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      console.log(isExpired);
      if(!isExpired){
        config.headers.Authorization = `Bearer ${token}`;
        // return config;
      }else {
        
        // console.log("Access token expired");
        const refreshToken = AsyncStorage.getItem('refreshToken');
        const response = await axios.post(`${REST_API_BASE_URL_AUTH}/refresh`, {refreshToken})
        console.log(response);

        console.log("Token updated.")
        // console.log(response.data.accessToken);
        AsyncStorage.setItem('token', response.data.accessToken);
        AsyncStorage.setItem('refreshToken', response.data.refreshToken);

        const token = AsyncStorage.getItem('token');

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    }
    else{
      // logoutUser();
      console.log("I am in else part of if (token) ");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;

//  logout the user from the application.
// export const logoutUser = () => {
//   const navigation = useNavigation();

//   AsyncStorage.removeItem('token');
//   AsyncStorage.removeItem('refreshToken');

//   navigation.navigate('Login'); // Navigate to login page.

// }

