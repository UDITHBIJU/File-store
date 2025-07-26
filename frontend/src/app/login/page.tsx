"use client";

import { useState,useEffect } from "react";
import api from "@/lib/axios";
import {useRouter }from "next/navigation";


export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");

    const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			router.replace("/dashboard");
		}
	}, [router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("accessToken", res.data.accessToken);

            router.push("/dashboard")
		} catch (err: any) {
			setMsg(err?.response?.data?.message || "Login failed");
		}
	};
	return (
		<div className="p-4 max-w-md mx-auto mt-10">
			<h2 className="text-2xl mb-4">Login</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="p-2 border rounded"
					placeholder="Email"
					type="email"
					required
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="p-2 border rounded"
					placeholder="Password"
					type="password"
					required
				/>
				<button type="submit" className="bg-green-600 text-white p-2 rounded cursor-pointer">
					Login
				</button>
				{msg && <p className="text-sm text-gray-700">{msg}</p>}
			</form>
			<p className="mt-4 text-sm text-center">
				Don't have an account?{" "}
				<button
					onClick={() => router.push("/signup")}
					className="text-blue-600 hover:underline cursor-pointer"
				>
					Sign up
				</button>
			</p>
		</div>
	);
}
