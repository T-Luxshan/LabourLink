// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgnOlqAAB8-wyxENdZqa7QekkzOGG5IUc",
  authDomain: "labourlink-e7ecf.firebaseapp.com",
  projectId: "labourlink-e7ecf",
  storageBucket: "labourlink-e7ecf.appspot.com",
  messagingSenderId: "1091024208299",
  appId: "1:1091024208299:web:c663705d70701b76e8d2ee",
  measurementId: "G-ZZ8C06XKX5"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { app, storage};