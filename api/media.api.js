import API from "./axios";

export const createMediaApi = (data) =>
  API.post("/api/v1/media/create", data);