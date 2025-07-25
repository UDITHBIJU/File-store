import { Request, Response } from "express";
import { uplooadToS3 } from "../services/s3.service";
import { FileModel } from "../models/file.model";
import { classifyFile } from "../utils/classify-file.util";
import { deleteFromS3 } from "../services/s3.service";

export const uploadFile = async (req: Request, res: Response) => {
	try {
		const files = req.files as Express.Multer.File[];

		if (!files || files.length === 0) {
			return res.status(400).json({ message: "No file provided" });
		}
		const userId = req.user?.id;

		const uploads = await Promise.all(
			files.map(async (file) => {
				const fileType = classifyFile(file.mimetype);
				const result = await uplooadToS3(file, fileType, userId);
				return FileModel.create({
					user: userId,
					filename: file.originalname,
					key: result.key,
					url: result.url,
					size: file.size,
					contentType: file.mimetype,
					type: fileType,
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

export const getFiles = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.id;
		const fileType = req.query.type as string;
		const query: any = { user: userId };
		if (fileType) {
			query.type = fileType;
		}
		const files = await FileModel.find(query).sort({ createdAt: -1 });
		res.status(200).json(files);
	} catch (error) {
		console.error("Error fetching files:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteFile = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.id;
		const fileId = req.params.id;
		const file = await FileModel.findOneAndDelete({
			user: userId,
			_id: fileId,
		});
		if (!file) {
			return res.status(404).json({ message: "File not found" });
		}
		await deleteFromS3(file.key);
		await FileModel.deleteOne({ _id: file._id });

		res.status(200).json({ message: "File deleted successfully" });
	} catch (error) {
		console.error("Error deleting file:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
