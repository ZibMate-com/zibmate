import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');
const secretKey = 'abcde12345';
// import jwtDecode from "jwt-decode";

export const token = jwt.sign({
    id:1,
    username : 'Aman'
}, secretKey,{expiresIn: '1h'});

export const verifyToken =()=>{
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return false;
        } else {
            console.log('Token verified successfully:', decoded);
            console.log(token);
            return true;
        }
    });
}
console.log(token);



// export const verifyToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.error("No token found");
//     return false;
//   }

//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Math.floor(Date.now() / 1000); // in seconds

//     if (decoded.exp && decoded.exp < currentTime) {
//       console.error("Token expired");
//       return false;
//     }
//     console.log("Token is valid:", decoded);
//     return true;
//   } catch (err) {
//     console.error("Invalid token:", err);
//     return false;
//   }
// };
