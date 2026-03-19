import API from "./axios";

export const loginApi = (data) => API.post("/api/v1/auth/login", data);
export const verifyOtpApi = (data) => API.post("/api/v1/auth/verify-otp", data);
export const logoutApi = () => API.post("/api/v1/auth/logout");
export const getMeApi = () => API.get("/api/v1/auth/me");