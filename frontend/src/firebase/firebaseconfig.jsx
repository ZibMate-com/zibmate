// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAlQtGGM7s62ZPbrbtT2lW65h9iqAnKtzU",
  authDomain: "homies-db2a3.firebaseapp.com",
  projectId: "homies-db2a3",
  storageBucket: "homies-db2a3.firebasestorage.app",
  messagingSenderId: "2839813892",
  appId: "1:2839813892:web:10486c0b31439d4a7e3a51",
  measurementId: "G-BWY6GF062G"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);