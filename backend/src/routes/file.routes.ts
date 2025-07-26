import {Router} from "express";
import {getFiles, uploadFile} from '../controllers/file.controller';
import {upload} from '../middlewares/multer.middleware';
import {deleteFile} from '../controllers/file.controller';
import {authenticate} from '../middlewares/auth.middleware';
import {generateDownloadLink} from '../controllers/file.controller';

const router = Router()
;
router.use(authenticate)

router.get('/',getFiles);
router.post('/upload',upload, uploadFile);
router.delete('/:id', deleteFile);
router.get("/presigned-url/:id", authenticate, generateDownloadLink);


export default router;