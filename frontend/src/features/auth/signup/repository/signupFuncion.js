import axios from "axios";
const BASE_URL = "https://zibmate.com/"
import { Auth,Firedb } from "../../../firebase/firebaseconfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
export const signupUser = async (payload) => {
  try {
    const backendPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      role : payload.role
    };
    const response = await axios.post(`${BASE_URL}/signup`, backendPayload);
    return response.data;
    
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const userSignupFunction = async ({ role, userdata, setUserData }) => {
  try {
    if (role === "owner") {
      const users = await createUserWithEmailAndPassword(
        Auth,
        userdata.email,
        userdata.password
      );

      const user = {
        name: userdata.firstName,
        email: users.user.email,
        uid: users.user.uid,
        role: role,
        password: userdata.password,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const UserRef = collection(Firedb, "user");
      await addDoc(UserRef, user);
    } else {
      const user = {
        name: userdata.firstName,
        email: userdata.email,
        role: role,
        phone: userdata.phone,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const UserRef = collection(Firedb, "user");
      await addDoc(UserRef, user);
    }

    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });

    return true; // Indicate success

  } catch (error) {
    console.log(error);
    throw error; // Let the caller handle alerts/navigation
  }
};