import {Router} from "express";
import {uploadFile} from '../controllers/file.controller';
import {upload} from '../middlewares/multer.middleware';

const router = Router();

router.post('/upload', upload, uploadFile);
export default router;