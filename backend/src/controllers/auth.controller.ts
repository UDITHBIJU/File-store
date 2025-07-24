import {Request, Response} from 'express';
import {User} from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {generateOtp} from '../utils/otp.util'; 
import {redis} from '../config/redis'; 
import { sendOtpEmail } from '../services/mail.service';


const JWT_SECRET = process.env.JWT_SECRET

const requestOtp = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const otp = generateOtp(); 

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const value = JSON.stringify({
            username,
            email,
            password: hashedPassword,
            otp,
        });

        await redis.set(`otp:${email}`, value, 'EX', 300); 

        await sendOtpEmail(email, otp);
        res.status(200).json({message: 'OTP sent to mail'});

    } catch (error) {
        console.error('Error in request otp:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const verifyOtp = async (req: Request, res: Response) => {
    const {email, otp} = req.body;
    try {
        const value = await redis.get(`otp:${email}`);
        if (!value) {
            return res.status(400).json({message: 'OTP expired or invalid'});
        }

        const userData = JSON.parse(value);
        if (userData.otp !== otp) {
            return res.status(400).json({message: 'Invalid OTP'});
        }

        const newUser = new User({
            username: userData.username,
            email: userData.email,
            password: userData.password,
        });

        await newUser.save();
        await redis.del(`otp:${email}`); 

        res.status(201).json({message: 'User registered successfully'});

    } catch (error) {
        console.error('Error in verify otp:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({message: 'Internal server error'});
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({token, user: {id: user._id, username: user.username, email: user.email}});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

export {requestOtp,verifyOtp, login}; 