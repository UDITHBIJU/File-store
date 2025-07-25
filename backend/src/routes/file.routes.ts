import {Router} from "express";
import {getFiles, uploadFile} from '../controllers/file.controller';
import {upload} from '../middlewares/multer.middleware';
import {deleteFile} from '../controllers/file.controller';

const router = Router();

router.get('/',getFiles);
router.post('/upload', upload, uploadFile);
router.delete('/:id', deleteFile);

export default router;