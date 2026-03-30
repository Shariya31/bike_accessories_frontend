import API from "./axios";

// register
export const registerApi = (data) =>
  API.post("/api/v1/auth/register", data);

// verify email
export const verifyEmailApi = (data) =>
  API.post("/api/v1/auth/verify-email", data);

// login
export const loginApi = (data) => API.post("/api/v1/auth/login", data);

// verify otp
export const verifyOtpApi = (data) => API.post("/api/v1/auth/verify-otp", data);

// resend otp
export const resendOtpApi = (data) =>
  API.post("/api/v1/auth/resend-otp", data);

// forgot password otp
export const sendResetOtpApi = (data) =>
  API.post("/api/v1/auth//reset-password/send-otp", data);

// verify reset otp
export const verifyResetOtpApi = (data) =>
  API.post("/api/v1/auth//reset-password/verify-reset-otp", data);

// update password
export const updatePasswordApi = (data) =>
  API.post("/api/v1/auth//reset-password/update-password", data);

// google auth
export const googleAuthApi = (data) =>
  API.post("/api/v1/auth/google", data);

// refresh token
export const refreshTokenApi = () =>
    API.post("/api/v1/auth/refresh");

//logout
export const logoutApi = () => API.post("/api/v1/auth/logout");

//getme
export const getMeApi = () => API.get("/api/v1/auth/me");