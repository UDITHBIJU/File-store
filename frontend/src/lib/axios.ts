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
		const originalRequest = error.config;
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes("/auth/login")
		) {
			error.config._retry = true;

			try {
				const { data } = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
					{},
					{ withCredentials: true }
				);

				localStorage.setItem("accessToken", data.accessToken);
				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				localStorage.removeItem("accessToken");
				if (!window.location.pathname.includes("/login")) {
					window.location.href = "/login";
				}
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
