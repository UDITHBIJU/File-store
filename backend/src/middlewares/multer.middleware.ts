import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage }).array('files', 10); 

