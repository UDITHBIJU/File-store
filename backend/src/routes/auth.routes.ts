import Router from 'express';
import {requestOtp,verifyOtp, login, refreshToken, logout} from '../controllers/auth.controller';
import {validate} from '../middlewares/validate.middleware';
import {signupSchema, loginSchema, otpSchema} from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/request-otp',validate(signupSchema), requestOtp);
router.post('/verify-otp',validate(otpSchema), verifyOtp);
router.post('/login',validate(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/logout',authenticate,logout )
export default router;