import {Request, Response} from 'express';
import {User} from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET
const signup = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        console.log('Existing User:', existingUser);
        if (existingUser) {
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.error('Error during signup:', error);
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

export {signup, login}; 