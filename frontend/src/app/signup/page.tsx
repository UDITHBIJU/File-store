"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
	const [step, setStep] = useState<"form" | "otp">("form");
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		otp: "",
	});
	const [msg, setMsg] = useState("");
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRequestOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await api.post("/auth/request-otp", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
			setStep("otp");
			setMsg("OTP sent to your email");
		} catch (err: any) {
			setMsg(err?.response?.data?.message || "Failed to send OTP");
		}
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await api.post("/auth/verify-otp", {
				email: formData.email,
				otp: formData.otp,
			});
			localStorage.setItem("accessToken", res.data.accessToken);
			setMsg("Account verified. Redirecting to dashboard...");
			setTimeout(() => router.push("/dashboard"), 2000);
		} catch (err: any) {
			setMsg(err?.response?.data?.message || "OTP verification failed");
		}
	};

	return (
		<div className="p-4 max-w-md mx-auto mt-10">
			<h2 className="text-2xl mb-4">Signup</h2>
			<form
				onSubmit={step === "form" ? handleRequestOtp : handleVerifyOtp}
				className="flex flex-col gap-3"
			>
				{step === "form" && (
					<>
						<input
							type="text"
							name="username"
							placeholder="Username"
							value={formData.username}
							onChange={handleChange}
							className="p-2 border rounded"
							required
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							className="p-2 border rounded"
							required
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							className="p-2 border rounded"
							required
						/>
					</>
				)}

				{step === "otp" && (
					<input
						type="text"
						name="otp"
						placeholder="Enter OTP"
						value={formData.otp}
						onChange={handleChange}
						className="p-2 border rounded"
						required
					/>
				)}

				<button
					type="submit"
					className={`p-2 rounded text-white ${
						step === "form" ? "bg-blue-600" : "bg-green-600"
					}`}
				>
					{step === "form" ? "Send OTP" : "Verify OTP"}
				</button>
				{msg && <p className="text-sm text-gray-700">{msg}</p>}
			</form>
			<p className="mt-4 text-sm text-center">
				Already have an account?{" "}
				<button
					onClick={() => router.push("/login")}
					className="text-blue-600 hover:underline"
				>
					Login
				</button>
			</p>
		</div>
	);
}
