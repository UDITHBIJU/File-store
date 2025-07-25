import mongoose, { Document, Schema } from "mongoose";

export interface File extends Document {
	user: mongoose.Types.ObjectId;
	filename: string;
	url: string;
	key: string;
	size: number;
	contentType: string;
	type: "image" | "video" | "audio" | "document" | "other";
	uploadedAt: Date;
}

const fileSchema = new Schema<File>({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	filename: { type: String, required: true },
	url: { type: String, required: true },
	key: { type: String, required: true },
	size: { type: Number, required: true },
	contentType: { type: String, required: true },
	type: { type: String, required: true },
	uploadedAt: { type: Date, default: Date.now },
});

export const FileModel = mongoose.model<File>("File", fileSchema);
