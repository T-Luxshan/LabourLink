import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const REST_API_BASE_URL_AUTH = "http://172.20.10.2:8080/api/v1/auth";
// const  baseURL = 'http://172.20.10.2:8080/api';

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


  // API for get user role 
 export const getUserRole = (email) => {
   return axios.get(`${REST_API_BASE_URL_AUTH}/getRole/${email}`)
 }

  // API for login customer
  export const loginCustomer = (role, email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/customer`, {
        role, email, password
    });
  };

   // API for login customer
   export const loginLabour = (role, email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/labour`, {
        role, email, password
    });
  };




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

  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('refreshToken');

  navigation.navigate('Login'); // Navigate to login page.

}

