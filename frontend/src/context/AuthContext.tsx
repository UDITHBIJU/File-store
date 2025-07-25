"use client";

import React, { createContext, useContext, useState,useEffect} from "react";
import api from "@/lib/axios";

interface User {
	id: string;
	username: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
    const [isLoading,setIsLoading] = useState(true);

    const refresh = async () => {
        try {
            const res = await api.post("/auth/refresh");
            localStorage.setItem("accessToken", res.data.accessToken);
            setUser(res.data.user); 
        } catch (err) {
            localStorage.removeItem("accessToken");
            setUser(null);
        }
        setIsLoading(false); 
    };
    useEffect(() => {
        refresh();
    }, []);

	return (
		<AuthContext.Provider value={{ user, setUser,isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};
