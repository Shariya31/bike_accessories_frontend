import API from "./axios";

export const createMediaApi = (data) =>
  API.post("/api/v1/media/create", data);

export const getMediaApi = ({ page = 0, limit = 10, deleteType = "SD" }) =>
  API.get("/api/v1/media/get-media", {
    params: {
      page,
      limit,
      deleteType,
    },
  });