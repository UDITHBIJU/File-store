import { Request, Response } from "express";
import { uplooadToS3 } from "../services/s3.service";
import { FileModel } from "../models/file.model";
import { classifyFile } from "../utils/classify-file.util";

export const uploadFile = async (req: Request, res: Response) => {
	try {
		const files = req.files as Express.Multer.File[];

		if (!files || files.length === 0) {
			return res.status(400).json({ message: "No file provided" });
		}
		const userId = "68826268fef63e8ea4ba4e55";

		const uploads = await Promise.all(
			files.map(async (file) => {
                const fileType = classifyFile(file.mimetype);
				const result = await uplooadToS3(file,fileType, userId);
				return FileModel.create({
					user: userId,
					filename: file.originalname,
					key: result.key,
					url: result.url,
					size: file.size,
					contentType: file.mimetype,
                    type:fileType
				});
			})
		);

		return res.status(201).json({
			message: "Files uploaded successfully",
			files: uploads,
		});
	} catch (error) {
		console.error("Error uploading file:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
