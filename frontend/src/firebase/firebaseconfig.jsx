// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPCiDI0zbMLm1qUjUvK3ftyoc-1B0em8s",
  authDomain: "zibmate-04.firebaseapp.com",
  databaseURL: "https://zibmate-04-default-rtdb.firebaseio.com",
  projectId: "zibmate-04",
  storageBucket: "zibmate-04.firebasestorage.app",
  messagingSenderId: "469473925295",
  appId: "1:469473925295:web:07c4497c9417a3bbf29c5a",
  measurementId: "G-79E865ZJVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Auth = getAuth(app)
const Firedb = getDatabase(app);

export { app, analytics, Auth, Firedb };
