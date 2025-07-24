import Router from 'express';
import {requestOtp,verifyOtp, login} from '../controllers/auth.controller';
import {validate} from '../middlewares/validate.middleware';
import {signupSchema, loginSchema, otpSchema} from '../validators/auth.validator';

const router = Router();

router.post('/request-otp',validate(signupSchema), requestOtp);
router.post('/verify-otp',validate(otpSchema), verifyOtp);
router.post('/login',validate(loginSchema), login);

export default router;