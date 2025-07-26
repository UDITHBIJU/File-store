"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await api.post("/auth/logout");
			localStorage.removeItem("accessToken");
			router.push("/login");
		} catch (err) {
			console.error("Logout failed", err);
		}
	};

	const closeSidebar = () => setOpen(false);

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="fixed top-2 left-2 z-10 bg-gray-800 text-white p-2 rounded shadow-lg hover:bg-gray-700"
			>
				<Menu size={20} />
			</button>

			{open && <div className="fixed inset-0 " onClick={closeSidebar} />}

			<div
				className={`fixed top-0 left-0 h-screen w-60 bg-gray-800 text-white p-4 z-50 transform transition-transform duration-300 ease-in-out ${
					open ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-lg font-bold">Menu</h1>
					<button onClick={closeSidebar}>
						<X size={24} />
					</button>
				</div>

				<nav className="flex flex-col gap-4">
					<Link
						href="/dashboard"
						className="hover:bg-gray-700 p-2 rounded"
						onClick={closeSidebar}
					>
						Dashboard
					</Link>
					<Link
						href="/files"
						className="hover:bg-gray-700 p-2 rounded"
						onClick={closeSidebar}
					>
						Files
					</Link>
				</nav>
				<button
					onClick={handleLogout}
					className="bg-red-600 mt-10 w-full p-2 rounded hover:bg-red-700"
				>
					Logout
				</button>
			</div>
		</>
	);
}
