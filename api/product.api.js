import API from "./axios";

export const createProductApi = (data) =>
  API.post("/api/v1/product/create", data);