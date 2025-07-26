"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Sidebar from "@/components/Sidebar";


interface FileType {
	_id: string;
	filename: string;
	type: string;
	uploadedAt: string;
}

export default function FilesPage() {
	const [files, setFiles] = useState<FileType[]>([]);
	const [filteredFiles, setFilteredFiles] = useState<FileType[]>([]);
	const [filterType, setFilterType] = useState("all");
	const [msg, setMsg] = useState("");


	// Fetch all files initially
	useEffect(() => {
		fetchFiles();
	}, []);

	// Apply filter
	useEffect(() => {
		if (filterType === "all") {
			setFilteredFiles(files);
		} else {
			setFilteredFiles(
				files.filter((f) => f.type === filterType)
			);
		}
	}, [filterType, files]);

	const fetchFiles = async () => {
		try {
			const res = await api.get("/files");
			setFiles(res.data);
		} catch (err) {
			console.error("Error fetching files:", err);
		}
	};

	const handleDownload = async (fileId: string) => {
		const res = await api.get(`/files/presigned-url/${fileId}`);
		const url = res.data.url;
		const link = document.createElement("a");
		link.href = url;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	
	const handleDelete = async (id: string) => {
		try {
			await api.delete(`/files/${id}`);
			setFiles((prev) => prev.filter((f) => f._id !== id));
			setMsg("File deleted successfully");
			setTimeout(() => setMsg(""), 3000);
		} catch (err) {
			console.error("Delete error:", err);
			setMsg("Failed to delete file");
		}
	};

	return (
		

		<div className="max-w-5xl mx-auto mt-10 p-4">
		<Sidebar/>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-semibold">My Files</h2>
				<select
					value={filterType}
					onChange={(e) => setFilterType(e.target.value)}
					className="border rounded px-3 py-1 text-sm"
				>
					<option value="all">All</option>
					<option value="image">Images</option>
					<option value="video">Videos</option>
					<option value="audio">Music</option>
					<option value="document">Documents</option>
				</select>
			</div>

			{msg && <p className="mb-4 text-sm text-green-600">{msg}</p>}

			<table className="w-full text-sm border">
				<thead className="bg-gray-100">
					<tr>
						<th className="p-2 border text-left">Filename</th>
						<th className="p-2 border text-left">Uploaded</th>
						<th className="p-2 border text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredFiles.length > 0 ? (
						filteredFiles.map((file) => (
							<tr key={file._id}>
								<td className="p-2 border">{file.filename}</td>
								<td className="p-2 border">
									{new Date(file.uploadedAt).toLocaleDateString("en-US")}
								</td>
								<td className="p-2 border flex gap-4 items-center">
									<button
										onClick={() => handleDownload(file._id)}
										className="text-blue-600 hover:underline"
									>
										Download
									</button>
									<button
										onClick={() => handleDelete(file._id)}
										className="text-red-600 hover:underline"
									>
										Delete
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={3} className="p-4 text-center text-gray-500">
								No files found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	
	);
}
