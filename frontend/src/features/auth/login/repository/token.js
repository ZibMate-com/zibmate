import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');
const secretKey = 'abcde12345';

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