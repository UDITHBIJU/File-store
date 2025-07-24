import mongoose from "mongoose";

export const connectDB = async () => {
	const MONGO_URI =
		process.env.MONGO_URI || "mongodb://localhost:27017/file-store";
	try {
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection failed:", error);
		process.exit(1);
	}
};
