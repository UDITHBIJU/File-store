"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const requireAuth= (WrappedComponent: React.ComponentType) => {
	const AuthComponent = (props: any) => {
		const router = useRouter();

		useEffect(() => {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				router.replace("/login");
			}
		}, [router]);

		return <WrappedComponent {...props} />;
	};

	return AuthComponent;
};

export default requireAuth;
