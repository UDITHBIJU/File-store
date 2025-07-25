"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) router.push("/login");
	}, [user]);

	return (
		<div className="p-4">
			<h2 className="text-2xl">Dashboard</h2>
			<p>Welcome back, {user?.username}!</p>
		</div>
	);
}
