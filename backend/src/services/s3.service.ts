import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import path from "path";

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const uplooadToS3 = async (
	file: Express.Multer.File,
	subfolder: string,
    userId: string
) => {
	const ext = path.extname(file.originalname);
	const key = `uploads/${userId}/${subfolder}/${uuidv4()}${ext}`;

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME || "file-store-s3",
		Key: key,
		Body: file.buffer,
		ContentType: file.mimetype,
	
	};

	const result = await s3.upload(params).promise();
	return {
		url: result.Location,
		key: result.Key,
	};
};
