import axios from "axios";
import { Auth, Firedb } from "../../../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginUser = async ({ email, password, phone }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password, phone });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const userLoginFunction = async ({ role, userCred, setUserCred }) => {
  try {
    const users = await signInWithEmailAndPassword(Auth, userCred.email, userCred.password);
    const q = query(
      collection(Firedb, "user"),
      where("uid", "==", users.user.uid)
    );
    const querySnapshot = await getDocs(q);
    let user;
    querySnapshot.forEach(doc => user = doc.data());
    if (user) {
      localStorage.setItem("users", JSON.stringify(user));
      setUserCred({
        email: "",
        password: ""
      });
      return true; 
    } else {
      throw new Error("User not found in database");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};