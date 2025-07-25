import jwt from 'jsonwebtoken';

const accessSecret = process.env.JWT_SECRET || 'default';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'default_refresh';


export const generateAccessToken = (id: string) =>{
    return jwt.sign({ id }, accessSecret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
}

export const generateRefreshToken = (id: string) => {
   
    return jwt.sign({ id }, refreshSecret, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, accessSecret);
    } catch (error) {
        return null;
    }
}
export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, refreshSecret);
    } catch (error) {
        return null;
    }
}