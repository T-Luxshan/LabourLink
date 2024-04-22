import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';


const REST_API_BASE_URL_AUTH = "http://localhost:8080/api/v1/auth";
const  baseURL = 'http://localhost:8080/api';

// API for register customer
export const registerCustomer = (name, email, password, mobileNumber, address) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/register/customer`, {
        name, email, password, mobileNumber, address
    });
  };

  // API for register customer
export const registerLabour = (name, email, password, mobileNumber, nic) => {
  return axios.post(`${REST_API_BASE_URL_AUTH}/register/labour`, {
      name, email, password, mobileNumber, nic
  });
};


  // API for login customer
  export const loginCustomer = (email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/customer`, {
        email, password
    });
  };

   // API for login customer
   export const loginLabour = (email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/labour`, {
        email, password
    });
  };




const axiosAuthInstance = axios.create({
  baseURL,
  
})

axiosAuthInstance.interceptors.request.use(
  async (config) => {
    // Get the token from localStorage (or wherever you store it)
    const token = localStorage.getItem('token');
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
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${REST_API_BASE_URL_AUTH}/refresh`, {refreshToken})
        console.log(response);

        console.log("Token updated.")
        // console.log(response.data.accessToken);
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        const token = localStorage.getItem('token');

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    }
    else{
      logoutUser();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;

//  logout the user from the application.
export const logoutUser = () => {
  const navigation = useNavigation();

  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');

  navigation.navigate('Login'); // Navigate to login page.

}

