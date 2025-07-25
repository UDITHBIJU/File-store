import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401 && !error.config._retry) {
			error.config._retry = true;

			try {
				const { data } = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
					{},
					{ withCredentials: true }
				);

				localStorage.setItem("accessToken", data.accessToken);
				error.config.headers.Authorization = `Bearer ${data.accessToken}`;
				return api(error.config);
			} catch {
				localStorage.removeItem("accessToken");
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	}
);

export default api;
