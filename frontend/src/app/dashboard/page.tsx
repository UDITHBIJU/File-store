"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function DashboardPage() {
	const [files, setFiles] = useState<FileList | null>(null);
	const [msg, setMsg] = useState("");

	const handleUpload = async () => {
		if (!files || files.length === 0) return;

		const formData = new FormData();
		Array.from(files).forEach((file) => {
			formData.append("files", file);
		});

		try {
			await api.post("/files/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setTimeout(() => setMsg("file uploaded sucessfully"), 100);

			setFiles(null);
		} catch (err: any) {
			setMsg(err?.response?.data?.message || "Upload failed");
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-10 p-4">
			<h2 className="text-2xl font-semibold mb-4">Upload Files</h2>

			<input
				type="file"
				multiple
				onChange={(e) => setFiles(e.target.files)}
				className="mb-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 cursor-pointer"
			/>
			<button
				onClick={handleUpload}
				className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
			>
				Upload
			</button>

			{msg && <p className="mt-4 text-sm text-gray-700">{msg}</p>}
		</div>
	);
}
