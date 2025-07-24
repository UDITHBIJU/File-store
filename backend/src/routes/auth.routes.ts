import Router from 'express';
import {signup, login} from '../controllers/auth.controller';
import {validate} from '../middlewares/validate.middleware';
import {signupSchema, loginSchema} from '../validators/auth.validator';

const router = Router();

router.post('/signup',validate(signupSchema), signup);
router.post('/login',validate(loginSchema), login);

export default router;